import type { FrameworkEntry } from "./types.ts";

/** `frameworks.vue` entries for items in ./layout.ts, keyed by item name (owned by the vue worker). */
export const entries: Record<string, FrameworkEntry> = {
	accordion: {
		files: [
			{ path: "registry/ui/accordion/Accordion.vue" },
			{ path: "registry/ui/accordion/AccordionContent.vue" },
			{ path: "registry/ui/accordion/AccordionItem.vue" },
			{ path: "registry/ui/accordion/AccordionTrigger.vue" },
			{ path: "registry/ui/accordion/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core", "class-variance-authority"],
	},
	collapsible: {
		files: [
			{ path: "registry/ui/collapsible/Collapsible.vue" },
			{ path: "registry/ui/collapsible/CollapsibleContent.vue" },
			{ path: "registry/ui/collapsible/CollapsibleTrigger.vue" },
			{ path: "registry/ui/collapsible/index.ts" },
		],
		dependencies: ["reka-ui"],
	},
	resizable: {
		files: [
			{ path: "registry/ui/resizable/ResizableHandle.vue" },
			{ path: "registry/ui/resizable/ResizablePanel.vue" },
			{ path: "registry/ui/resizable/ResizablePanelGroup.vue" },
			{ path: "registry/ui/resizable/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core"],
	},
	"scroll-area": {
		files: [
			{ path: "registry/ui/scroll-area/ScrollArea.vue" },
			{ path: "registry/ui/scroll-area/ScrollBar.vue" },
			{ path: "registry/ui/scroll-area/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core"],
	},
	carousel: {
		files: [
			{ path: "registry/ui/carousel/Carousel.vue" },
			{ path: "registry/ui/carousel/CarouselContent.vue" },
			{ path: "registry/ui/carousel/CarouselDots.vue" },
			{ path: "registry/ui/carousel/CarouselItem.vue" },
			{ path: "registry/ui/carousel/CarouselNext.vue" },
			{ path: "registry/ui/carousel/CarouselPrevious.vue" },
			{ path: "registry/ui/carousel/index.ts" },
			{ path: "registry/ui/carousel/interface.ts" },
			{ path: "registry/ui/carousel/useCarousel.ts" },
		],
		dependencies: ["embla-carousel-vue", "@vueuse/core"],
	},
	direction: {
		files: [
			{ path: "registry/ui/direction/DirectionProvider.vue" },
			{ path: "registry/ui/direction/index.ts" },
		],
		dependencies: ["reka-ui"],
	},
	elevation: {
		files: [
			{ path: "registry/ui/elevation/ElevationProvider.vue" },
			{ path: "registry/ui/elevation/context.ts" },
			{ path: "registry/ui/elevation/index.ts" },
		],
		dependencies: ["reka-ui"],
	},
};
