import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ cookies }) => {
	const layout = cookies.get("edmi-layout");
	return { layout: layout === "navbar" ? "navbar" : "dashboard" } as const;
};
