import type { FrameworkEntry } from "./types.ts";

/** `frameworks.vue` entries for items in ./patterns.ts, keyed by item name (owned by the vue worker). */
export const entries: Record<string, FrameworkEntry> = {
	"site-header": {
		files: [
			{ path: "registry/ui/site-header/SiteHeader.vue" },
			{ path: "registry/ui/site-header/SiteHeaderBrand.vue" },
			{ path: "registry/ui/site-header/SiteHeaderMark.vue" },
			{ path: "registry/ui/site-header/index.ts" },
		],
		dependencies: [],
	},
	"app-header": {
		files: [
			{ path: "registry/ui/app-header/AppHeader.vue" },
			{ path: "registry/ui/app-header/AppHeaderNavItem.vue" },
			{ path: "registry/ui/app-header/index.ts" },
		],
		dependencies: [],
	},
	"stat-tile": {
		files: [
			{ path: "registry/ui/stat-tile/StatMeter.vue" },
			{ path: "registry/ui/stat-tile/StatStrip.vue" },
			{ path: "registry/ui/stat-tile/StatStripItem.vue" },
			{ path: "registry/ui/stat-tile/StatTile.vue" },
			{ path: "registry/ui/stat-tile/index.ts" },
		],
		dependencies: [],
	},
	"ticker-strip": {
		files: [
			{ path: "registry/ui/ticker-strip/TickerStrip.vue" },
			{ path: "registry/ui/ticker-strip/index.ts" },
		],
		dependencies: [],
	},
	"index-row": {
		files: [
			{ path: "registry/ui/index-row/IndexRow.vue" },
			{ path: "registry/ui/index-row/IndexRowHeader.vue" },
			{ path: "registry/ui/index-row/Sparkline.vue" },
			{ path: "registry/ui/index-row/index.ts" },
		],
		dependencies: [],
	},
	"watchlist-item": {
		files: [
			{ path: "registry/ui/watchlist-item/WatchlistItem.vue" },
			{ path: "registry/ui/watchlist-item/index.ts" },
		],
		dependencies: [],
	},
	"allocation-bar": {
		files: [
			{ path: "registry/ui/allocation-bar/AllocationBar.vue" },
			{ path: "registry/ui/allocation-bar/index.ts" },
		],
		dependencies: [],
	},
	"join-panel": {
		files: [
			{ path: "registry/ui/join-panel/JoinPanel.vue" },
			{ path: "registry/ui/join-panel/index.ts" },
		],
		dependencies: [],
	},
	"leaderboard-podium": {
		files: [
			{ path: "registry/ui/leaderboard-podium/LeaderboardPodium.vue" },
			{ path: "registry/ui/leaderboard-podium/index.ts" },
		],
		dependencies: [],
	},
	"layout-picker": {
		files: [
			{ path: "registry/ui/layout-picker/LayoutPicker.vue" },
			{ path: "registry/ui/layout-picker/LayoutPickerToast.vue" },
			{ path: "registry/ui/layout-picker/LayoutPickerWireframe.vue" },
			{ path: "registry/ui/layout-picker/layout.ts" },
			{ path: "registry/ui/layout-picker/index.ts" },
		],
		dependencies: [],
	},
};
