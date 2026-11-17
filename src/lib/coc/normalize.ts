import { classifyName, isBuilderAchievement } from "./names.ts";
import type { Account, Achievement, Presence, Unit, UnitCategory } from "./types.ts";
import type { DataSource } from "./types.ts";

export function emptyPresence(): Presence {
  return {
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
}

export function blankAccount(partial: Pick<Account, "source" | "tag"> & Partial<Account>): Account {
  return {
    fetchedAt: null,
    exportAt: null,
    name: null,
    townHallLevel: null,
    townHallWeaponLevel: null,
    expLevel: null,
    trophies: null,
    bestTrophies: null,
    warStars: null,
    attackWins: null,
    defenseWins: null,
    donations: null,
    donationsReceived: null,
    role: null,
    warPreference: null,
    clan: null,
    league: null,
    legendTrophies: null,
    bestSeasonTrophies: null,
    labels: [],
    achievements: [],
    units: [],
    unrecognized: [],
    present: emptyPresence(),
    notes: [],
    ...partial,
  };
}

function num(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function str(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

type RawUnit = {
  name?: unknown;
  level?: unknown;
  maxLevel?: unknown;
  village?: unknown;
  superTroopIsActive?: unknown;
};

function pushUnit(
  units: Unit[],
  raw: RawUnit,
  source: DataSource,
  forceCategory?: UnitCategory,
): void {
  const name = str(raw.name);
  if (!name) return;
  const village = str(raw.village);
  const classified = classifyName(name, village);
  if (classified.drop) return;
  const level = num(raw.level);
  if (level == null) return;
  const category = forceCategory ?? classified.group;
  units.push({
    key: classified.key,
    name: classified.name,
    level,
    maxLevel: num(raw.maxLevel),
    count: 1,
    category,
    source,
    unlisted: classified.unlisted && forceCategory == null,
  });
  if (raw.superTroopIsActive === true && category === "troop") {
    units.push({
      key: `active:${classified.key}`,
      name: classified.name,
      level: 1,
      maxLevel: null,
      count: 1,
      category: "super",
      source,
      unlisted: false,
    });
  }
}

function readList(value: unknown): RawUnit[] {
  return Array.isArray(value) ? (value as RawUnit[]) : [];
}

/** Official player payload, with Builder Base removed. Missing fields stay null. */
export function accountFromApi(raw: unknown, fetchedAt: string): Account | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  const tag = str(row.tag);
  if (!tag) return null;
  const units: Unit[] = [];
  const present = emptyPresence();

  if (Array.isArray(row.troops)) {
    present.troops = true;
    for (const unit of readList(row.troops)) pushUnit(units, unit, "api");
  }
  if (Array.isArray(row.spells)) {
    present.spells = true;
    for (const unit of readList(row.spells)) pushUnit(units, unit, "api", "spell");
  }
  if (Array.isArray(row.heroes)) {
    present.heroes = true;
    for (const unit of readList(row.heroes)) pushUnit(units, unit, "api", "hero");
  }
  if (Array.isArray(row.heroEquipment)) {
    present.equipment = true;
    for (const unit of readList(row.heroEquipment)) pushUnit(units, unit, "api", "equipment");
  }
  if (Array.isArray(row.pets)) {
    for (const unit of readList(row.pets)) pushUnit(units, unit, "api", "pet");
  }

  const achievements: Achievement[] = [];
  if (Array.isArray(row.achievements)) {
    present.achievements = true;
    for (const item of row.achievements) {
      if (!item || typeof item !== "object") continue;
      const ach = item as Record<string, unknown>;
      const name = str(ach.name);
      if (!name || isBuilderAchievement(name, str(ach.info))) continue;
      achievements.push({
        name,
        stars: num(ach.stars),
        value: num(ach.value),
        target: num(ach.target),
      });
    }
  }

  const clanRaw = row.clan;
  let clan: Account["clan"] = null;
  if (clanRaw && typeof clanRaw === "object") {
    const clanRow = clanRaw as Record<string, unknown>;
    const clanName = str(clanRow.name);
    const clanTag = str(clanRow.tag);
    if (clanName && clanTag) {
      clan = { name: clanName, tag: clanTag, level: num(clanRow.clanLevel) };
    }
  }

  const leagueRaw = row.league;
  const league =
    leagueRaw && typeof leagueRaw === "object" ? str((leagueRaw as Record<string, unknown>).name) : null;

  const legend =
    row.legendStatistics && typeof row.legendStatistics === "object"
      ? (row.legendStatistics as Record<string, unknown>)
      : null;
  const bestSeason =
    legend?.bestSeason && typeof legend.bestSeason === "object"
      ? (legend.bestSeason as Record<string, unknown>)
      : null;

  const labels = Array.isArray(row.labels)
    ? row.labels
        .map((label) =>
          label && typeof label === "object" ? str((label as Record<string, unknown>).name) : null,
        )
        .filter((label): label is string => Boolean(label))
    : [];

  return {
    source: "api",
    fetchedAt,
    exportAt: null,
    tag,
    name: str(row.name),
    townHallLevel: num(row.townHallLevel),
    townHallWeaponLevel: num(row.townHallWeaponLevel),
    expLevel: num(row.expLevel),
    trophies: num(row.trophies),
    bestTrophies: num(row.bestTrophies),
    warStars: num(row.warStars),
    attackWins: num(row.attackWins),
    defenseWins: num(row.defenseWins),
    donations: num(row.donations),
    donationsReceived: num(row.donationsReceived),
    role: str(row.role),
    warPreference: str(row.warPreference),
    clan,
    league,
    legendTrophies: legend ? num(legend.legendTrophies) : null,
    bestSeasonTrophies: bestSeason ? num(bestSeason.trophies) : null,
    labels,
    achievements,
    units: dedupeUnits(units),
    unrecognized: [],
    present,
    notes: [],
  };
}

export function dedupeUnits(units: Unit[]): Unit[] {
  const map = new Map<string, Unit>();
  for (const unit of units) {
    const id = `${unit.category}:${unit.key}`;
    const prev = map.get(id);
    if (!prev) {
      map.set(id, { ...unit });
      continue;
    }
    const nextCount = prev.count + unit.count;
    prev.level = (prev.level * prev.count + unit.level * unit.count) / nextCount;
    prev.count = nextCount;
    if (prev.maxLevel == null) prev.maxLevel = unit.maxLevel;
  }
  return [...map.values()];
}

/** Prefer the official API for profile and lab data. Export adds village buildings. */
export function mergeAccounts(api: Account | null, extra: Account | null): Account | null {
  if (!api && !extra) return null;
  if (!api) return extra;
  if (!extra) return api;
  const buildingCategories = new Set<UnitCategory>([
    "defense",
    "trap",
    "wall",
    "guardian",
    "resource",
    "army",
    "other",
  ]);
  const fromExport = extra.units.filter((unit) => buildingCategories.has(unit.category));
  const notes = [...api.notes];
  if (extra.townHallLevel != null && api.townHallLevel != null && extra.townHallLevel !== api.townHallLevel) {
    notes.push("export-th-mismatch");
  }
  return {
    ...api,
    exportAt: extra.exportAt,
    units: dedupeUnits([...api.units, ...fromExport]),
    unrecognized: extra.unrecognized,
    present: {
      ...api.present,
      buildings: extra.present.buildings || api.present.buildings,
      traps: extra.present.traps || api.present.traps,
      walls: extra.present.walls || api.present.walls,
      guardians: extra.present.guardians || api.present.guardians,
      troops: api.present.troops || extra.present.troops,
      spells: api.present.spells || extra.present.spells,
      heroes: api.present.heroes || extra.present.heroes,
      equipment: api.present.equipment || extra.present.equipment,
    },
    notes,
  };
}
