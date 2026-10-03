import type { FrameworkEntry } from "./types.ts";

/** `frameworks.vue` entries for items in ./actions.ts, keyed by item name (owned by the vue worker). */
export const entries: Record<string, FrameworkEntry> = {
	button: {
		files: [
			{ path: "registry/ui/button/Button.vue" },
			{ path: "registry/ui/button/index.ts" },
		],
		dependencies: ["reka-ui", "class-variance-authority"],
	},
	badge: {
		files: [
			{ path: "registry/ui/badge/Badge.vue" },
			{ path: "registry/ui/badge/index.ts" },
		],
		dependencies: ["reka-ui", "class-variance-authority", "@vueuse/core"],
	},
	"button-group": {
		files: [
			{ path: "registry/ui/button-group/ButtonGroup.vue" },
			{ path: "registry/ui/button-group/ButtonGroupSeparator.vue" },
			{ path: "registry/ui/button-group/ButtonGroupText.vue" },
			{ path: "registry/ui/button-group/index.ts" },
		],
		dependencies: ["reka-ui", "class-variance-authority", "@vueuse/core"],
	},
	toggle: {
		files: [
			{ path: "registry/ui/toggle/Toggle.vue" },
			{ path: "registry/ui/toggle/index.ts" },
		],
		dependencies: ["reka-ui", "class-variance-authority", "@vueuse/core"],
	},
	"toggle-group": {
		files: [
			{ path: "registry/ui/toggle-group/ToggleGroup.vue" },
			{ path: "registry/ui/toggle-group/ToggleGroupItem.vue" },
			{ path: "registry/ui/toggle-group/index.ts" },
		],
		dependencies: ["reka-ui", "class-variance-authority", "@vueuse/core"],
	},
	kbd: {
		files: [
			{ path: "registry/ui/kbd/Kbd.vue" },
			{ path: "registry/ui/kbd/KbdGroup.vue" },
			{ path: "registry/ui/kbd/index.ts" },
		],
	},
};
