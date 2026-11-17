/* Generated from public Town Hall cap tables checked 1 October 2026.
   Town Hall 18 is the last hall in that table. Higher halls are not guessed. */
export const CAP_TABLE_AS_OF = "1 October 2026";
export const MAX_KNOWN_TH = 18;

export type CapGroup =
  | "defense"
  | "trap"
  | "wall"
  | "guardian"
  | "resource"
  | "army"
  | "hero"
  | "troop"
  | "spell"
  | "siege"
  | "pet";

export type CapRow = {
  name: string;
  group: CapGroup;
  /** Town Hall -> max level. Missing key means not available at that hall. */
  levels: Partial<Record<number, number>>;
};

export const CAPS: Record<string, CapRow> = {
  "air bomb": { name: "Air Bomb", group: "trap", levels: { 5: 2, 6: 2, 7: 3, 8: 3, 9: 4, 10: 4, 11: 5, 12: 6, 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13 } },
  "air defense": { name: "Air Defense", group: "defense", levels: { 4: 2, 5: 3, 6: 4, 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: 12, 15: 13, 16: 14, 17: 15, 18: 16 } },
  "air sweeper": { name: "Air Sweeper", group: "defense", levels: { 6: 2, 7: 3, 8: 4, 9: 5, 10: 6, 11: 7, 12: 7, 13: 7, 14: 7, 15: 7, 16: 7, 17: 7, 18: 7 } },
  "angry jelly": { name: "Angry Jelly", group: "pet", levels: { 16: 10, 17: 10, 18: 10 } },
  "angry spell": { name: "Angry Spell", group: "spell", levels: { 15: 1, 16: 2, 17: 3, 18: 4 } },
  "apprentice warden": { name: "Apprentice Warden", group: "troop", levels: { 13: 2, 14: 3, 15: 4, 16: 4, 17: 4, 18: 4 } },
  "archer": { name: "Archer", group: "troop", levels: { 1: 1, 2: 1, 3: 2, 4: 2, 5: 3, 6: 3, 7: 4, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9, 13: 9, 14: 10, 15: 11, 16: 12, 17: 13, 18: 14 } },
  "archer queen": { name: "Archer Queen", group: "hero", levels: { 8: 10, 9: 30, 10: 40, 11: 50, 12: 65, 13: 75, 14: 85, 15: 90, 16: 95, 17: 100, 18: 110 } },
  "archer tower": { name: "Archer Tower", group: "defense", levels: { 2: 2, 3: 3, 4: 4, 5: 6, 6: 7, 7: 8, 8: 10, 9: 11, 10: 13, 11: 15, 12: 17, 13: 19, 14: 20, 15: 21, 16: 21, 17: 21, 18: 21 } },
  "army camp": { name: "Army Camp", group: "army", levels: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 6, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: 11, 15: 12, 16: 12, 17: 13, 18: 14 } },
  "baby dragon": { name: "Baby Dragon", group: "troop", levels: { 9: 2, 10: 4, 11: 5, 12: 6, 13: 7, 14: 8, 15: 9, 16: 10, 17: 11, 18: 12 } },
  "balloon": { name: "Balloon", group: "troop", levels: { 4: 2, 5: 2, 6: 3, 7: 4, 8: 5, 9: 6, 10: 6, 11: 7, 12: 8, 13: 9, 14: 10, 15: 10, 16: 11, 17: 12, 18: 13 } },
  "barbarian": { name: "Barbarian", group: "troop", levels: { 1: 1, 2: 1, 3: 2, 4: 2, 5: 3, 6: 3, 7: 4, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9, 13: 9, 14: 10, 15: 11, 16: 12, 17: 12, 18: 13 } },
  "barbarian king": { name: "Barbarian King", group: "hero", levels: { 4: 1, 5: 1, 6: 1, 7: 10, 8: 20, 9: 30, 10: 40, 11: 50, 12: 65, 13: 75, 14: 85, 15: 90, 16: 95, 17: 100, 18: 110 } },
  "barracks": { name: "Barracks", group: "army", levels: { 1: 3, 2: 4, 3: 5, 4: 6, 5: 7, 6: 8, 7: 9, 8: 10, 9: 11, 10: 12, 11: 13, 12: 14, 13: 15, 14: 16, 15: 17, 16: 18, 17: 19, 18: 19 } },
  "bat spell": { name: "Bat Spell", group: "spell", levels: { 10: 3, 11: 4, 12: 5, 13: 5, 14: 5, 15: 6, 16: 6, 17: 7, 18: 8 } },
  "battle blimp": { name: "Battle Blimp", group: "siege", levels: { 12: 3, 13: 4, 14: 4, 15: 5, 16: 5, 17: 5, 18: 6 } },
  "battle drill": { name: "Battle Drill", group: "siege", levels: { 15: 4, 16: 4, 17: 5, 18: 6 } },
  "blacksmith": { name: "Blacksmith", group: "army", levels: { 8: 1, 9: 2, 10: 3, 11: 4, 12: 5, 13: 6, 14: 7, 15: 8, 16: 9, 17: 10, 18: 10 } },
  "bomb": { name: "Bomb", group: "trap", levels: { 3: 2, 4: 2, 5: 3, 6: 3, 7: 4, 8: 5, 9: 6, 10: 7, 11: 8, 12: 8, 13: 9, 14: 10, 15: 11, 16: 12, 17: 13, 18: 14 } },
  "bomb tower": { name: "Bomb Tower", group: "defense", levels: { 8: 2, 9: 3, 10: 4, 11: 6, 12: 7, 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13 } },
  "bowler": { name: "Bowler", group: "troop", levels: { 10: 2, 11: 3, 12: 4, 13: 5, 14: 6, 15: 7, 16: 8, 17: 9, 18: 10 } },
  "builders hut": { name: "Builder's Hut", group: "defense", levels: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 4, 15: 5, 16: 6, 17: 7, 18: 8 } },
  "cannon": { name: "Cannon", group: "defense", levels: { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 10, 9: 11, 10: 13, 11: 15, 12: 17, 13: 19, 14: 20, 15: 21, 16: 21 } },
  "clan castle": { name: "Clan Castle", group: "army", levels: { 2: 1, 3: 1, 4: 2, 5: 2, 6: 3, 7: 3, 8: 4, 9: 5, 10: 6, 11: 7, 12: 8, 13: 9, 14: 10, 15: 11, 16: 12, 17: 13, 18: 14 } },
  "clone spell": { name: "Clone Spell", group: "spell", levels: { 10: 3, 11: 5, 12: 5, 13: 6, 14: 7, 15: 8, 16: 8, 17: 8, 18: 9 } },
  "dark barracks": { name: "Dark Barracks", group: "army", levels: { 7: 2, 8: 4, 9: 6, 10: 7, 11: 8, 12: 9, 13: 10, 14: 11, 15: 12, 16: 13, 17: 13, 18: 13 } },
  "dark elixir drill": { name: "Dark Elixir Drill", group: "resource", levels: { 7: 3, 8: 3, 9: 6, 10: 7, 11: 8, 12: 9, 13: 9, 14: 10, 15: 10, 16: 11, 17: 11, 18: 11 } },
  "dark elixir storage": { name: "Dark Elixir Storage", group: "resource", levels: { 7: 2, 8: 4, 9: 6, 10: 6, 11: 6, 12: 7, 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13 } },
  "dark spell factory": { name: "Dark Spell Factory", group: "army", levels: { 8: 2, 9: 4, 10: 5, 11: 5, 12: 6, 13: 6, 14: 7, 15: 8, 16: 8, 17: 8, 18: 8 } },
  "diggy": { name: "Diggy", group: "pet", levels: { 15: 10, 16: 10, 17: 10, 18: 15 } },
  "dragon": { name: "Dragon", group: "troop", levels: { 7: 2, 8: 3, 9: 4, 10: 5, 11: 6, 12: 7, 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13 } },
  "dragon duke": { name: "Dragon Duke", group: "hero", levels: { 15: 10, 16: 15, 17: 20, 18: 25 } },
  "dragon rider": { name: "Dragon Rider", group: "troop", levels: { 13: 2, 14: 3, 15: 3, 16: 4, 17: 5, 18: 6 } },
  "druid": { name: "Druid", group: "troop", levels: { 14: 2, 15: 3, 16: 4, 17: 5, 18: 6 } },
  "eagle artillery": { name: "Eagle Artillery", group: "defense", levels: { 11: 2, 12: 3, 13: 4, 14: 5, 15: 6, 16: 7 } },
  "earthquake spell": { name: "Earthquake Spell", group: "spell", levels: { 8: 2, 9: 3, 10: 4, 11: 5, 12: 5, 13: 5, 14: 6, 15: 6, 16: 7, 17: 7, 18: 8 } },
  "electro dragon": { name: "Electro Dragon", group: "troop", levels: { 11: 2, 12: 3, 13: 4, 14: 5, 15: 6, 16: 7, 17: 8, 18: 9 } },
  "electro owl": { name: "Electro Owl", group: "pet", levels: { 14: 10, 15: 10, 16: 15, 17: 15, 18: 15 } },
  "electro titan": { name: "Electro Titan", group: "troop", levels: { 14: 2, 15: 3, 16: 4, 17: 4, 18: 5 } },
  "elixir collector": { name: "Elixir Collector", group: "resource", levels: { 1: 2, 2: 4, 3: 6, 4: 8, 5: 10, 6: 10, 7: 11, 8: 12, 9: 12, 10: 13, 11: 14, 12: 15, 13: 15, 14: 16, 15: 16, 16: 17, 17: 17, 18: 17 } },
  "elixir storage": { name: "Elixir Storage", group: "resource", levels: { 1: 1, 2: 3, 3: 6, 4: 8, 5: 9, 6: 10, 7: 11, 8: 11, 9: 11, 10: 11, 11: 12, 12: 13, 13: 14, 14: 15, 15: 16, 16: 17, 17: 18, 18: 19 } },
  "firespitter": { name: "Firespitter", group: "defense", levels: { 17: 2, 18: 3 } },
  "flame flinger": { name: "Flame Flinger", group: "siege", levels: { 14: 4, 15: 4, 16: 5, 17: 5, 18: 5 } },
  "freeze spell": { name: "Freeze Spell", group: "spell", levels: { 9: 2, 10: 5, 11: 6, 12: 7, 13: 7, 14: 7, 15: 7, 16: 7, 17: 7, 18: 8 } },
  "frosty": { name: "Frosty", group: "pet", levels: { 15: 10, 16: 10, 17: 15, 18: 15 } },
  "furnace": { name: "Furnace", group: "troop", levels: { 15: 2, 16: 3, 17: 4, 18: 4 } },
  "giant": { name: "Giant", group: "troop", levels: { 1: 1, 2: 1, 3: 1, 4: 2, 5: 2, 6: 3, 7: 4, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9, 13: 10, 14: 10, 15: 11, 16: 12, 17: 13, 18: 14 } },
  "giant bomb": { name: "Giant Bomb", group: "trap", levels: { 6: 2, 7: 2, 8: 3, 9: 3, 10: 4, 11: 5, 12: 5, 13: 7, 14: 8, 15: 9, 16: 10, 17: 11, 18: 12 } },
  "giga bomb": { name: "Giga Bomb", group: "trap", levels: { 17: 3, 18: 4 } },
  "goblin": { name: "Goblin", group: "troop", levels: { 2: 1, 3: 2, 4: 2, 5: 3, 6: 3, 7: 4, 8: 5, 9: 6, 10: 7, 11: 7, 12: 8, 13: 8, 14: 8, 15: 9, 16: 9, 17: 9, 18: 10 } },
  "gold mine": { name: "Gold Mine", group: "resource", levels: { 1: 2, 2: 4, 3: 6, 4: 8, 5: 10, 6: 10, 7: 11, 8: 12, 9: 12, 10: 13, 11: 14, 12: 15, 13: 15, 14: 16, 15: 16, 16: 17, 17: 17, 18: 17 } },
  "gold storage": { name: "Gold Storage", group: "resource", levels: { 1: 1, 2: 3, 3: 6, 4: 8, 5: 9, 6: 10, 7: 11, 8: 11, 9: 11, 10: 11, 11: 12, 12: 13, 13: 14, 14: 15, 15: 16, 16: 17, 17: 18, 18: 19 } },
  "golem": { name: "Golem", group: "troop", levels: { 8: 2, 9: 4, 10: 5, 11: 7, 12: 9, 13: 10, 14: 11, 15: 12, 16: 13, 17: 14, 18: 15 } },
  "grand warden": { name: "Grand Warden", group: "hero", levels: { 11: 20, 12: 40, 13: 50, 14: 60, 15: 65, 16: 70, 17: 75, 18: 85 } },
  "greedy raven": { name: "Greedy Raven", group: "pet", levels: { 18: 10 } },
  "haste spell": { name: "Haste Spell", group: "spell", levels: { 9: 2, 10: 4, 11: 5, 12: 5, 13: 5, 14: 5, 15: 5, 16: 5, 17: 6, 18: 7 } },
  "headhunter": { name: "Headhunter", group: "troop", levels: { 12: 2, 13: 3, 14: 3, 15: 3, 16: 3, 17: 3, 18: 4 } },
  "healer": { name: "Healer", group: "troop", levels: { 6: 1, 7: 2, 8: 3, 9: 4, 10: 4, 11: 5, 12: 5, 13: 6, 14: 7, 15: 8, 16: 9, 17: 10, 18: 11 } },
  "healing spell": { name: "Healing Spell", group: "spell", levels: { 6: 3, 7: 4, 8: 5, 9: 6, 10: 7, 11: 7, 12: 7, 13: 8, 14: 8, 15: 9, 16: 10, 17: 11, 18: 12 } },
  "hero hall": { name: "Hero Hall", group: "army", levels: { 4: 1, 5: 1, 6: 1, 7: 1, 8: 2, 9: 3, 10: 4, 11: 5, 12: 6, 13: 7, 14: 8, 15: 9, 16: 10, 17: 11, 18: 12 } },
  "hidden tesla": { name: "Hidden Tesla", group: "defense", levels: { 7: 3, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 12, 14: 13, 15: 14, 16: 15, 17: 16, 18: 17 } },
  "hog rider": { name: "Hog Rider", group: "troop", levels: { 7: 2, 8: 4, 9: 5, 10: 6, 11: 7, 12: 9, 13: 10, 14: 11, 15: 12, 16: 13, 17: 14, 18: 15 } },
  "ice block spell": { name: "Ice Block Spell", group: "spell", levels: { 14: 2, 15: 3, 16: 4, 17: 5, 18: 6 } },
  "ice golem": { name: "Ice Golem", group: "troop", levels: { 11: 3, 12: 5, 13: 5, 14: 6, 15: 7, 16: 8, 17: 9, 18: 9 } },
  "inferno artillery": { name: "Inferno Artillery", group: "defense", levels: { 17: 5 } },
  "inferno tower": { name: "Inferno Tower", group: "defense", levels: { 10: 3, 11: 5, 12: 6, 13: 7, 14: 8, 15: 9, 16: 10, 17: 11, 18: 12 } },
  "invisibility spell": { name: "Invisibility Spell", group: "spell", levels: { 11: 2, 12: 3, 13: 4, 14: 4, 15: 4, 16: 4, 17: 4, 18: 4 } },
  "jump spell": { name: "Jump Spell", group: "spell", levels: { 9: 2, 10: 3, 11: 3, 12: 3, 13: 4, 14: 4, 15: 5, 16: 5, 17: 5, 18: 5 } },
  "laboratory": { name: "Laboratory", group: "army", levels: { 3: 1, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: 12, 15: 13, 16: 14, 17: 15, 18: 16 } },
  "lassi": { name: "L.A.S.S.I", group: "pet", levels: { 14: 10, 15: 15, 16: 15, 17: 15, 18: 15 } },
  "lava hound": { name: "Lava Hound", group: "troop", levels: { 9: 2, 10: 3, 11: 4, 12: 5, 13: 6, 14: 6, 15: 6, 16: 7, 17: 7, 18: 8 } },
  "lightning spell": { name: "Lightning Spell", group: "spell", levels: { 5: 4, 6: 4, 7: 4, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9, 13: 9, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13 } },
  "log launcher": { name: "Log Launcher", group: "siege", levels: { 13: 4, 14: 4, 15: 4, 16: 5, 17: 5, 18: 6 } },
  "logger": { name: "Logger", group: "guardian", levels: { 18: 5 } },
  "longshot": { name: "Longshot", group: "guardian", levels: { 18: 5 } },
  "meteor golem": { name: "Meteor Golem", group: "troop", levels: { 17: 2, 18: 3 } },
  "mighty yak": { name: "Mighty Yak", group: "pet", levels: { 14: 10, 15: 15, 16: 15, 17: 15, 18: 15 } },
  "miner": { name: "Miner", group: "troop", levels: { 10: 3, 11: 5, 12: 6, 13: 7, 14: 8, 15: 9, 16: 10, 17: 11, 18: 12 } },
  "minion": { name: "Minion", group: "troop", levels: { 7: 2, 8: 4, 9: 5, 10: 6, 11: 7, 12: 8, 13: 9, 14: 10, 15: 11, 16: 12, 17: 13, 18: 14 } },
  "minion prince": { name: "Minion Prince", group: "hero", levels: { 9: 10, 10: 20, 11: 30, 12: 40, 13: 50, 14: 60, 15: 70, 16: 80, 17: 90, 18: 95 } },
  "monolith": { name: "Monolith", group: "defense", levels: { 15: 2, 16: 3, 17: 4, 18: 5 } },
  "mortar": { name: "Mortar", group: "defense", levels: { 3: 1, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6, 9: 7, 10: 8, 11: 10, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18 } },
  "multi archer tower": { name: "Multi-Archer Tower", group: "defense", levels: { 16: 2, 17: 3, 18: 4 } },
  "multi gear tower": { name: "Multi-Gear Tower", group: "defense", levels: { 17: 2, 18: 3 } },
  "overgrowth spell": { name: "Overgrowth Spell", group: "spell", levels: { 12: 2, 13: 2, 14: 3, 15: 3, 16: 4, 17: 4, 18: 5 } },
  "pekka": { name: "P.E.K.K.A", group: "troop", levels: { 8: 3, 9: 4, 10: 6, 11: 7, 12: 8, 13: 9, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13 } },
  "pet house": { name: "Pet House", group: "army", levels: { 14: 4, 15: 8, 16: 10, 17: 11, 18: 12 } },
  "phoenix": { name: "Phoenix", group: "pet", levels: { 15: 10, 16: 10, 17: 10, 18: 10 } },
  "poison lizard": { name: "Poison Lizard", group: "pet", levels: { 15: 10, 16: 10, 17: 15, 18: 15 } },
  "poison spell": { name: "Poison Spell", group: "spell", levels: { 8: 2, 9: 3, 10: 4, 11: 5, 12: 6, 13: 7, 14: 8, 15: 9, 16: 10, 17: 11, 18: 12 } },
  "rage spell": { name: "Rage Spell", group: "spell", levels: { 7: 4, 8: 5, 9: 5, 10: 5, 11: 5, 12: 6, 13: 6, 14: 6, 15: 6, 16: 6, 17: 6, 18: 7 } },
  "recall spell": { name: "Recall Spell", group: "spell", levels: { 13: 2, 14: 3, 15: 4, 16: 5, 17: 6, 18: 7 } },
  "revenge tower": { name: "Revenge Tower", group: "defense", levels: { 18: 2 } },
  "revive spell": { name: "Revive Spell", group: "spell", levels: { 15: 2, 16: 3, 17: 4, 18: 5 } },
  "ricochet cannon": { name: "Ricochet Cannon", group: "defense", levels: { 16: 2, 17: 3, 18: 4 } },
  "root rider": { name: "Root Rider", group: "troop", levels: { 15: 2, 16: 3, 17: 3, 18: 4 } },
  "royal champion": { name: "Royal Champion", group: "hero", levels: { 13: 25, 14: 30, 15: 40, 16: 45, 17: 50, 18: 55 } },
  "ruin witch": { name: "Ruin Witch", group: "troop", levels: { 16: 2, 17: 3, 18: 4 } },
  "scattershot": { name: "Scattershot", group: "defense", levels: { 13: 2, 14: 3, 15: 4, 16: 5, 17: 6, 18: 7 } },
  "seeking air mine": { name: "Seeking Air Mine", group: "trap", levels: { 7: 1, 8: 1, 9: 2, 10: 3, 11: 3, 12: 3, 13: 4, 14: 4, 15: 5, 16: 6, 17: 7, 18: 8 } },
  "siege barracks": { name: "Siege Barracks", group: "siege", levels: { 13: 4, 14: 4, 15: 4, 16: 5, 17: 5, 18: 6 } },
  "skeleton spell": { name: "Skeleton Spell", group: "spell", levels: { 9: 1, 10: 3, 11: 4, 12: 6, 13: 7, 14: 7, 15: 8, 16: 8, 17: 8, 18: 8 } },
  "skeleton trap": { name: "Skeleton Trap", group: "trap", levels: { 8: 2, 9: 3, 10: 4, 11: 4, 12: 4, 13: 4, 14: 4, 15: 4, 16: 4, 17: 4, 18: 5 } },
  "sky wagon": { name: "Sky Wagon", group: "siege", levels: { 17: 2, 18: 4 } },
  "smasher": { name: "Smasher", group: "guardian", levels: { 18: 5 } },
  "sneezy": { name: "Sneezy", group: "pet", levels: { 17: 10, 18: 10 } },
  "spell factory": { name: "Spell Factory", group: "army", levels: { 5: 1, 6: 2, 7: 3, 8: 3, 9: 4, 10: 5, 11: 6, 12: 6, 13: 7, 14: 7, 15: 8, 16: 9, 17: 9, 18: 9 } },
  "spell tower": { name: "Spell Tower", group: "defense", levels: { 15: 3, 16: 3, 17: 4, 18: 4 } },
  "spirit fox": { name: "Spirit Fox", group: "pet", levels: { 16: 10, 17: 10, 18: 10 } },
  "spring trap": { name: "Spring Trap", group: "trap", levels: { 4: 1, 5: 1, 6: 1, 7: 2, 8: 3, 9: 4, 10: 5, 11: 6, 12: 7, 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13 } },
  "stone slammer": { name: "Stone Slammer", group: "siege", levels: { 12: 3, 13: 4, 14: 4, 15: 5, 16: 5, 17: 5, 18: 6 } },
  "super wizard tower": { name: "Super Wizard Tower", group: "defense", levels: { 18: 2 } },
  "thrower": { name: "Thrower", group: "troop", levels: { 16: 2, 17: 3, 18: 4 } },
  "tornado trap": { name: "Tornado Trap", group: "trap", levels: { 11: 2, 12: 3, 13: 3, 14: 3, 15: 3, 16: 3, 17: 3, 18: 3 } },
  "totem spell": { name: "Totem Spell", group: "spell", levels: { 16: 2, 17: 3, 18: 4 } },
  "troop launcher": { name: "Troop Launcher", group: "siege", levels: { 16: 3, 17: 4, 18: 4 } },
  "unicorn": { name: "Unicorn", group: "pet", levels: { 14: 10, 15: 10, 16: 10, 17: 15, 18: 15 } },
  "valkyrie": { name: "Valkyrie", group: "troop", levels: { 8: 2, 9: 4, 10: 5, 11: 6, 12: 7, 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 12 } },
  "wall": { name: "Wall", group: "wall", levels: { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 10, 10: 11, 11: 12, 12: 13, 13: 14, 14: 15, 15: 16, 16: 17, 17: 18, 18: 19 } },
  "wall breaker": { name: "Wall Breaker", group: "troop", levels: { 3: 1, 4: 2, 5: 2, 6: 3, 7: 4, 8: 5, 9: 5, 10: 6, 11: 7, 12: 8, 13: 9, 14: 10, 15: 11, 16: 12, 17: 13, 18: 14 } },
  "wall wrecker": { name: "Wall Wrecker", group: "siege", levels: { 12: 3, 13: 4, 14: 4, 15: 5, 16: 5, 17: 5, 18: 6 } },
  "witch": { name: "Witch", group: "troop", levels: { 9: 2, 10: 3, 11: 4, 12: 5, 13: 5, 14: 5, 15: 6, 16: 7, 17: 7, 18: 8 } },
  "wizard": { name: "Wizard", group: "troop", levels: { 5: 2, 6: 3, 7: 4, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9, 13: 10, 14: 10, 15: 11, 16: 12, 17: 13, 18: 14 } },
  "wizard tower": { name: "Wizard Tower", group: "defense", levels: { 5: 2, 6: 3, 7: 4, 8: 6, 9: 7, 10: 9, 11: 10, 12: 11, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 17 } },
  "workshop": { name: "Workshop", group: "army", levels: { 12: 3, 13: 5, 14: 6, 15: 7, 16: 8, 17: 9, 18: 9 } },
  "x bow": { name: "X-Bow", group: "defense", levels: { 9: 3, 10: 4, 11: 5, 12: 6, 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13 } },
  "yeti": { name: "Yeti", group: "troop", levels: { 12: 2, 13: 3, 14: 4, 15: 5, 16: 6, 17: 7, 18: 8 } },
};

export function capAt(key: string, townHall: number): number | null {
  const row = CAPS[key];
  if (!row) return null;
  const value = row.levels[townHall];
  return typeof value === "number" ? value : null;
}

