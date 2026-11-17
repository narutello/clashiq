import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/player.functions-M2alsxKE.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var TagInput = object({ tag: string().min(1).max(20) });
var apiStatus_createServerFn_handler = createServerRpc({
	id: "10f584fd746ae6a36beb53e4f28c20569563f9f2fde1ee40a7f25ac53051f79d",
	name: "apiStatus",
	filename: "src/lib/coc/player.functions.ts"
}, (opts) => apiStatus.__executeServer(opts));
var apiStatus = createServerFn({ method: "GET" }).handler(apiStatus_createServerFn_handler, async () => {
	return { configured: Boolean(process.env.COC_API_TOKEN?.trim()) };
});
var fetchPlayer_createServerFn_handler = createServerRpc({
	id: "23f1ddaf17426c6ded1d622d1deabd57679ad042248aa9f38105524428d468cf",
	name: "fetchPlayer",
	filename: "src/lib/coc/player.functions.ts"
}, (opts) => fetchPlayer.__executeServer(opts));
var fetchPlayer = createServerFn({ method: "POST" }).validator((input) => TagInput.parse(input)).handler(fetchPlayer_createServerFn_handler, async ({ data }) => {
	const { loadPlayer } = await import("./fetch-player.server-BlO_SIlL.mjs");
	return loadPlayer(data.tag);
});
//#endregion
export { apiStatus_createServerFn_handler, fetchPlayer_createServerFn_handler };
