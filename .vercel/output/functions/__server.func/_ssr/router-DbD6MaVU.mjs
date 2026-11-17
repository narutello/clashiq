import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createFileRoute, b as useRouter, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { r as TriangleAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DbD6MaVU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var en = {
	brand: "ClashIQ",
	eyebrow: "Home Village only",
	headline: "See who is actually ahead.",
	lede: "Compare two Clash of Clans accounts on Town Hall-relative progress. A higher Town Hall is not a win. Missing numbers stay missing.",
	playerA: "Player A",
	playerB: "Player B",
	tagLabel: "Player tag",
	tagPlaceholder: "#P2YQLGRJ",
	uploadLabel: "Village export",
	uploadHint: "Optional JSON",
	removeFile: "Remove file",
	compare: "Compare",
	swap: "Swap",
	example: "Worked example",
	clear: "Clear",
	howTitle: "How a comparison is made",
	how1: "Enter two player tags. Live stats come from the official Clash of Clans API through the RoyaleAPI proxy.",
	how2: "Add each village’s in-game JSON export if you want walls, traps, and buildings. The API does not provide them.",
	how3: "Scores measure how finished an account is for its own Town Hall. No winner is called when the data is too thin.",
	schematicCaption: "Schematic of a Town Hall-relative gap. Not a real village.",
	footerNote: "Builder Base is excluded from every screen, score, and total.",
	notAffiliated: "Not affiliated with Supercell. ClashIQ scores are calculated here. They are not official stats.",
	language: "Language",
	themeDark: "Dark",
	themeLight: "Light",
	liveOn: "Live tag lookup is on.",
	liveOff: "Live tag lookup is off on this server. Exports and the worked example still run.",
	reportTitle: "Comparison",
	sampleBanner: "Worked example. Northkeep and Ashmarch are fictional. Nothing here was read from Supercell.",
	sourceApi: "Official API",
	sourceExport: "Uploaded export",
	sourceSample: "Sample",
	fetched: "API read",
	exported: "Export time",
	missing: "Missing data",
	unavailable: "Unavailable",
	even: "Even",
	ahead: "Ahead",
	noWinner: "No winner",
	insufficient: "Insufficient data",
	confidence: "Confidence",
	coverage: "Data coverage",
	overall: "Town Hall-relative score",
	gameMax: "Share of current game max",
	strengths: "Strengths",
	weaknesses: "Weaknesses",
	noneNoted: "None stood out from the data we have.",
	profile: "Profile",
	army: "Army",
	village: "Village",
	strength: "Account strength",
	methodTitle: "How the score is calculated",
	methodBody: "Each category is the average of level divided by the maximum at that account’s Town Hall. Weights are renormalized over categories that actually have data. Equipment is shown against the live game maximum and is left out of the composite, because Blacksmith caps are not fully modeled. A missing category lowers coverage. It is not entered as zero.",
	thesis: "The higher Town Hall lost this read. Progress for the hall you have matters more than the number on the hall.",
	sameHall: "Both accounts share a Town Hall, so raw level gaps are comparable.",
	clan: "Clan",
	league: "League",
	noClan: "No clan",
	achievements: "Achievements",
	unrecognized: "Unrecognized export rows",
	loading: "Reading both accounts",
	compareSame: "Enter two different player tags.",
	needTags: "Enter both player tags.",
	retry: "Try again",
	err_invalid_tag: "That tag does not match a Clash of Clans player tag.",
	err_not_found: "No player was found for that tag.",
	err_unauthorized: "The server token was rejected. Allowlist the RoyaleAPI proxy IP on the token.",
	err_forbidden: "The server token cannot use the proxy. Allowlist 45.79.218.79 when you create the key.",
	err_rate_limit: "The Clash API asked us to slow down. Wait a moment, then try again.",
	err_timeout: "The RoyaleAPI proxy timed out. Nothing was sent directly to Supercell.",
	err_upstream: "The RoyaleAPI proxy failed. Nothing was sent directly to Supercell.",
	err_not_configured: "Live tag lookup is not configured. Add village exports for both players, or open the worked example.",
	err_bad_response: "The player response could not be read.",
	err_export_invalid: "That file is not a supported village export.",
	err_export_large: "That file is larger than 1.5 MB.",
	err_export_empty: "The file had no Home Village data.",
	radarTitle: "Category shape",
	ofCap: "of Town Hall cap",
	active: "Active",
	count: "count",
	included: "Included in the score",
	leftOut: "Left out",
	capNote: "Caps checked 1 October 2026, through Town Hall 18. Newer halls are shown, not invented.",
	exportOnly: "This side is export-only. Profile stats that the file did not contain stay missing.",
	apiWarning: "Live lookup failed, so this side uses the export only.",
	conf_high: "High",
	conf_medium: "Medium",
	conf_low: "Low",
	conf_insufficient: "Insufficient",
	conf_na: "Not in this Town Hall",
	cat_hero: "Heroes",
	cat_troop: "Troops",
	cat_spell: "Spells",
	cat_siege: "Siege machines",
	cat_pet: "Pets",
	cat_defense: "Defenses",
	cat_wall: "Walls",
	cat_trap: "Traps",
	cat_structure: "Other buildings",
	cat_equipment: "Hero equipment",
	stat_townHall: "Town Hall",
	stat_weapon: "Weapon",
	stat_exp: "Experience",
	stat_trophies: "Trophies",
	stat_bestTrophies: "Best trophies",
	stat_warStars: "War stars",
	stat_attackWins: "Attack wins",
	stat_defenseWins: "Defense wins",
	stat_donations: "Donations",
	"note_missing-th": "Town Hall level is missing, so this cannot be scored.",
	"note_above-known-th": "This Town Hall is newer than the published cap table, so no relative score was invented.",
	"note_not-in-data": "This category was not in the data we received.",
	"note_not-at-hall": "Nothing in this category exists at this Town Hall.",
	"note_above-cap": "Live levels sit above the published cap, so the category was left unscored.",
	"note_stale": "Some levels were above the published cap and were left out instead of being clipped.",
	"note_walls-missing": "Walls were not in the export.",
	"note_walls-above": "The average wall level is above the published cap.",
	"note_walls-empty": "The export included a wall list and it was empty.",
	"note_equipment-missing": "Hero equipment was not in the data.",
	"note_equipment-no-max": "Equipment has no game maximum to compare against.",
	"note_equipment-basis": "Share of the current game maximum. Not part of the Town Hall-relative score.",
	"note_buildings-missing": "Buildings, walls, and traps need a village export. The official API does not publish them.",
	"note_api-snapshot": "This upload matches an official player payload. It does not add buildings, walls, or traps.",
	"note_export-th-mismatch": "The export’s Town Hall does not match the API Town Hall.",
	"note_sample": "Fictional worked example.",
	"note_export-unverified": "The file had no player tag, so it could not be matched.",
	"note_api-failed": "Live lookup failed. This side is using the export only.",
	role_leader: "Leader",
	role_coLeader: "Co-leader",
	role_admin: "Elder",
	role_member: "Member",
	pref_in: "Wars in",
	pref_out: "Wars out",
	cat_super: "Super troops",
	cat_guardian: "Guardians",
	cat_resource: "Resources",
	cat_army: "Army buildings",
	verdictA: "Player A is further along for the halls they have.",
	verdictB: "Player B is further along for the halls they have.",
	verdictEven: "The Town Hall-relative scores are even.",
	verdictNone: "Not enough shared data to name an overall winner.",
	offense: "Offensive strength",
	defensePower: "Defensive strength",
	building: "Building progress",
	compositeNote: "These three readings reuse the category scores. They are not added again into the overall number.",
	readings: "Three readings",
	previewKicker: "Fictional preview",
	previewBody: "A finished Town Hall 15 against a rushed Town Hall 17. The lower hall leads, because the score is relative.",
	openExample: "Open this example",
	fileReady: "File accepted. It will be read in the browser when you compare.",
	loadingDetail: "Tags go through the RoyaleAPI proxy. Files stay in this browser."
};
var fa = {
	brand: "ClashIQ",
	eyebrow: "فقط دهکده اصلی",
	headline: "ببین واقعاً چه کسی جلوتر است.",
	lede: "دو اکانت کلش آف کلنز را نسبت به سقف تالار خودشان بسنج. تالار بالاتر یعنی برنده نیست. عددِ نبوده، ساخته نمی‌شود.",
	playerA: "بازیکن A",
	playerB: "بازیکن B",
	tagLabel: "تگ بازیکن",
	tagPlaceholder: "#P2YQLGRJ",
	uploadLabel: "خروجی دهکده",
	uploadHint: "JSON اختیاری",
	removeFile: "حذف فایل",
	compare: "مقایسه",
	swap: "جابه‌جایی",
	example: "نمونه توضیحی",
	clear: "پاک کردن",
	howTitle: "مقایسه چطور ساخته می‌شود",
	how1: "دو تگ وارد کن. آمار زنده از API رسمی کلش، از مسیر پروکسی RoyaleAPI، خوانده می‌شود.",
	how2: "اگر دیوار، تله و ساختمان می‌خواهی، خروجی JSON داخل بازی را برای هر دهکده جدا اضافه کن. API آن‌ها را ندارد.",
	how3: "امتیاز یعنی هر اکانت نسبت به سقف تالار خودش چقدر کامل است. وقتی داده کم است، برنده‌ای اعلام نمی‌شود.",
	schematicCaption: "طرح ساده یک فاصله نسبی. این یک دهکده واقعی نیست.",
	footerNote: "بیس بیلدر از همه صفحه‌ها، امتیازها و جمع‌ها حذف شده است.",
	notAffiliated: "وابسته به سوپرسل نیست. امتیازهای ClashIQ محاسبه‌ای هستند، نه آمار رسمی.",
	language: "زبان",
	themeDark: "تیره",
	themeLight: "روشن",
	liveOn: "جستجوی زنده تگ روشن است.",
	liveOff: "جستجوی زنده تگ روی این سرور خاموش است. خروجی دهکده و نمونه توضیحی کار می‌کنند.",
	reportTitle: "مقایسه",
	sampleBanner: "نمونه توضیحی. Northkeep و Ashmarch خیالی هستند و از سوپرسل خوانده نشده‌اند.",
	sourceApi: "API رسمی",
	sourceExport: "فایل بارگذاری‌شده",
	sourceSample: "نمونه",
	fetched: "زمان خواندن API",
	exported: "زمان خروجی",
	missing: "داده موجود نیست",
	unavailable: "در دسترس نیست",
	even: "مساوی",
	ahead: "جلوتر",
	noWinner: "بدون برنده",
	insufficient: "داده ناکافی",
	confidence: "اطمینان",
	coverage: "پوشش داده",
	overall: "امتیاز نسبت به تالار",
	gameMax: "سهم از سقف فعلی بازی",
	strengths: "نقطه قوت",
	weaknesses: "نقطه ضعف",
	noneNoted: "با داده‌ای که داریم، مورد مشخصی بیرون نزد.",
	profile: "پروفایل",
	army: "ارتش",
	village: "دهکده",
	strength: "قدرت اکانت",
	methodTitle: "امتیاز چطور حساب می‌شود",
	methodBody: "هر دسته، میانگین سطح تقسیم بر سقف همان تالار است. وزن‌ها فقط روی دسته‌هایی که داده دارند دوباره پخش می‌شوند. تجهیزات با سقف فعلی بازی نشان داده می‌شود و وارد جمع نمی‌شود، چون سقف بلک‌اسمیت کامل مدل نشده. دسته غایب پوشش را کم می‌کند و صفر حساب نمی‌شود.",
	thesis: "تالار بالاتر در این خوانش باخت. پیشرفت نسبت به تالار خودت مهم‌تر از شماره تالار است.",
	sameHall: "هر دو اکانت یک تالار دارند، پس فاصله سطح خام قابل مقایسه است.",
	clan: "کلن",
	league: "لیگ",
	noClan: "بدون کلن",
	achievements: "دستاوردها",
	unrecognized: "ردیف‌های ناشناس خروجی",
	loading: "در حال خواندن هر دو اکانت",
	compareSame: "دو تگ متفاوت وارد کن.",
	needTags: "هر دو تگ را وارد کن.",
	retry: "دوباره",
	err_invalid_tag: "این تگ شبیه تگ بازیکن کلش آف کلنز نیست.",
	err_not_found: "بازیکنی با این تگ پیدا نشد.",
	err_unauthorized: "توکن سرور رد شد. IP پروکسی RoyaleAPI باید روی توکن مجاز باشد.",
	err_forbidden: "توکن سرور اجازه استفاده از پروکسی را ندارد. هنگام ساخت کلید، 45.79.218.79 را مجاز کن.",
	err_rate_limit: "API کلش خواست آهسته‌تر بپرسیم. کمی بعد دوباره تلاش کن.",
	err_timeout: "پروکسی RoyaleAPI پاسخ نداد. درخواست مستقیم به سوپرسل فرستاده نشد.",
	err_upstream: "پروکسی RoyaleAPI خطا داد. درخواست مستقیم به سوپرسل فرستاده نشد.",
	err_not_configured: "جستجوی زنده تنظیم نشده. برای هر دو بازیکن خروجی دهکده بده، یا نمونه توضیحی را باز کن.",
	err_bad_response: "پاسخ بازیکن خوانده نشد.",
	err_export_invalid: "این فایل یک خروجی دهکده پشتیبانی‌شده نیست.",
	err_export_large: "حجم فایل بیشتر از ۱.۵ مگابایت است.",
	err_export_empty: "فایل داده دهکده اصلی نداشت.",
	radarTitle: "شکل دسته‌ها",
	ofCap: "از سقف تالار",
	active: "فعال",
	count: "تعداد",
	included: "داخل امتیاز",
	leftOut: "خارج از امتیاز",
	capNote: "سقف‌ها تا ۱ اکتبر ۲۰۲۶ و تالار ۱۸ بررسی شده‌اند. تالارهای جدیدتر نشان داده می‌شوند، نه حدس.",
	exportOnly: "این سمت فقط از فایل است. آماری که داخل فایل نبود، خالی می‌ماند.",
	apiWarning: "خواندن زنده ناموفق بود. این سمت فقط از فایل استفاده می‌کند.",
	conf_high: "بالا",
	conf_medium: "متوسط",
	conf_low: "پایین",
	conf_insufficient: "ناکافی",
	conf_na: "در این تالار نیست",
	cat_hero: "هیروها",
	cat_troop: "سربازها",
	cat_spell: "اسپل‌ها",
	cat_siege: "ماشین‌های محاصره",
	cat_pet: "پت‌ها",
	cat_defense: "دفاع‌ها",
	cat_wall: "دیوارها",
	cat_trap: "تله‌ها",
	cat_structure: "ساختمان‌های دیگر",
	cat_equipment: "تجهیزات هیرو",
	stat_townHall: "تالار",
	stat_weapon: "سلاح",
	stat_exp: "تجربه",
	stat_trophies: "کاپ",
	stat_bestTrophies: "بهترین",
	stat_warStars: "ستاره جنگ",
	stat_attackWins: "برد حمله",
	stat_defenseWins: "برد دفاع",
	stat_donations: "دونیت",
	"note_missing-th": "سطح تالار نیست، پس این دسته امتیاز نمی‌گیرد.",
	"note_above-known-th": "این تالار از جدول سقف منتشرشده جدیدتر است. امتیاز نسبی ساخته نشد.",
	"note_not-in-data": "این دسته در داده‌ای که رسید نبود.",
	"note_not-at-hall": "در این تالار چنین دسته‌ای وجود ندارد.",
	"note_above-cap": "سطح‌های زنده بالاتر از سقف منتشرشده بودند و امتیاز داده نشد.",
	"note_stale": "بعضی سطح‌ها بالاتر از سقف منتشرشده بودند و به‌جای برش، کنار گذاشته شدند.",
	"note_walls-missing": "دیوارها در خروجی نبود.",
	"note_walls-above": "میانگین دیوار بالاتر از سقف منتشرشده است.",
	"note_walls-empty": "فهرست دیوار در خروجی بود و خالی بود.",
	"note_equipment-missing": "تجهیزات هیرو در داده نبود.",
	"note_equipment-no-max": "برای تجهیزات سقف بازی وجود ندارد.",
	"note_equipment-basis": "سهم از سقف فعلی بازی. داخل امتیاز نسبت به تالار نیست.",
	"note_buildings-missing": "ساختمان، دیوار و تله به خروجی دهکده نیاز دارند. API رسمی آن‌ها را نمی‌دهد.",
	"note_api-snapshot": "این فایل شبیه پاسخ رسمی بازیکن است و ساختمان، دیوار یا تله اضافه نمی‌کند.",
	"note_export-th-mismatch": "تالار داخل فایل با تالار API یکی نیست.",
	"note_sample": "نمونه خیالی.",
	"note_export-unverified": "فایل تگ بازیکن نداشت، پس تطبیق داده نشد.",
	"note_api-failed": "خواندن زنده ناموفق بود. این سمت فقط از فایل استفاده می‌کند.",
	role_leader: "لیدر",
	role_coLeader: "کولیدر",
	role_admin: "الدِر",
	role_member: "ممبر",
	pref_in: "داخل جنگ",
	pref_out: "خارج از جنگ",
	cat_super: "سوپر سرباز",
	cat_guardian: "گاردین",
	cat_resource: "منابع",
	cat_army: "ساختمان ارتش",
	verdictA: "بازیکن A نسبت به تالار خودش جلوتر است.",
	verdictB: "بازیکن B نسبت به تالار خودش جلوتر است.",
	verdictEven: "امتیازهای نسبت به تالار مساوی‌اند.",
	verdictNone: "داده مشترک برای اعلام برنده کلی کافی نیست.",
	offense: "قدرت حمله",
	defensePower: "قدرت دفاع",
	building: "پیشرفت ساختمان",
	compositeNote: "این سه خوانش همان امتیاز دسته‌ها را دوباره جمع می‌کنند و بار دیگر وارد عدد کلی نمی‌شوند.",
	readings: "سه خوانش",
	previewKicker: "پیش‌نمایش خیالی",
	previewBody: "یک تالار ۱۵ کامل در برابر یک تالار ۱۷ راش. تالار پایین‌تر جلو است، چون امتیاز نسبی است.",
	openExample: "باز کردن همین نمونه",
	fileReady: "فایل پذیرفته شد. هنگام مقایسه، داخل همین مرورگر خوانده می‌شود.",
	loadingDetail: "تگ‌ها از پروکسی RoyaleAPI می‌روند. فایل‌ها در همین مرورگر می‌مانند."
};
var I18nContext = (0, import_react.createContext)(null);
function I18nProvider({ children }) {
	const [locale, setLocaleState] = (0, import_react.useState)("en");
	(0, import_react.useEffect)(() => {
		const stored = localStorage.getItem("clashiq-locale");
		if (stored === "fa" || stored === "en") setLocaleState(stored);
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.lang = locale;
		document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
	}, [locale]);
	const value = (0, import_react.useMemo)(() => {
		const table = locale === "fa" ? fa : en;
		return {
			locale,
			setLocale: (next) => {
				setLocaleState(next);
				localStorage.setItem("clashiq-locale", next);
			},
			t: (key) => table[key] ?? en[key]
		};
	}, [locale]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nContext.Provider, {
		value,
		children
	});
}
function useI18n() {
	const value = (0, import_react.useContext)(I18nContext);
	if (!value) throw new Error("useI18n must be used inside I18nProvider");
	return value;
}
var styles_default = "/assets/styles-B-t77_g2.css";
var themeBoot = `try{var t=localStorage.getItem("clashiq-theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}`;
var Route$1 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "ClashIQ" },
			{
				name: "description",
				content: "Home Village account comparison for Clash of Clans. Town Hall-relative, with missing data left missing."
			},
			{
				name: "theme-color",
				content: "#12100e"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,650&family=Outfit:wght@400;500;600&family=Vazirmatn:wght@400;500;600&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: themeBoot } })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var TagInput = object({ tag: string().min(1).max(20) });
var apiStatus = createServerFn({ method: "GET" }).handler(createSsrRpc("10f584fd746ae6a36beb53e4f28c20569563f9f2fde1ee40a7f25ac53051f79d"));
var fetchPlayer = createServerFn({ method: "POST" }).validator((input) => TagInput.parse(input)).handler(createSsrRpc("23f1ddaf17426c6ded1d622d1deabd57679ad042248aa9f38105524428d468cf"));
var $$splitComponentImporter = () => import("./routes-BChFBUJ5.mjs").then((n) => n.t);
var Route = createFileRoute("/")({
	validateSearch: (search) => ({
		a: typeof search.a === "string" ? search.a : "",
		b: typeof search.b === "string" ? search.b : "",
		example: search.example === "1" || search.example === 1 || search.example === true ? "1" : ""
	}),
	loader: () => apiStatus(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = { IndexRoute: Route.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent,
		scrollRestoration: true
	});
}
//#endregion
export { useI18n as i, Route as n, fetchPlayer as r, router_exports as t };
