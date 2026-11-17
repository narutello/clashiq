import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { compareAccounts } from "./compare.ts";
import { parseExport } from "./export-parse.ts";
import { accountFromApi, mergeAccounts } from "./normalize.ts";
import { analyzeAccount } from "./score.ts";
import { workedExample } from "./sample.ts";
import { normalizeTag } from "./tags.ts";
import { blankAccount } from "./normalize.ts";

describe("tags", () => {
  it("accepts a real tag alphabet and rejects others", () => {
    assert.equal(normalizeTag("p2yqlgrj"), "#P2YQLGRJ");
    assert.equal(normalizeTag("#p2yqlgrj"), "#P2YQLGRJ");
    assert.equal(normalizeTag("#OOO"), null);
    assert.equal(normalizeTag("ab"), null);
  });
});

describe("api normalize", () => {
  it("drops builder base and keeps missing numbers null", () => {
    const account = accountFromApi(
      {
        tag: "#P2YQLGRJ",
        name: "North",
        townHallLevel: 15,
        trophies: 10,
        troops: [
          { name: "Barbarian", level: 11, maxLevel: 13, village: "home" },
          { name: "Raged Barbarian", level: 18, maxLevel: 20, village: "builderBase" },
          { name: "L.A.S.S.I", level: 10, maxLevel: 15, village: "home" },
          { name: "Wall Wrecker", level: 4, maxLevel: 6, village: "home" },
        ],
        heroes: [
          { name: "Barbarian King", level: 90, maxLevel: 110, village: "home" },
          { name: "Battle Machine", level: 35, maxLevel: 35, village: "builderBase" },
        ],
        spells: [{ name: "Lightning Spell", level: 10, maxLevel: 13, village: "home" }],
        heroEquipment: [{ name: "Giant Gauntlet", level: 12, maxLevel: 27, village: "home" }],
        achievements: [
          { name: "War Hero", stars: 2, value: 400, target: 1000 },
          { name: "Conqueror", stars: 3, value: 100, target: 100, info: "Win versus battles" },
        ],
      },
      "2026-11-16T00:00:00.000Z",
    );
    assert.ok(account);
    assert.equal(account?.bestTrophies, null);
    assert.equal(account?.units.some((unit) => unit.name === "Raged Barbarian"), false);
    assert.equal(account?.units.some((unit) => unit.name === "Battle Machine"), false);
    assert.equal(account?.units.some((unit) => unit.category === "pet"), true);
    assert.equal(account?.units.some((unit) => unit.category === "siege"), true);
    assert.equal(account?.achievements.some((item) => item.name === "Conqueror"), false);
    assert.equal(account?.achievements.length, 1);
  });

  it("does not treat a missing heroes array as level zero", () => {
    const account = accountFromApi(
      {
        tag: "#P2YQLGRJ",
        name: "Thin",
        townHallLevel: 15,
        troops: [{ name: "Barbarian", level: 11, maxLevel: 13, village: "home" }],
      },
      "2026-11-16T00:00:00.000Z",
    );
    assert.ok(account);
    const analysis = analyzeAccount(account!);
    const heroes = analysis.categories.find((row) => row.id === "hero");
    assert.equal(heroes?.value, null);
    assert.equal(heroes?.confidence, "insufficient");
    assert.equal(analysis.overall.value, null);
  });
});

describe("export", () => {
  it("reads the in-game export and ignores builder base", () => {
    const result = parseExport(
      JSON.stringify({
        tag: "#P2YQLGRJ",
        timestamp: 1_700_000_000,
        buildings: [
          { data: 1000001, lvl: 15, cnt: 1 },
          { data: 1000008, lvl: 21, cnt: 2 },
        ],
        buildings2: [{ data: 1000034, lvl: 10, cnt: 1 }],
        walls: [
          { data: 1000010, lvl: 16, cnt: 100 },
          { data: 1000010, lvl: 14, cnt: 100 },
        ],
        traps: [{ data: 999001, lvl: 4, cnt: 1 }],
        heroes: [{ data: 28000000, lvl: 90 }],
      }),
      "#P2YQLGRJ",
    );
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.account.townHallLevel, 15);
    assert.equal(result.account.units.some((unit) => unit.name === "Builder Hall"), false);
    const cannons = result.account.units.find((unit) => unit.key === "cannon");
    assert.equal(cannons?.level, 21);
    assert.equal(cannons?.count, 2);
    const wall = result.account.units.find((unit) => unit.category === "wall");
    assert.equal(wall?.level, 15);
    assert.equal(wall?.count, 200);
    assert.equal(result.account.units.some((unit) => unit.name === "Barbarian King"), true);
    assert.ok(result.account.unrecognized.some((unit) => unit.key === "id:999001"));
  });

  it("rejects a tag mismatch and an unknown file", () => {
    const mismatch = parseExport(JSON.stringify({ tag: "#P2YQLGRJ", buildings: [{ name: "Cannon", level: 10 }] }), "#C0V28Q9U");
    assert.equal(mismatch.ok, false);
    if (!mismatch.ok) assert.equal(mismatch.error, "mismatch");
    const bad = parseExport(JSON.stringify({ hello: true }), null);
    assert.equal(bad.ok, false);
  });

  it("accepts a named file and an api-shaped snapshot", () => {
    const named = parseExport(
      JSON.stringify({
        tag: "#P2YQLGRJ",
        buildings: [{ name: "Cannon", level: 20, count: 3 }],
        walls: [{ name: "Wall", level: 16, count: 250 }],
      }),
      null,
    );
    assert.equal(named.ok, true);
    if (named.ok) assert.equal(named.account.present.walls, true);

    const snapshot = parseExport(
      JSON.stringify({
        tag: "#P2YQLGRJ",
        name: "North",
        townHallLevel: 15,
        troops: [
          { name: "Barbarian", level: 11, maxLevel: 13, village: "home" },
          { name: "Raged Barbarian", level: 10, maxLevel: 18, village: "builderBase" },
        ],
        heroes: [{ name: "Battle Machine", level: 20, maxLevel: 35, village: "builderBase" }],
      }),
      "#P2YQLGRJ",
    );
    assert.equal(snapshot.ok, true);
    if (!snapshot.ok) return;
    assert.equal(snapshot.account.units.some((unit) => unit.name.includes("Raged")), false);
    assert.equal(snapshot.account.units.some((unit) => unit.name === "Battle Machine"), false);
    assert.equal(snapshot.account.present.buildings, false);
  });
});

describe("scoring", () => {
  it("lets a finished lower hall beat a rushed higher hall", () => {
    const { a, b } = workedExample();
    const comparison = compareAccounts(a, b);
    assert.ok((comparison.analysisA.overall.value ?? 0) > (comparison.analysisB.overall.value ?? 100));
    assert.equal(comparison.overallWinner, "a");
    assert.equal(comparison.stats.find((row) => row.id === "trophies")?.winner, "b");
    const defense = comparison.categories.find((row) => row.id === "defense");
    assert.equal(defense?.winner, "a");
    assert.equal(comparison.categories.find((row) => row.id === "equipment")?.winner, null);
    assert.equal(comparison.composites.find((row) => row.id === "offense")?.winner, "a");
    assert.equal(comparison.composites.find((row) => row.id === "defensePower")?.winner, "a");
    assert.notEqual(comparison.analysisA.overall.value, null);
  });

  it("does not name a building winner when only one export exists", () => {
    const { a, b } = workedExample();
    const bare = blankAccount({
      ...b,
      units: b.units.filter((unit) => !["defense", "trap", "wall", "resource", "army", "guardian"].includes(unit.category)),
      present: { ...b.present, buildings: false, traps: false, walls: false },
    });
    const comparison = compareAccounts(a, bare);
    assert.equal(comparison.categories.find((row) => row.id === "defense")?.winner, null);
    assert.equal(comparison.categories.find((row) => row.id === "wall")?.winner, null);
    assert.equal(comparison.composites.find((row) => row.id === "defensePower")?.winner, null);
    assert.equal(comparison.composites.find((row) => row.id === "building")?.winner, null);
    const merged = mergeAccounts(
      accountFromApi(
        {
          tag: "#P2YQLGRJ",
          name: "North",
          townHallLevel: 15,
          troops: [{ name: "Barbarian", level: 11, maxLevel: 13, village: "home" }],
          heroes: [{ name: "Barbarian King", level: 80, maxLevel: 110, village: "home" }],
        },
        "2026-11-16T00:00:00.000Z",
      ),
      parseExport(JSON.stringify({ tag: "#P2YQLGRJ", buildings: [{ name: "Cannon", level: 21, count: 1 }] }), "#P2YQLGRJ").ok
        ? (parseExport(JSON.stringify({ tag: "#P2YQLGRJ", buildings: [{ name: "Cannon", level: 21, count: 1 }] }), "#P2YQLGRJ") as { ok: true; account: ReturnType<typeof blankAccount> }).account
        : null,
    );
    assert.equal(merged?.units.some((unit) => unit.key === "cannon"), true);
    assert.equal(merged?.source, "api");
  });
});
