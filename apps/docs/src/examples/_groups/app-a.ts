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
	{
		slug: "explore",
		title: "Explore",
		tag: "App",
		description:
			"Stockbreak Explore: app header, search and Human/AI segmented filter, strategy and sort selects, and the full index table with avatar stacks, tags and sparklines.",
		board: "Stockbreak · Explore",
		thumb: "explore",
		frameworks: ALL,
		height: 900,
		uses: [
			"AppHeader",
			"InputGroup",
			"ToggleGroup",
			"Toggle",
			"Select",
			"IndexRow",
			"Table",
			"Card",
			"Badge",
		],
	},
	{
		slug: "leaderboard",
		title: "Leaderboard",
		tag: "App",
		description:
			"Stockbreak leaderboard: Indexes/Creators tabs, period and Human/AI segmented filters, the top-three podium with allocation bars and the ranked index table.",
		board: "Stockbreak · Leaderboard",
		thumb: "leaderboard",
		frameworks: ALL,
		height: 900,
		uses: [
			"AppHeader",
			"Tabs",
			"ToggleGroup",
			"AllocationBar",
			"Sparkline",
			"IndexRow",
			"Table",
			"Card",
			"Badge",
		],
	},
];
