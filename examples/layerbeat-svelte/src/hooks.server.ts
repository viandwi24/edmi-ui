import type { Handle } from "@sveltejs/kit/hooks";

// Mode lives in a cookie (DESIGN §3): resolve it here so the first paint is already right.
export const handle: Handle = ({ event, resolve }) => {
	const dark = event.cookies.get("edmi-theme") === "dark";
	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace("%edmi.theme%", dark ? "dark" : ""),
	});
};
