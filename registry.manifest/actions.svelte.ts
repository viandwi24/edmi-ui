import type { FrameworkEntry } from "./types.ts";

/** `frameworks.svelte` entries for items in ./actions.ts, keyed by item name (owned by the svelte worker). */
export const entries: Record<string, FrameworkEntry> = {
	button: {
		files: [
			{ path: "src/lib/registry/ui/button/button.svelte" },
			{ path: "src/lib/registry/ui/button/index.ts" },
		],
	},
	badge: {
		files: [
			{ path: "src/lib/registry/ui/badge/badge.svelte" },
			{ path: "src/lib/registry/ui/badge/index.ts" },
		],
	},
	"button-group": {
		files: [
			{ path: "src/lib/registry/ui/button-group/button-group.svelte" },
			{
				path: "src/lib/registry/ui/button-group/button-group-separator.svelte",
			},
			{ path: "src/lib/registry/ui/button-group/button-group-text.svelte" },
			{ path: "src/lib/registry/ui/button-group/index.ts" },
		],
	},
	toggle: {
		files: [
			{ path: "src/lib/registry/ui/toggle/toggle.svelte" },
			{ path: "src/lib/registry/ui/toggle/index.ts" },
		],
	},
	"toggle-group": {
		files: [
			{ path: "src/lib/registry/ui/toggle-group/toggle-group.svelte" },
			{ path: "src/lib/registry/ui/toggle-group/toggle-group-item.svelte" },
			{ path: "src/lib/registry/ui/toggle-group/index.ts" },
		],
	},
	kbd: {
		files: [
			{ path: "src/lib/registry/ui/kbd/kbd.svelte" },
			{ path: "src/lib/registry/ui/kbd/kbd-group.svelte" },
			{ path: "src/lib/registry/ui/kbd/index.ts" },
		],
	},
};
