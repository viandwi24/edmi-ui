import type { Item } from "./types.ts";

export const items: Item[] = [
	{
		name: "site-header",
		title: "Site Header",
		description:
			"Marketing top bar for the navbar layout: brand, stepped lead-in list, links and one call to action.",
		type: "registry:block",
		categories: ["Patterns"],
		registryDependencies: [],
		docs: "Edmi pattern block: `shadcn add @edmi/site-header`.",
		frameworks: {
			react: {
				files: [{ path: "registry/blocks/site-header/site-header.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "app-header",
		title: "App Header",
		description:
			"App top bar for the navbar layout: brand, raised nav pills, search, network button and wallet connect.",
		type: "registry:block",
		categories: ["Patterns"],
		registryDependencies: ["button", "input-group", "kbd"],
		docs: "Edmi pattern block: `shadcn add @edmi/app-header`.",
		frameworks: {
			react: {
				files: [{ path: "registry/blocks/app-header/app-header.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "stat-tile",
		title: "Stat Tile",
		description:
			"KPI tile with a mono value and delta badge, an optional segmented meter, and a stat strip for grouped numbers.",
		type: "registry:block",
		categories: ["Patterns"],
		registryDependencies: ["card", "badge"],
		docs: "Edmi pattern block: `shadcn add @edmi/stat-tile`.",
		frameworks: {
			react: {
				files: [{ path: "registry/blocks/stat-tile/stat-tile.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "ticker-strip",
		title: "Ticker Strip",
		description:
			"Horizontal strip of price cells: avatar and symbol, mono price, up/down change.",
		type: "registry:block",
		categories: ["Patterns"],
		registryDependencies: ["card", "avatar"],
		docs: "Edmi pattern block: `shadcn add @edmi/ticker-strip`.",
		frameworks: {
			react: {
				files: [{ path: "registry/blocks/ticker-strip/ticker-strip.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "index-row",
		title: "Index Row",
		description:
			"Market table row: avatar stack, name, ticker and tags, mono price, delta and sparkline; includes a matching header row.",
		type: "registry:block",
		categories: ["Patterns"],
		registryDependencies: ["table", "avatar", "badge"],
		docs: "Edmi pattern block: `shadcn add @edmi/index-row`.",
		frameworks: {
			react: {
				files: [{ path: "registry/blocks/index-row/index-row.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "watchlist-item",
		title: "Watchlist Item",
		description:
			"Compact sidebar row with a colored letter tile, symbol, mono price and change.",
		type: "registry:block",
		categories: ["Patterns"],
		registryDependencies: [],
		docs: "Edmi pattern block: `shadcn add @edmi/watchlist-item`.",
		frameworks: {
			react: {
				files: [{ path: "registry/blocks/watchlist-item/watchlist-item.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "allocation-bar",
		title: "Allocation Bar",
		description:
			"Proportional weights bar with a legend of labels and mono percentages.",
		type: "registry:block",
		categories: ["Patterns"],
		registryDependencies: [],
		docs: "Edmi pattern block: `shadcn add @edmi/allocation-bar`.",
		frameworks: {
			react: {
				files: [{ path: "registry/blocks/allocation-bar/allocation-bar.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "join-panel",
		title: "Join Panel",
		description:
			"Amount input with Max and currency, summary rows and a primary join action.",
		type: "registry:block",
		categories: ["Patterns"],
		registryDependencies: ["card", "button", "input-group"],
		docs: "Edmi pattern block: `shadcn add @edmi/join-panel`.",
		frameworks: {
			react: {
				files: [{ path: "registry/blocks/join-panel/join-panel.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "leaderboard-podium",
		title: "Leaderboard Podium",
		description:
			"Top-three podium cards with rank badges and avatars; first place stands taller in the middle.",
		type: "registry:block",
		categories: ["Patterns"],
		registryDependencies: ["card", "avatar", "badge"],
		docs: "Edmi pattern block: `shadcn add @edmi/leaderboard-podium`.",
		frameworks: {
			react: {
				files: [
					{ path: "registry/blocks/leaderboard-podium/leaderboard-podium.tsx" },
				],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "layout-picker",
		title: "Layout Picker",
		description:
			"Dashboard or navbar choice cards, plus a first-visit corner toast that saves the choice in a cookie.",
		type: "registry:block",
		categories: ["Patterns"],
		registryDependencies: ["button"],
		docs: "Edmi pattern block: `shadcn add @edmi/layout-picker`.",
		frameworks: {
			react: {
				files: [{ path: "registry/blocks/layout-picker/layout-picker.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
];
