# ClashIQ

Home Village account comparison for Clash of Clans. Enter two player tags, optionally add a village export for each side, and read Town Hall-relative progress. A higher Town Hall is not a win. Missing numbers stay missing. Builder Base is excluded everywhere.

## What you can do

- Compare two official player profiles side by side.
- Swap the two sides.
- Upload an optional export for either player, both, or neither.
- See offensive strength, defensive strength, and building progress as separate readings.
- See category scores, a radar of comparable categories, and per-unit levels.
- Switch between English (LTR) and Persian (RTL), and between light and dark.

Live tag lookup needs a server token. Without one, village exports and the worked example still run.

## Stack

This app runs on TanStack Start (React, TypeScript, Tailwind, Vite), not Next.js. The hosted preview and Vercel deploy path in this workspace only support that stack. Server functions keep the Clash token off the client. There is no database and no sign-in.

Charts use Recharts. Icons use Lucide.

## API

```
ClashIQ server → RoyaleAPI proxy → official Clash of Clans API
```

Documented proxy: [https://docs.royaleapi.com/proxy](https://docs.royaleapi.com/proxy)

- Clash of Clans base: `https://cocproxy.royaleapi.dev`
- Auth: `Authorization: Bearer <token>`
- Player endpoint used: `GET /v1/players/{tag}`
- Allowlisted IP for the key: `45.79.218.79`

The proxy forwards the official API. It does not add buildings, walls, or traps. Those fields are not in the public player payload. If the proxy fails, ClashIQ reports the failure. It does not call `api.clashofclans.com` directly.

Responses are cached in process memory for 10 minutes (1 minute for a confirmed miss). Identical in-flight tags share one request. Timeouts are 12 seconds. HTTP 429 is surfaced with `Retry-After` when the proxy sends it.

## Scoring

Every category score is the average of `level / Town Hall cap` for items that exist at that hall, expressed as 0–100. A level above the published cap is left out, not clipped.

Overall weights, before renormalizing over categories that actually have data:

| Category | Weight |
| --- | --- |
| Heroes | 0.22 |
| Troops | 0.18 |
| Defenses | 0.18 |
| Walls | 0.10 |
| Spells | 0.08 |
| Other buildings | 0.08 |
| Pets | 0.07 |
| Siege machines | 0.05 |
| Traps | 0.04 |

Hero equipment is scored against the `maxLevel` the API sent. It is shown, and it is not folded into the overall number, because Blacksmith caps are not fully modeled.

Offensive strength, defensive strength, and building progress reuse those category scores. They are not added on top of the overall number.

- Offense: heroes 0.34, troops 0.28, pets 0.16, spells 0.14, siege 0.08
- Defense: defenses 0.62, walls 0.26, traps 0.12
- Buildings: defenses 0.45, walls 0.25, other buildings 0.20, traps 0.10

A missing category lowers coverage. It is not entered as zero. If coverage of the weighted model is under 45%, the score is Insufficient data and no winner is named. Equipment is compared only when both accounts share a Town Hall. Raw levels across different halls are not treated as a win.

Cap table: checked 1 October 2026, through Town Hall 18. Town Hall 19 was not in the public tables as of 17 November 2026. Newer halls are displayed and left unscored. At Town Hall 17 the cannon and Eagle Artillery merge into other defenses; those merged names are scored under their own rows.

These scores are calculated by ClashIQ. They are not Supercell statistics.

## Export files

Processed in the browser. Nothing in the file is sent to a third party.

Supported:

- The in-game Settings data export (numeric `data` ids, `lvl`, `cnt`, `buildings`, `walls`, `traps`, `heroes`, and similar lists).
- A named progress file: `{ name, level, count }` rows for buildings, walls, traps, troops, heroes, spells, pets, or equipment.
- A saved official player JSON (`troops` with `name` and `maxLevel` or `village`). This does not add buildings.

Rejected:

- Non-JSON, files over 1.5 MB, files with no Home Village rows, and a tag that does not match the tag typed for that side.

Builder Base keys (`buildings2`, `traps2`, `heroes2`, and `village: "builderBase"`) are ignored. Rows that do not match a known Home Village name are listed as unrecognized and are not scored.

If only one player has an export, that side can show buildings and the other side shows Missing data. No building winner is declared.

## Scripts

```bash
npm install
npm run dev
npm test
npm run typecheck
npm run build
```

## Environment

Copy `.env.example`. Set `COC_API_TOKEN` in the server environment. Optional `COC_PROXY_BASE` overrides the proxy origin. Do not use a `VITE_` prefix.

## Deploy

The production target is Vercel. Set `COC_API_TOKEN` in the project environment. Do not commit the token. The in-memory cache resets when an instance cold-starts; that only means a fresh API read.

## Limits

- No clan war log, capital, or legend history beyond the fields on the player payload.
- No Builder Base.
- Super troops appear only when the payload lists them.
- Equipment is not Town Hall-relative.
- Cap numbers can go stale after a game update. Levels above the table are omitted instead of guessed.
- Live lookup cannot be verified in an environment that has no token.
