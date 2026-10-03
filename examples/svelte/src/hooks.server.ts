import type { Handle } from "@sveltejs/kit/hooks";

// Theme + layout live in cookies (DESIGN §3/§6): resolve them here so the first paint is already right.
export const handle: Handle = ({ event, resolve }) => {
	const dark = event.cookies.get("edmi-theme") === "dark";
	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace("%edmi.theme%", dark ? "dark" : ""),
	});
};
