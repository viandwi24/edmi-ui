import type { FrameworkEntry } from "./types.ts";

/**
 * `frameworks.vue` entries for items in ./meta.ts, keyed by item name (owned by the vue worker).
 * Merged over the inline `frameworks.vue` keys of meta.ts (theme css/cssVars stay there).
 */
export const entries: Record<string, FrameworkEntry> = {
	edmi: {
		// What `shadcn-vue init` would add: animations + shadcn-vue's custom variants/keyframes.
		dependencies: ["tw-animate-css", "shadcn-vue"],
		css: {
			'@import "tw-animate-css"': {},
			'@import "shadcn-vue/tailwind.css"': {},
		},
	},
};
