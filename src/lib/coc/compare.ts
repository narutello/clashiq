import { capAt } from "./caps.ts";
import { normName } from "./names.ts";
import { analyzeAccount, type Analysis, type CategoryId, type CategoryScore, type Composite, type CompositeId } from "./score.ts";
import type { Account, Achievement, Unit } from "./types.ts";

export type Winner = "a" | "b" | "even" | null;

export function judge(a: number | null, b: number | null, gap = 0): Winner {
  if (a == null || b == null) return null;
  const diff = a - b;
  if (Math.abs(diff) <= gap) return "even";
  return diff > 0 ? "a" : "b";
}

export type StatRow = {
  id: string;
  a: number | null;
  b: number | null;
  winner: Winner;
};

export type CompositeRow = {
  id: CompositeId;
  a: Composite;
  b: Composite;
  winner: Winner;
};

export type CategoryRow = {
  id: CategoryId;
  a: CategoryScore;
  b: CategoryScore;
  winner: Winner;
};

export type UnitRow = {
  category: string;
  key: string;
  name: string;
  a: Unit | null;
  b: Unit | null;
  aPct: number | null;
  bPct: number | null;
  winner: Winner;
};

export type AchievementRow = {
  name: string;
  a: Achievement | null;
  b: Achievement | null;
  winner: Winner;
};

export type Comparison = {
  a: Account;
  b: Account;
  analysisA: Analysis;
  analysisB: Analysis;
  overallWinner: Winner;
  stats: StatRow[];
  categories: CategoryRow[];
  composites: CompositeRow[];
  units: UnitRow[];
  achievements: AchievementRow[];
};

function stat(id: string, a: number | null, b: number | null): StatRow {
  return { id, a, b, winner: judge(a, b, 0) };
}

function pctFor(unit: Unit | null, townHall: number | null): number | null {
  if (!unit || townHall == null) return null;
  const cap = capAt(unit.key, townHall);
  if (cap == null || cap <= 0) return null;
  if (unit.level > cap) return null;
  return (unit.level / cap) * 100;
}

export function compareAccounts(a: Account, b: Account): Comparison {
  const analysisA = analyzeAccount(a);
  const analysisB = analyzeAccount(b);
  const sameHall = a.townHallLevel != null && a.townHallLevel === b.townHallLevel;

  const categories: CategoryRow[] = analysisA.categories.map((row) => {
    const other = analysisB.categories.find((item) => item.id === row.id) as CategoryScore;
    let winner: Winner = null;
    const blocked =
      row.confidence === "insufficient" ||
      row.confidence === "na" ||
      other.confidence === "insufficient" ||
      other.confidence === "na";
    if (!blocked && row.basis === other.basis) {
      if (row.id === "equipment" && !sameHall) winner = null;
      else winner = judge(row.value, other.value, 0.5);
    }
    return { id: row.id, a: row, b: other, winner };
  });

  const composites: CompositeRow[] = analysisA.composites.map((row) => {
    const other = analysisB.composites.find((item) => item.id === row.id) as Composite;
    const blocked = row.confidence === "insufficient" || other.confidence === "insufficient" || row.value == null || other.value == null;
    return { id: row.id, a: row, b: other, winner: blocked ? null : judge(row.value, other.value, 0.5) };
  });

  const overallBlocked =
    analysisA.overall.confidence === "insufficient" || analysisB.overall.confidence === "insufficient";
  const overallWinner = overallBlocked
    ? null
    : judge(analysisA.overall.value, analysisB.overall.value, 0.5);

  const index = new Map<string, UnitRow>();
  const add = (unit: Unit | null, side: "a" | "b", townHall: number | null) => {
    if (!unit || unit.category === "other") return;
    const id = `${unit.category}:${unit.key}`;
    let row = index.get(id);
    if (!row) {
      row = {
        category: unit.category,
        key: unit.key,
        name: unit.name,
        a: null,
        b: null,
        aPct: null,
        bPct: null,
        winner: null,
      };
      index.set(id, row);
    }
    if (side === "a") {
      row.a = unit;
      row.aPct = pctFor(unit, townHall);
      row.name = unit.name;
    } else {
      row.b = unit;
      row.bPct = pctFor(unit, townHall);
    }
  };
  for (const unit of a.units) add(unit, "a", a.townHallLevel);
  for (const unit of b.units) add(unit, "b", b.townHallLevel);
  const units = [...index.values()].map((row) => {
    const winner =
      row.a && row.b
        ? row.aPct != null && row.bPct != null
          ? judge(row.aPct, row.bPct, 0.5)
          : sameHall
            ? judge(row.a.level, row.b.level, 0)
            : null
        : null;
    return { ...row, winner };
  });
  units.sort((left, right) => left.name.localeCompare(right.name));

  const achA = new Map(a.achievements.map((item) => [normName(item.name), item]));
  const achB = new Map(b.achievements.map((item) => [normName(item.name), item]));
  const names = new Set([...achA.keys(), ...achB.keys()]);
  const achievements: AchievementRow[] = [];
  if (a.present.achievements && b.present.achievements) {
    for (const key of names) {
      const left = achA.get(key) ?? null;
      const right = achB.get(key) ?? null;
      const leftScore = left?.stars ?? left?.value ?? null;
      const rightScore = right?.stars ?? right?.value ?? null;
      achievements.push({
        name: left?.name ?? right?.name ?? key,
        a: left,
        b: right,
        winner: left && right ? judge(leftScore, rightScore, 0) : null,
      });
    }
    achievements.sort((left, right) => {
      const gap = (row: AchievementRow) => Math.abs((row.a?.stars ?? 0) - (row.b?.stars ?? 0));
      return gap(right) - gap(left);
    });
  }

  return {
    a,
    b,
    analysisA,
    analysisB,
    overallWinner,
    stats: [
      stat("townHall", a.townHallLevel, b.townHallLevel),
      stat("weapon", a.townHallWeaponLevel, b.townHallWeaponLevel),
      stat("exp", a.expLevel, b.expLevel),
      stat("trophies", a.trophies, b.trophies),
      stat("bestTrophies", a.bestTrophies, b.bestTrophies),
      stat("warStars", a.warStars, b.warStars),
      stat("attackWins", a.attackWins, b.attackWins),
      stat("defenseWins", a.defenseWins, b.defenseWins),
      stat("donations", a.donations, b.donations),
    ],
    categories,
    composites,
    units,
    achievements: achievements.slice(0, 16),
  };
}
