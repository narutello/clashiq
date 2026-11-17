import { CAPS, type CapGroup } from "./caps.ts";
import { blankAccount } from "./normalize.ts";
import type { Account, Presence, Unit } from "./types.ts";

const LAB: CapGroup[] = ["hero", "troop", "spell", "siege", "pet"];
const VILLAGE: CapGroup[] = ["defense", "trap", "wall", "resource", "army", "guardian"];

function maxLevelOf(levels: Partial<Record<number, number>>): number {
  let max = 1;
  for (const value of Object.values(levels)) {
    if (typeof value === "number" && value > max) max = value;
  }
  return max;
}

function fill(townHall: number, ratios: Partial<Record<CapGroup, number>>): Unit[] {
  const units: Unit[] = [];
  for (const [key, row] of Object.entries(CAPS)) {
    const cap = row.levels[townHall];
    if (cap == null) continue;
    const ratio = ratios[row.group] ?? 1;
    units.push({
      key,
      name: row.name,
      level: Math.max(1, Math.min(cap, Math.round(cap * ratio))),
      maxLevel: maxLevelOf(row.levels),
      count: row.group === "wall" ? 325 : 1,
      category: row.group,
      source: "sample",
      unlisted: false,
    });
  }
  return units;
}

function gear(level: number, maxLevel: number, name: string): Unit {
  return {
    key: name.toLowerCase(),
    name,
    level,
    maxLevel,
    count: 1,
    category: "equipment",
    source: "sample",
    unlisted: false,
  };
}

const present: Presence = {
  troops: true,
  spells: true,
  heroes: true,
  equipment: true,
  achievements: true,
  buildings: true,
  traps: true,
  walls: true,
  guardians: false,
};

/** Fictional dossiers. Every figure is computed from the cap table so the UI can be reviewed without a token. */
export function workedExample(): { a: Account; b: Account } {
  const aUnits = [
    ...fill(15, {
      hero: 1,
      troop: 1,
      spell: 0.95,
      siege: 1,
      pet: 0.9,
      defense: 1,
      trap: 1,
      wall: 1,
      resource: 0.9,
      army: 0.95,
    }),
    gear(18, 27, "Giant Gauntlet"),
    gear(15, 18, "Eternal Tome"),
  ];
  const bUnits = [
    ...fill(17, {
      hero: 0.42,
      troop: 0.58,
      spell: 0.7,
      siege: 0.5,
      pet: 0.4,
      defense: 0.48,
      trap: 0.55,
      wall: 0.45,
      resource: 0.8,
      army: 0.6,
    }),
    gear(9, 27, "Giant Gauntlet"),
    gear(6, 18, "Eternal Tome"),
  ];

  const a = blankAccount({
    source: "sample",
    tag: "#P2YQLGRJ",
    name: "Northkeep",
    townHallLevel: 15,
    townHallWeaponLevel: 5,
    expLevel: 210,
    trophies: 2780,
    bestTrophies: 3120,
    warStars: 1480,
    attackWins: 920,
    defenseWins: 140,
    donations: 2400,
    donationsReceived: 1800,
    role: "coLeader",
    warPreference: "in",
    clan: { name: "Example Clan", tag: "#2Q8YVCL0", level: 18 },
    league: "Master League I",
    units: aUnits,
    present,
    achievements: [
      { name: "War Hero", stars: 3, value: 1480, target: 1000 },
      { name: "Conqueror", stars: 3, value: 5000, target: 5000 },
    ],
    notes: ["sample"],
  });
  // Conqueror is a Builder Base achievement and must not survive into the sample.
  a.achievements = a.achievements.filter((item) => item.name !== "Conqueror");

  const b = blankAccount({
    source: "sample",
    tag: "#C0V28Q9U",
    name: "Ashmarch",
    townHallLevel: 17,
    townHallWeaponLevel: 2,
    expLevel: 248,
    trophies: 3410,
    bestTrophies: 4102,
    warStars: 860,
    attackWins: 1504,
    defenseWins: 96,
    donations: 800,
    donationsReceived: 2200,
    role: "member",
    warPreference: "in",
    clan: { name: "Example Clan", tag: "#2Q8YVCL0", level: 18 },
    league: "Champion League III",
    units: bUnits,
    present,
    achievements: [{ name: "War Hero", stars: 2, value: 860, target: 1000 }],
    notes: ["sample"],
  });

  return { a, b };
}

export const SAMPLE_GROUPS = { LAB, VILLAGE };
