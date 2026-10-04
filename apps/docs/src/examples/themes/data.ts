// Sample data for the theme playground. Plain TS, no framework imports.

export type ControlKey = "base" | "theme" | "mode" | "radius" | "elevation";

export type Option = { value: string; label: string };
export type Control = {
	key: ControlKey;
	label: string;
	hint: string;
	options: Option[];
};

export type State = Record<ControlKey, string>;

export const defaults: State = {
	base: "stone",
	theme: "green",
	mode: "light",
	radius: "0.625",
	elevation: "flat",
};

export const controls: Control[] = [
	{
		key: "base",
		label: "Base color",
		hint: "data-base",
		options: [
			{ value: "stone", label: "Stone" },
			{ value: "slate", label: "Slate" },
		],
	},
	{
		key: "theme",
		label: "Theme",
		hint: "data-theme",
		options: [
			{ value: "green", label: "Green" },
			{ value: "ocean", label: "Ocean" },
		],
	},
	{
		key: "mode",
		label: "Mode",
		hint: 'class="dark"',
		options: [
			{ value: "light", label: "Light" },
			{ value: "dark", label: "Dark" },
		],
	},
	{
		key: "radius",
		label: "Radius",
		hint: "--radius",
		options: ["0.3", "0.5", "0.625", "0.75", "1"].map((v) => ({
			value: v,
			label: v,
		})),
	},
	{
		key: "elevation",
		label: "Depth",
		hint: "elevation",
		options: [
			{ value: "flat", label: "Flat" },
			{ value: "layered", label: "Layered ✦" },
		],
	},
];

export const intro = {
	title: "Theme playground",
	body: "Four independent knobs, all plain CSS variables. Base color sets the neutrals, theme sets the accent, mode is light or dark and radius scales every corner. Pick a combination and the live preview below re-themes without a reload.",
};

export const preview = {
	name: "Index",
	tabs: [
		{ value: "nav", label: "NAV" },
		{ value: "holders", label: "Holders" },
	],
	aumLabel: "AUM",
	aum: "$49,182",
	delta: "+2.4%",
	join: "Join",
	details: "Details",
	keeper: "Keeper on",
	variants: [
		"default",
		"secondary",
		"outline",
		"destructive",
		"brand",
	] as const,
	badges: ["secondary", "brand", "success", "destructive"] as const,
	mandate: "Accept mandate",
	placeholder: "Search indexes",
};

export const snippetTitle = "What the preview sets";

export function snippet(s: State): string {
	return [
		"<html",
		`  ${s.mode === "dark" ? 'class="dark"\n  ' : ""}data-base="${s.base}"`,
		`  data-theme="${s.theme}"`,
		`  style="--radius: ${s.radius}rem">`,
	].join("\n");
}
