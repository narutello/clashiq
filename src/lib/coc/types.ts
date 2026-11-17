import type { CapGroup } from "./caps.ts";

export type DataSource = "api" | "export" | "sample";

export type UnitCategory = CapGroup | "equipment" | "super" | "other";

export type Unit = {
  key: string;
  name: string;
  level: number;
  /** Current game maximum from the API, when the API sent one. */
  maxLevel: number | null;
  count: number;
  category: UnitCategory;
  source: DataSource;
  /** Present in the payload but not in the Town Hall cap table. */
  unlisted: boolean;
};

export type Achievement = {
  name: string;
  stars: number | null;
  value: number | null;
  target: number | null;
};

export type Presence = {
  troops: boolean;
  spells: boolean;
  heroes: boolean;
  equipment: boolean;
  achievements: boolean;
  buildings: boolean;
  traps: boolean;
  walls: boolean;
  guardians: boolean;
};

export type Account = {
  source: DataSource;
  /** ISO time of the API read. Null for export-only or sample dossiers. */
  fetchedAt: string | null;
  exportAt: string | null;
  tag: string;
  name: string | null;
  townHallLevel: number | null;
  townHallWeaponLevel: number | null;
  expLevel: number | null;
  trophies: number | null;
  bestTrophies: number | null;
  warStars: number | null;
  attackWins: number | null;
  defenseWins: number | null;
  donations: number | null;
  donationsReceived: number | null;
  role: string | null;
  warPreference: string | null;
  clan: { name: string; tag: string; level: number | null } | null;
  league: string | null;
  legendTrophies: number | null;
  bestSeasonTrophies: number | null;
  labels: string[];
  achievements: Achievement[];
  units: Unit[];
  /** Unrecognized export rows, keyed for comparison, not scored. */
  unrecognized: Unit[];
  present: Presence;
  notes: string[];
};

export type FetchErrorCode =
  | "invalid_tag"
  | "not_found"
  | "unauthorized"
  | "forbidden"
  | "rate_limit"
  | "timeout"
  | "upstream"
  | "not_configured"
  | "bad_response";

export type PlayerResult =
  | { ok: true; account: Account; cached: boolean }
  | { ok: false; error: FetchErrorCode; message: string; retryAfter: number | null };
