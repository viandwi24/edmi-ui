import type { FrameworkEntry } from "./types.ts";

const dir = "src/lib/registry/ui";

/** `frameworks.svelte` entries for items in ./layout.ts, keyed by item name (owned by the svelte worker). */
export const entries: Record<string, FrameworkEntry> = {
	accordion: {
		files: [
			{ path: `${dir}/accordion/accordion.svelte` },
			{ path: `${dir}/accordion/accordion-content.svelte` },
			{ path: `${dir}/accordion/accordion-item.svelte` },
			{ path: `${dir}/accordion/accordion-trigger.svelte` },
			{ path: `${dir}/accordion/index.ts` },
		],
	},
	collapsible: {
		files: [
			{ path: `${dir}/collapsible/collapsible.svelte` },
			{ path: `${dir}/collapsible/collapsible-content.svelte` },
			{ path: `${dir}/collapsible/collapsible-trigger.svelte` },
			{ path: `${dir}/collapsible/index.ts` },
		],
	},
	resizable: {
		files: [
			{ path: `${dir}/resizable/resizable-handle.svelte` },
			{ path: `${dir}/resizable/resizable-pane-group.svelte` },
			{ path: `${dir}/resizable/index.ts` },
		],
	},
	"scroll-area": {
		files: [
			{ path: `${dir}/scroll-area/scroll-area.svelte` },
			{ path: `${dir}/scroll-area/scroll-area-scrollbar.svelte` },
			{ path: `${dir}/scroll-area/index.ts` },
		],
	},
	carousel: {
		files: [
			{ path: `${dir}/carousel/carousel.svelte` },
			{ path: `${dir}/carousel/carousel-content.svelte` },
			{ path: `${dir}/carousel/carousel-dots.svelte` },
			{ path: `${dir}/carousel/carousel-item.svelte` },
			{ path: `${dir}/carousel/carousel-next.svelte` },
			{ path: `${dir}/carousel/carousel-previous.svelte` },
			{ path: `${dir}/carousel/context.ts` },
			{ path: `${dir}/carousel/index.ts` },
		],
	},
	direction: {
		files: [
			{ path: `${dir}/direction/direction-provider.svelte` },
			{ path: `${dir}/direction/context.ts` },
			{ path: `${dir}/direction/index.ts` },
		],
	},
};
