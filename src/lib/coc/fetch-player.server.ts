import { accountFromApi } from "./normalize.ts";
import { normalizeTag } from "./tags.ts";
import type { PlayerResult } from "./types.ts";

const DEFAULT_PROXY = "https://cocproxy.royaleapi.dev";
const SUCCESS_TTL_MS = 10 * 60 * 1000;
const NEGATIVE_TTL_MS = 60 * 1000;
const TIMEOUT_MS = 12_000;

type CacheEntry = { expires: number; result: PlayerResult };

const cache = new Map<string, CacheEntry>();
const inflight = new Map<string, Promise<PlayerResult>>();

function proxyBase(): string {
  const configured = process.env.COC_PROXY_BASE?.trim();
  return (configured || DEFAULT_PROXY).replace(/\/$/, "");
}

function remember(tag: string, result: PlayerResult, ttl: number) {
  if (cache.size > 200) {
    const oldest = cache.keys().next().value;
    if (oldest) cache.delete(oldest);
  }
  cache.set(tag, { expires: Date.now() + ttl, result });
}

async function requestPlayer(tag: string, token: string): Promise<PlayerResult> {
  const url = `${proxyBase()}/v1/players/${encodeURIComponent(tag)}`;
  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    return {
      ok: false,
      error: timedOut ? "timeout" : "upstream",
      message: timedOut
        ? "The RoyaleAPI proxy did not answer in time."
        : "The RoyaleAPI proxy could not be reached. No direct Supercell request was sent.",
      retryAfter: null,
    };
  }

  const retryAfterHeader = response.headers.get("retry-after");
  const retryAfter = retryAfterHeader ? Number(retryAfterHeader) : null;
  if (response.status === 404) {
    return { ok: false, error: "not_found", message: `No player found for ${tag}.`, retryAfter: null };
  }
  if (response.status === 400) {
    return { ok: false, error: "invalid_tag", message: `${tag} was rejected by the API.`, retryAfter: null };
  }
  if (response.status === 401 || response.status === 403) {
    return {
      ok: false,
      error: response.status === 401 ? "unauthorized" : "forbidden",
      message:
        "The Clash of Clans token was rejected. Create it at developer.clashofclans.com and allowlist the RoyaleAPI proxy IP 45.79.218.79.",
      retryAfter: null,
    };
  }
  if (response.status === 429) {
    return {
      ok: false,
      error: "rate_limit",
      message: "The Clash API rate limit was hit. Wait a moment before trying again.",
      retryAfter: Number.isFinite(retryAfter) ? retryAfter : 30,
    };
  }
  if (!response.ok) {
    return {
      ok: false,
      error: "upstream",
      message: `The proxy returned status ${response.status}. ClashIQ did not call Supercell directly.`,
      retryAfter: null,
    };
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return { ok: false, error: "bad_response", message: "The proxy returned a body that was not JSON.", retryAfter: null };
  }
  const account = accountFromApi(body, new Date().toISOString());
  if (!account) {
    return { ok: false, error: "bad_response", message: "The player payload was missing a tag.", retryAfter: null };
  }
  return { ok: true, account, cached: false };
}

export async function loadPlayer(input: string): Promise<PlayerResult> {
  const tag = normalizeTag(input);
  if (!tag) {
    return {
      ok: false,
      error: "invalid_tag",
      message: "Player tags use the letters and numbers from the in-game tag, for example #P2YQLGRJ.",
      retryAfter: null,
    };
  }
  const token = process.env.COC_API_TOKEN?.trim();
  if (!token) {
    return {
      ok: false,
      error: "not_configured",
      message: "Live tag lookup is not configured on this server. Village exports and the worked example still run.",
      retryAfter: null,
    };
  }

  const hit = cache.get(tag);
  if (hit && hit.expires > Date.now()) {
    return hit.result.ok ? { ...hit.result, cached: true } : hit.result;
  }
  const pending = inflight.get(tag);
  if (pending) return pending;

  const promise = requestPlayer(tag, token)
    .then((result) => {
      if (result.ok) remember(tag, result, SUCCESS_TTL_MS);
      else if (result.error === "not_found" || result.error === "invalid_tag") remember(tag, result, NEGATIVE_TTL_MS);
      return result;
    })
    .finally(() => {
      inflight.delete(tag);
    });
  inflight.set(tag, promise);
  return promise;
}
