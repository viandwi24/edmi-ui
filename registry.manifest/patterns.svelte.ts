import type { FrameworkEntry } from "./types.ts";

/** `frameworks.svelte` entries for items in ./patterns.ts, keyed by item name (owned by the svelte worker). */
export const entries: Record<string, FrameworkEntry> = {
	"site-header": {
		type: "registry:ui",
		files: [
			{ path: "src/lib/registry/ui/site-header/index.ts" },
			{ path: "src/lib/registry/ui/site-header/site-header-brand.svelte" },
			{ path: "src/lib/registry/ui/site-header/site-header-mark.svelte" },
			{ path: "src/lib/registry/ui/site-header/site-header.svelte" },
		],
	},
	"app-header": {
		type: "registry:ui",
		files: [
			{ path: "src/lib/registry/ui/app-header/app-header-nav-item.svelte" },
			{ path: "src/lib/registry/ui/app-header/app-header.svelte" },
			{ path: "src/lib/registry/ui/app-header/index.ts" },
		],
	},
	"stat-tile": {
		type: "registry:ui",
		files: [
			{ path: "src/lib/registry/ui/stat-tile/index.ts" },
			{ path: "src/lib/registry/ui/stat-tile/stat-meter.svelte" },
			{ path: "src/lib/registry/ui/stat-tile/stat-strip-item.svelte" },
			{ path: "src/lib/registry/ui/stat-tile/stat-strip.svelte" },
			{ path: "src/lib/registry/ui/stat-tile/stat-tile.svelte" },
		],
	},
	"ticker-strip": {
		type: "registry:ui",
		files: [
			{ path: "src/lib/registry/ui/ticker-strip/index.ts" },
			{ path: "src/lib/registry/ui/ticker-strip/ticker-strip.svelte" },
		],
	},
	"index-row": {
		type: "registry:ui",
		files: [
			{ path: "src/lib/registry/ui/index-row/index-row-header.svelte" },
			{ path: "src/lib/registry/ui/index-row/index-row.svelte" },
			{ path: "src/lib/registry/ui/index-row/index.ts" },
			{ path: "src/lib/registry/ui/index-row/sparkline.svelte" },
		],
	},
	"watchlist-item": {
		type: "registry:ui",
		files: [
			{ path: "src/lib/registry/ui/watchlist-item/index.ts" },
			{ path: "src/lib/registry/ui/watchlist-item/watchlist-item.svelte" },
		],
	},
	"allocation-bar": {
		type: "registry:ui",
		files: [
			{ path: "src/lib/registry/ui/allocation-bar/allocation-bar.svelte" },
			{ path: "src/lib/registry/ui/allocation-bar/index.ts" },
		],
	},
	"join-panel": {
		type: "registry:ui",
		files: [
			{ path: "src/lib/registry/ui/join-panel/index.ts" },
			{ path: "src/lib/registry/ui/join-panel/join-panel.svelte" },
		],
	},
	"leaderboard-podium": {
		type: "registry:ui",
		files: [
			{ path: "src/lib/registry/ui/leaderboard-podium/index.ts" },
			{
				path: "src/lib/registry/ui/leaderboard-podium/leaderboard-podium.svelte",
			},
		],
	},
	"layout-picker": {
		type: "registry:ui",
		files: [
			{ path: "src/lib/registry/ui/layout-picker/index.ts" },
			{ path: "src/lib/registry/ui/layout-picker/layout-picker-toast.svelte" },
			{
				path: "src/lib/registry/ui/layout-picker/layout-picker-wireframe.svelte",
			},
			{ path: "src/lib/registry/ui/layout-picker/layout-picker.svelte" },
			{ path: "src/lib/registry/ui/layout-picker/layout.ts" },
		],
	},
};
