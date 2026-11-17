import { n as accountFromApi, u as normalizeTag } from "./tags-WvXno7Mm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fetch-player.server-BlO_SIlL.js
var DEFAULT_PROXY = "https://cocproxy.royaleapi.dev";
var SUCCESS_TTL_MS = 6e5;
var NEGATIVE_TTL_MS = 6e4;
var TIMEOUT_MS = 12e3;
var cache = /* @__PURE__ */ new Map();
var inflight = /* @__PURE__ */ new Map();
function proxyBase() {
	return (process.env.COC_PROXY_BASE?.trim() || DEFAULT_PROXY).replace(/\/$/, "");
}
function remember(tag, result, ttl) {
	if (cache.size > 200) {
		const oldest = cache.keys().next().value;
		if (oldest) cache.delete(oldest);
	}
	cache.set(tag, {
		expires: Date.now() + ttl,
		result
	});
}
async function requestPlayer(tag, token) {
	const url = `${proxyBase()}/v1/players/${encodeURIComponent(tag)}`;
	let response;
	try {
		response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json"
			},
			signal: AbortSignal.timeout(TIMEOUT_MS)
		});
	} catch (error) {
		const timedOut = error instanceof Error && error.name === "TimeoutError";
		return {
			ok: false,
			error: timedOut ? "timeout" : "upstream",
			message: timedOut ? "The RoyaleAPI proxy did not answer in time." : "The RoyaleAPI proxy could not be reached. No direct Supercell request was sent.",
			retryAfter: null
		};
	}
	const retryAfterHeader = response.headers.get("retry-after");
	const retryAfter = retryAfterHeader ? Number(retryAfterHeader) : null;
	if (response.status === 404) return {
		ok: false,
		error: "not_found",
		message: `No player found for ${tag}.`,
		retryAfter: null
	};
	if (response.status === 400) return {
		ok: false,
		error: "invalid_tag",
		message: `${tag} was rejected by the API.`,
		retryAfter: null
	};
	if (response.status === 401 || response.status === 403) return {
		ok: false,
		error: response.status === 401 ? "unauthorized" : "forbidden",
		message: "The Clash of Clans token was rejected. Create it at developer.clashofclans.com and allowlist the RoyaleAPI proxy IP 45.79.218.79.",
		retryAfter: null
	};
	if (response.status === 429) return {
		ok: false,
		error: "rate_limit",
		message: "The Clash API rate limit was hit. Wait a moment before trying again.",
		retryAfter: Number.isFinite(retryAfter) ? retryAfter : 30
	};
	if (!response.ok) return {
		ok: false,
		error: "upstream",
		message: `The proxy returned status ${response.status}. ClashIQ did not call Supercell directly.`,
		retryAfter: null
	};
	let body;
	try {
		body = await response.json();
	} catch {
		return {
			ok: false,
			error: "bad_response",
			message: "The proxy returned a body that was not JSON.",
			retryAfter: null
		};
	}
	const account = accountFromApi(body, (/* @__PURE__ */ new Date()).toISOString());
	if (!account) return {
		ok: false,
		error: "bad_response",
		message: "The player payload was missing a tag.",
		retryAfter: null
	};
	return {
		ok: true,
		account,
		cached: false
	};
}
async function loadPlayer(input) {
	const tag = normalizeTag(input);
	if (!tag) return {
		ok: false,
		error: "invalid_tag",
		message: "Player tags use the letters and numbers from the in-game tag, for example #P2YQLGRJ.",
		retryAfter: null
	};
	const token = process.env.COC_API_TOKEN?.trim();
	if (!token) return {
		ok: false,
		error: "not_configured",
		message: "Live tag lookup is not configured on this server. Village exports and the worked example still run.",
		retryAfter: null
	};
	const hit = cache.get(tag);
	if (hit && hit.expires > Date.now()) return hit.result.ok ? {
		...hit.result,
		cached: true
	} : hit.result;
	const pending = inflight.get(tag);
	if (pending) return pending;
	const promise = requestPlayer(tag, token).then((result) => {
		if (result.ok) remember(tag, result, SUCCESS_TTL_MS);
		else if (result.error === "not_found" || result.error === "invalid_tag") remember(tag, result, NEGATIVE_TTL_MS);
		return result;
	}).finally(() => {
		inflight.delete(tag);
	});
	inflight.set(tag, promise);
	return promise;
}
//#endregion
export { loadPlayer };
