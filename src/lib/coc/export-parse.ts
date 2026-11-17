import { CAPS } from "./caps.ts";
import { classifyName, nameFromId, normName } from "./names.ts";
import { blankAccount, dedupeUnits } from "./normalize.ts";
import { normalizeTag, tagsEqual } from "./tags.ts";
import type { Account, Unit } from "./types.ts";

export type ExportParseResult =
  | { ok: true; account: Account; warning: string | null }
  | { ok: false; error: "invalid" | "mismatch" | "too_large" | "empty"; message: string };

const MAX_CHARS = 1_500_000;

const IGNORED_KEYS = new Set([
  "buildings2",
  "traps2",
  "heroes2",
  "obstacles",
  "decos",
  "decorations",
  "skins",
  "scenery",
  "boosts",
  "helpers",
  "bb",
  "starlab",
  "capital",
]);

type Row = Record<string, unknown>;

function isRow(value: unknown): value is Row {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function levelOf(row: Row): number | null {
  const raw = row.lvl ?? row.level;
  const level = typeof raw === "number" ? raw : Number(row.lvl ?? row.level);
  if (!Number.isFinite(level) || level < 0) return null;
  return level;
}

function countOf(row: Row): number {
  const raw = row.cnt ?? row.count;
  const count = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(count) || count <= 0) return 1;
  return Math.min(400, Math.round(count));
}

/**
 * Accepts the in-game Settings → Data Export JSON, a named progress file
 * ({ name, level, count }), or a saved official player payload.
 * Builder Base keys are ignored. Processing stays in the browser.
 */
export function parseExport(text: string, expectedTag: string | null): ExportParseResult {
  if (text.length > MAX_CHARS) {
    return { ok: false, error: "too_large", message: "That file is larger than 1.5 MB." };
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return {
      ok: false,
      error: "invalid",
      message: "This file is not JSON. ClashIQ reads the in-game village export or a named progress file.",
    };
  }
  if (!isRow(parsed)) {
    return { ok: false, error: "invalid", message: "The JSON root has to be an object." };
  }

  const tag = typeof parsed.tag === "string" ? normalizeTag(parsed.tag) : null;
  const expected = expectedTag ? normalizeTag(expectedTag) : null;
  if (expected && tag && !tagsEqual(tag, expected)) {
    return {
      ok: false,
      error: "mismatch",
      message: `This export belongs to ${tag}, not ${expected}.`,
    };
  }

  if (looksLikeApiSnapshot(parsed)) {
    return finishSnapshot(parsed, tag, expected);
  }

  return finishVillageExport(parsed, tag, expected);
}

function looksLikeApiSnapshot(row: Row): boolean {
  const troops = row.troops;
  if (!Array.isArray(troops) || troops.length === 0) return false;
  const first = troops[0];
  return isRow(first) && typeof first.name === "string" && ("maxLevel" in first || "village" in first);
}

function finishSnapshot(row: Row, tag: string | null, expected: string | null): ExportParseResult {
  const units: Unit[] = [];
  const take = (value: unknown, force?: Unit["category"]) => {
    if (!Array.isArray(value)) return;
    for (const item of value) {
      if (!isRow(item) || typeof item.name !== "string") continue;
      const village = typeof item.village === "string" ? item.village : null;
      const classified = classifyName(item.name, village);
      if (classified.drop) continue;
      const level = levelOf(item);
      if (level == null) continue;
      units.push({
        key: classified.key,
        name: classified.name,
        level,
        maxLevel: typeof item.maxLevel === "number" ? item.maxLevel : null,
        count: 1,
        category: force ?? classified.group,
        source: "export",
        unlisted: force ? false : classified.unlisted,
      });
    }
  };
  take(row.troops);
  take(row.spells, "spell");
  take(row.heroes, "hero");
  take(row.heroEquipment, "equipment");
  take(row.pets, "pet");
  if (units.length === 0) {
    return { ok: false, error: "empty", message: "The player file had no Home Village units." };
  }
  const account = blankAccount({
    source: "export",
    tag: tag ?? expected ?? "#EXPORT",
    name: typeof row.name === "string" ? row.name : null,
    townHallLevel: typeof row.townHallLevel === "number" ? row.townHallLevel : null,
    expLevel: typeof row.expLevel === "number" ? row.expLevel : null,
    trophies: typeof row.trophies === "number" ? row.trophies : null,
    bestTrophies: typeof row.bestTrophies === "number" ? row.bestTrophies : null,
    warStars: typeof row.warStars === "number" ? row.warStars : null,
    attackWins: typeof row.attackWins === "number" ? row.attackWins : null,
    defenseWins: typeof row.defenseWins === "number" ? row.defenseWins : null,
    units: dedupeUnits(units),
    present: {
      troops: Array.isArray(row.troops),
      spells: Array.isArray(row.spells),
      heroes: Array.isArray(row.heroes),
      equipment: Array.isArray(row.heroEquipment),
      achievements: false,
      buildings: false,
      traps: false,
      walls: false,
      guardians: false,
    },
    notes: ["api-snapshot"],
  });
  return {
    ok: true,
    account,
    warning: tag ? null : "This file has no player tag, so ClashIQ could not confirm it matches the tag you typed.",
  };
}

const ARRAY_CATEGORY: Record<string, Unit["category"] | "auto"> = {
  buildings: "auto",
  traps: "trap",
  walls: "wall",
  heroes: "hero",
  pets: "pet",
  units: "auto",
  troops: "auto",
  spells: "spell",
  siege: "siege",
  siegemachines: "siege",
  equipment: "equipment",
  heroequipment: "equipment",
  guardians: "guardian",
};

function finishVillageExport(row: Row, tag: string | null, expected: string | null): ExportParseResult {
  const units: Unit[] = [];
  const unrecognized: Unit[] = [];
  const townHallPieces: number[] = [];
  const present = {
    troops: false,
    spells: false,
    heroes: false,
    equipment: false,
    achievements: false,
    buildings: false,
    traps: false,
    walls: false,
    guardians: false,
  };

  for (const [rawKey, value] of Object.entries(row)) {
    const key = rawKey.toLowerCase();
    if (IGNORED_KEYS.has(key) || key.endsWith("2")) continue;
    const slot = ARRAY_CATEGORY[key.replace(/[_-]/g, "")];
    if (!slot || !Array.isArray(value)) continue;
    if (key === "buildings") present.buildings = true;
    if (key === "traps") present.traps = true;
    if (key === "walls") present.walls = true;
    if (key === "guardians") present.guardians = true;
    if (key === "heroes") present.heroes = true;
    if (key === "spells") present.spells = true;
    if (key === "units" || key === "troops") present.troops = true;
    if (key === "equipment" || key === "heroequipment") present.equipment = true;

    for (const item of value) {
      if (!isRow(item)) continue;
      const level = levelOf(item);
      if (level == null) continue;
      const named = typeof item.name === "string" ? item.name : null;
      const id = typeof item.data === "number" ? item.data : Number(item.data);
      let label = named;
      if (!label && Number.isFinite(id)) {
        const mapped = nameFromId(id);
        if (mapped?.drop) continue;
        label = mapped?.name ?? null;
      }
      if (!label) {
        if (Number.isFinite(id)) {
          unrecognized.push({
            key: `id:${id}`,
            name: `Unknown #${id}`,
            level,
            maxLevel: null,
            count: countOf(item),
            category: "other",
            source: "export",
            unlisted: true,
          });
        }
        continue;
      }
      const classified = classifyName(label, null);
      if (classified.drop) continue;
      if (classified.key === "town hall") {
        townHallPieces.push(level);
        continue;
      }
      const category = slot === "auto" ? classified.group : slot;
      const unit: Unit = {
        key: classified.key,
        name: classified.name,
        level,
        maxLevel: null,
        count: countOf(item),
        category,
        source: "export",
        unlisted: classified.unlisted,
      };
      if (unit.category === "wall") unit.key = "wall";
      if (unit.unlisted || unit.category === "other") unrecognized.push(unit);
      else units.push(unit);
    }
  }

  if (units.length === 0 && unrecognized.length === 0) {
    return {
      ok: false,
      error: "invalid",
      message:
        "Unrecognized export. Use the in-game JSON export (Settings → More settings → Data Export) or a file with named buildings.",
    };
  }

  let townHall: number | null = null;
  if (townHallPieces.length > 0) townHall = Math.max(...townHallPieces);
  else if (typeof row.townHallLevel === "number") townHall = row.townHallLevel;

  const account = blankAccount({
    source: "export",
    tag: tag ?? expected ?? "#EXPORT",
    name: typeof row.name === "string" ? row.name : null,
    townHallLevel: townHall,
    exportAt: timestampOf(row.timestamp),
    units: dedupeUnits(units),
    unrecognized: dedupeUnits(unrecognized),
    present,
    notes: [],
  });

  return {
    ok: true,
    account,
    warning: tag ? null : "This file has no player tag, so ClashIQ could not confirm it matches the tag you typed.",
  };
}

function timestampOf(value: unknown): string | null {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  const ms = n > 1e12 ? n : n * 1000;
  const date = new Date(ms);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function displayName(key: string, fallback: string): string {
  return CAPS[normName(key)]?.name ?? fallback;
}
