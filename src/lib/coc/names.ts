import { CAPS, type CapGroup } from "./caps.ts";

export function normName(input: string): string {
  return input
    .toLowerCase()
    .replace(/['’.]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Builder Base units that must never enter a Home Village comparison. */
const BUILDER_NAMES = new Set([
  "raged barbarian",
  "sneaky archer",
  "boxer giant",
  "beta minion",
  "bomber",
  "baby dragon builder",
  "cannon cart",
  "night witch",
  "drop ship",
  "super pekka",
  "hog glider",
  "electrofire wizard",
  "battle machine",
  "battle copter",
  "power pekka",
  "heroic hog",
  "rocket balloon",
  "builder hall",
  "star laboratory",
  "clock tower",
  "gem mine",
  "healing hut",
  "guard post",
  "air bombs",
  "crushers",
  "crusher",
  "giant cannon",
  "lava launcher",
  "x bow builder",
  "otto",
  "b o b",
]);

export const HOME_IDS: Record<number, string> = {
  1000000: "Army Camp",
  1000001: "Town Hall",
  1000002: "Elixir Collector",
  1000003: "Elixir Storage",
  1000004: "Gold Mine",
  1000005: "Gold Storage",
  1000006: "Barracks",
  1000007: "Laboratory",
  1000008: "Cannon",
  1000009: "Archer Tower",
  1000010: "Wall",
  1000011: "Wizard Tower",
  1000012: "Air Defense",
  1000013: "Mortar",
  1000014: "Clan Castle",
  1000015: "Builder's Hut",
  1000019: "Hidden Tesla",
  1000020: "Spell Factory",
  1000021: "X-Bow",
  1000023: "Dark Elixir Drill",
  1000024: "Dark Elixir Storage",
  1000026: "Dark Barracks",
  1000027: "Inferno Tower",
  1000028: "Air Sweeper",
  1000029: "Dark Spell Factory",
  1000031: "Eagle Artillery",
  1000032: "Bomb Tower",
  1000034: "Builder Hall",
  1000046: "Star Laboratory",
  1000059: "Workshop",
  1000067: "Scattershot",
  1000068: "Pet House",
  1000070: "Blacksmith",
  1000071: "Hero Hall",
  28000000: "Barbarian King",
  28000001: "Archer Queen",
  28000002: "Grand Warden",
  28000003: "Battle Machine",
  28000004: "Royal Champion",
  28000005: "Battle Copter",
  28000006: "Minion Prince",
  73000000: "L.A.S.S.I",
  73000001: "Electro Owl",
  73000002: "Mighty Yak",
  73000003: "Unicorn",
  73000011: "Angry Jelly",
  73000016: "Sneezy",
  4000000: "Barbarian",
  4000001: "Archer",
  4000002: "Goblin",
  4000003: "Giant",
  4000004: "Wall Breaker",
  4000005: "Balloon",
  4000006: "Wizard",
  4000007: "Healer",
  4000008: "Dragon",
  4000009: "P.E.K.K.A",
  4000010: "Minion",
  4000011: "Hog Rider",
  4000012: "Valkyrie",
  4000013: "Golem",
  4000015: "Witch",
  4000017: "Lava Hound",
  4000022: "Bowler",
  4000023: "Baby Dragon",
  4000024: "Miner",
  4000051: "Wall Wrecker",
  4000052: "Battle Blimp",
  4000053: "Yeti",
  4000058: "Ice Golem",
  4000059: "Electro Dragon",
  4000062: "Stone Slammer",
  4000065: "Dragon Rider",
  4000075: "Siege Barracks",
  4000082: "Headhunter",
  4000087: "Log Launcher",
  4000091: "Flame Flinger",
  4000092: "Battle Drill",
  4000095: "Electro Titan",
  4000097: "Apprentice Warden",
  4000110: "Root Rider",
  26000000: "Lightning Spell",
  26000001: "Healing Spell",
  26000002: "Rage Spell",
  26000003: "Jump Spell",
  26000005: "Freeze Spell",
  26000009: "Poison Spell",
  26000010: "Earthquake Spell",
  26000011: "Haste Spell",
  26000016: "Clone Spell",
  26000017: "Skeleton Spell",
  26000028: "Bat Spell",
  26000035: "Invisibility Spell",
  26000053: "Recall Spell",
  26000070: "Overgrowth Spell",
  26000098: "Revive Spell",
};

const BUILDER_IDS = new Set([1000034, 1000046, 28000003, 28000005]);

const ACHIEVEMENT_DENY = new Set([
  "unbreakable",
  "conqueror",
  "humiliator",
  "not so easy this time",
  "union buster",
  "firefighter",
  "nice and tidy",
  "champion builder",
]);

export function isBuilderAchievement(name: string, info?: string | null): boolean {
  const key = normName(name);
  if (ACHIEVEMENT_DENY.has(key)) return true;
  const blob = `${name} ${info ?? ""}`.toLowerCase();
  return blob.includes("builder base") || blob.includes("versus battle");
}

export type Classified = { drop: true } | { drop: false; group: CapGroup | "equipment" | "super" | "other"; name: string; key: string; unlisted: boolean };

export function classifyName(rawName: string, village?: string | null): Classified {
  if (village === "builderBase") return { drop: true };
  const key = normName(rawName);
  if (!key || BUILDER_NAMES.has(key)) return { drop: true };
  const known = CAPS[key];
  if (known) return { drop: false, group: known.group, name: known.name, key, unlisted: false };
  if (key.startsWith("super ") && key !== "super wizard tower") {
    return { drop: false, group: "super", name: rawName.trim(), key, unlisted: false };
  }
  return { drop: false, group: "other", name: rawName.trim(), key, unlisted: true };
}

export function nameFromId(id: number): { name: string; drop: boolean } | null {
  if (BUILDER_IDS.has(id)) return { name: HOME_IDS[id] ?? "Builder Base", drop: true };
  const name = HOME_IDS[id];
  if (!name) return null;
  return { name, drop: BUILDER_NAMES.has(normName(name)) };
}
