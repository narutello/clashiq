import { CAPS, MAX_KNOWN_TH, capAt, type CapGroup } from "./caps.ts";
import type { Account, Unit, UnitCategory } from "./types.ts";

export type Confidence = "high" | "medium" | "low" | "insufficient" | "na";

export type CategoryId =
  | "hero"
  | "troop"
  | "spell"
  | "siege"
  | "pet"
  | "defense"
  | "wall"
  | "trap"
  | "structure"
  | "equipment";

export type CategoryScore = {
  id: CategoryId;
  /** 0–100 Town Hall-relative completion, or game-max for equipment. */
  value: number | null;
  coverage: number;
  expected: number;
  evaluated: number;
  confidence: Confidence;
  /** Equipment is intentionally not Town Hall-capped. */
  basis: "town-hall" | "game-max" | "none";
  note: string | null;
};

export type CompositeId = "offense" | "defensePower" | "building";

export type Composite = {
  id: CompositeId;
  value: number | null;
  confidence: Confidence;
  coverage: number;
  parts: { id: CategoryId; weight: number; value: number }[];
};

/** Display-only rollups. They are not added on top of the overall score. */
export const COMPOSITE_WEIGHTS: Record<CompositeId, { id: CategoryId; weight: number }[]> = {
  offense: [
    { id: "hero", weight: 0.34 },
    { id: "troop", weight: 0.28 },
    { id: "spell", weight: 0.14 },
    { id: "siege", weight: 0.08 },
    { id: "pet", weight: 0.16 },
  ],
  defensePower: [
    { id: "defense", weight: 0.62 },
    { id: "wall", weight: 0.26 },
    { id: "trap", weight: 0.12 },
  ],
  building: [
    { id: "defense", weight: 0.45 },
    { id: "wall", weight: 0.25 },
    { id: "trap", weight: 0.1 },
    { id: "structure", weight: 0.2 },
  ],
};

export type Analysis = {
  categories: CategoryScore[];
  overall: {
    value: number | null;
    confidence: Confidence;
    /** Share of the full model whose inputs were actually present. */
    coverage: number;
    parts: { id: CategoryId; weight: number; value: number }[];
    omitted: { id: CategoryId; reason: string }[];
  };
  gameMax: { id: CategoryId; value: number | null }[];
  strengths: CategoryId[];
  weaknesses: CategoryId[];
  notes: string[];
  composites: Composite[];
};

const LAB_GROUPS: Record<"hero" | "troop" | "spell" | "siege" | "pet", CapGroup> = {
  hero: "hero",
  troop: "troop",
  spell: "spell",
  siege: "siege",
  pet: "pet",
};

/** Full-model weights. Missing categories are dropped and the rest renormalized. */
export const OVERALL_WEIGHTS: { id: CategoryId; weight: number }[] = [
  { id: "hero", weight: 0.22 },
  { id: "troop", weight: 0.18 },
  { id: "spell", weight: 0.08 },
  { id: "siege", weight: 0.05 },
  { id: "pet", weight: 0.07 },
  { id: "defense", weight: 0.18 },
  { id: "wall", weight: 0.1 },
  { id: "trap", weight: 0.04 },
  { id: "structure", weight: 0.08 },
];

const PRESENT_KEY: Partial<Record<CategoryId, keyof Account["present"]>> = {
  hero: "heroes",
  troop: "troops",
  spell: "spells",
  siege: "troops",
  pet: "troops",
  defense: "buildings",
  wall: "walls",
  trap: "traps",
  structure: "buildings",
  equipment: "equipment",
};

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function confidenceFrom(coverage: number, evaluated: number): Confidence {
  if (evaluated < 1) return "insufficient";
  if (coverage >= 0.85 && evaluated >= 3) return "high";
  if (coverage >= 0.6) return "medium";
  if (coverage >= 0.35) return "low";
  return "insufficient";
}

function scoreExpected(
  account: Account,
  id: CategoryId,
  groups: CapGroup[],
  present: boolean,
): CategoryScore {
  const th = account.townHallLevel;
  if (th == null) {
    return empty(id, "insufficient", "missing-th");
  }
  if (th > MAX_KNOWN_TH) {
    return empty(id, "insufficient", "above-known-th");
  }
  const expected = Object.values(CAPS).filter(
    (row) => groups.includes(row.group) && typeof row.levels[th] === "number",
  );
  if (expected.length === 0) {
    return { ...empty(id, "na", null), note: "not-at-hall" };
  }
  if (!present) {
    return empty(id, "insufficient", "not-in-data");
  }
  const owned = new Map<string, Unit>();
  for (const unit of account.units) {
    if (!groups.includes(unit.category as CapGroup)) continue;
    owned.set(unit.key, unit);
  }
  let sum = 0;
  let evaluated = 0;
  let stale = 0;
  for (const row of expected) {
    const cap = row.levels[th];
    if (cap == null) continue;
    const key = Object.entries(CAPS).find(([, value]) => value === row)?.[0];
    if (!key) continue;
    const level = owned.get(key)?.level ?? 0;
    if (level > cap) {
      stale += 1;
      continue;
    }
    sum += level / cap;
    evaluated += 1;
  }
  if (evaluated === 0) {
    return empty(id, "insufficient", "above-cap");
  }
  const coverage = evaluated / expected.length;
  const note = stale > 0 ? "stale" : null;
  return {
    id,
    value: round1((sum / evaluated) * 100),
    coverage,
    expected: expected.length,
    evaluated,
    confidence: confidenceFrom(coverage, evaluated),
    basis: "town-hall",
    note,
  };
}

function empty(id: CategoryId, confidence: Confidence, note: string | null): CategoryScore {
  return {
    id,
    value: null,
    coverage: 0,
    expected: 0,
    evaluated: 0,
    confidence,
    basis: "none",
    note,
  };
}

function scoreWalls(account: Account): CategoryScore {
  const th = account.townHallLevel;
  if (th == null) return empty("wall", "insufficient", "missing-th");
  if (th > MAX_KNOWN_TH) {
    return empty("wall", "insufficient", "above-known-th");
  }
  const cap = capAt("wall", th);
  if (cap == null) return { ...empty("wall", "na", null), note: "not-at-hall" };
  if (!account.present.walls) return empty("wall", "insufficient", "walls-missing");
  const pieces = account.units.filter((unit) => unit.category === "wall");
  const total = pieces.reduce((sum, unit) => sum + unit.count, 0);
  if (total === 0) {
    return {
      id: "wall",
      value: 0,
      coverage: 1,
      expected: 1,
      evaluated: 1,
      confidence: "medium",
      basis: "town-hall",
      note: "walls-empty",
    };
  }
  const average = pieces.reduce((sum, unit) => sum + unit.level * unit.count, 0) / total;
  if (average > cap + 0.01) {
    return empty("wall", "insufficient", "walls-above");
  }
  return {
    id: "wall",
    value: round1((average / cap) * 100),
    coverage: 1,
    expected: 1,
    evaluated: 1,
    confidence: "high",
    basis: "town-hall",
    note: null,
  };
}

function scoreEquipment(account: Account): CategoryScore {
  if (!account.present.equipment) {
    return empty("equipment", "insufficient", "equipment-missing");
  }
  const gear = account.units.filter((unit) => unit.category === "equipment" && unit.maxLevel != null && unit.maxLevel > 0);
  if (gear.length === 0) {
    return empty("equipment", "insufficient", "equipment-no-max");
  }
  const mean = gear.reduce((sum, unit) => sum + unit.level / (unit.maxLevel as number), 0) / gear.length;
  return {
    id: "equipment",
    value: round1(Math.min(1, mean) * 100),
    coverage: 1,
    expected: gear.length,
    evaluated: gear.length,
    confidence: gear.length >= 4 ? "medium" : "low",
    basis: "game-max",
    note: "equipment-basis",
  };
}

function gameMaxFor(account: Account, category: UnitCategory): number | null {
  const rows = account.units.filter((unit) => unit.category === category && unit.maxLevel != null && unit.maxLevel > 0);
  if (rows.length === 0) return null;
  const mean = rows.reduce((sum, unit) => sum + Math.min(1, unit.level / (unit.maxLevel as number)), 0) / rows.length;
  return round1(mean * 100);
}

function rollup(id: CompositeId, byId: Map<CategoryId, CategoryScore>): Composite {
  const slots = COMPOSITE_WEIGHTS[id];
  const parts: Composite["parts"] = [];
  let weightUsed = 0;
  let weightPossible = 0;
  for (const slot of slots) {
    const score = byId.get(slot.id);
    if (!score || score.confidence === "na") continue;
    weightPossible += slot.weight;
    if (score.value == null || score.confidence === "insufficient") continue;
    weightUsed += slot.weight;
    parts.push({ id: slot.id, weight: slot.weight, value: score.value });
  }
  const coverage = weightPossible === 0 ? 0 : weightUsed / weightPossible;
  if (weightUsed === 0 || coverage < 0.45) {
    return { id, value: null, confidence: "insufficient", coverage, parts };
  }
  const total = parts.reduce((sum, part) => sum + part.weight, 0);
  const value = round1(parts.reduce((sum, part) => sum + (part.weight / total) * part.value, 0));
  let confidence: Confidence = coverage >= 0.85 ? "high" : coverage >= 0.65 ? "medium" : "low";
  if (parts.some((part) => byId.get(part.id)?.confidence === "low")) {
    confidence = confidence === "high" ? "medium" : "low";
  }
  return { id, value, confidence, coverage, parts };
}

function presentFor(account: Account, id: CategoryId, groups: CapGroup[]): boolean {
  const key = PRESENT_KEY[id];
  if (!key) return false;
  if (!account.present[key]) return false;
  if (id === "siege" || id === "pet") {
    // The troop array stands in for both. An explicit empty array is still "present".
    return account.present.troops;
  }
  if ((id === "defense" || id === "structure") && groups.length) return account.present.buildings;
  return true;
}

export function analyzeAccount(account: Account): Analysis {
  const categories: CategoryScore[] = [
    scoreExpected(account, "hero", ["hero"], presentFor(account, "hero", ["hero"])),
    scoreExpected(account, "troop", ["troop"], presentFor(account, "troop", ["troop"])),
    scoreExpected(account, "spell", ["spell"], presentFor(account, "spell", ["spell"])),
    scoreExpected(account, "siege", ["siege"], presentFor(account, "siege", ["siege"])),
    scoreExpected(account, "pet", ["pet"], presentFor(account, "pet", ["pet"])),
    scoreExpected(account, "defense", ["defense"], presentFor(account, "defense", ["defense"])),
    scoreWalls(account),
    scoreExpected(account, "trap", ["trap"], account.present.traps),
    scoreExpected(account, "structure", ["resource", "army"], account.present.buildings),
    scoreEquipment(account),
  ];

  const byId = new Map(categories.map((row) => [row.id, row]));
  const parts: Analysis["overall"]["parts"] = [];
  const omitted: Analysis["overall"]["omitted"] = [];
  let weightUsed = 0;
  let weightPossible = 0;
  for (const slot of OVERALL_WEIGHTS) {
    const score = byId.get(slot.id);
    if (!score || score.confidence === "na") {
      omitted.push({ id: slot.id, reason: score?.note ?? "not-at-hall" });
      continue;
    }
    weightPossible += slot.weight;
    if (score.value == null || score.confidence === "insufficient") {
      omitted.push({ id: slot.id, reason: score.note ?? "not-in-data" });
      continue;
    }
    weightUsed += slot.weight;
    parts.push({ id: slot.id, weight: slot.weight, value: score.value });
  }
  const coverage = weightPossible === 0 ? 0 : weightUsed / weightPossible;
  let overallValue: number | null = null;
  let overallConfidence: Confidence = "insufficient";
  if (weightUsed > 0 && coverage >= 0.45) {
    const total = parts.reduce((sum, part) => sum + part.weight, 0);
    overallValue = round1(parts.reduce((sum, part) => sum + (part.weight / total) * part.value, 0));
    if (coverage >= 0.85) overallConfidence = "high";
    else if (coverage >= 0.65) overallConfidence = "medium";
    else overallConfidence = "low";
    if (parts.some((part) => byId.get(part.id)?.confidence === "low")) {
      overallConfidence = overallConfidence === "high" ? "medium" : overallConfidence === "medium" ? "low" : "low";
    }
  }

  const strengths = categories
    .filter((row) => row.basis === "town-hall" && row.value != null && row.value >= 80 && row.confidence !== "insufficient" && row.confidence !== "na")
    .map((row) => row.id);
  const weaknesses = categories
    .filter((row) => row.basis === "town-hall" && row.value != null && row.value < 55 && row.expected >= 3 && row.confidence !== "insufficient" && row.confidence !== "na")
    .map((row) => row.id);

  const notes = [...account.notes];
  if (!account.present.buildings) {
    notes.push("buildings-missing");
  }

  return {
    categories,
    overall: { value: overallValue, confidence: overallConfidence, coverage, parts, omitted },
    gameMax: (["hero", "troop", "spell", "siege", "pet", "equipment"] as CategoryId[]).map((id) => ({
      id,
      value: gameMaxFor(account, id === "equipment" ? "equipment" : LAB_GROUPS[id as keyof typeof LAB_GROUPS]),
    })),
    strengths,
    weaknesses,
    notes,
    composites: (["offense", "defensePower", "building"] as CompositeId[]).map((id) => rollup(id, byId)),
  };
}

export function categoryById(analysis: Analysis, id: CategoryId): CategoryScore | undefined {
  return analysis.categories.find((row) => row.id === id);
}
