import type { ExampleMeta } from "../index";

const ALL = ["react", "vue", "svelte"] as const;

/** Examples owned by the `app-a` worker group. Append entries; keep the order of EXAMPLES.md. */
export const examples: ExampleMeta[] = [
	{
		slug: "layerbeat-create",
		title: "Create a server",
		tag: "App",
		description:
			"Layerbeat Create a BeatVPS: always-dark navy sidebar scoped inside a light app, step tabs, location and image choice cards, a plan table with radio selection, billing segmented control and a raised summary card.",
		board: "Layerbeat Example",
		thumb: "layerbeat-create",
		frameworks: ALL,
		height: 900,
		uses: [
			"Sidebar",
			"Tabs",
			"Field",
			"RadioGroup",
			"Table",
			"Select",
			"ToggleGroup",
			"Switch",
			"Card",
			"Badge",
			"Kbd",
		],
	},
];
