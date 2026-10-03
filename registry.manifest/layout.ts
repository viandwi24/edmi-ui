import type { Item } from "./types.ts";

const base = ["@base-ui/react", "cn"];

export const items: Item[] = [
	{
		name: "accordion",
		title: "Accordion",
		description:
			"Stacked headings that each open a section; one at a time by default, `multiple` for many.",
		type: "registry:ui",
		categories: ["Layout"],
		registryDependencies: [],
		docs: "Replaces the stock accordion: `shadcn add @edmi-ui/accordion --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/accordion.tsx" }],
				dependencies: [...base, "class-variance-authority"],
			},
		},
	},
	{
		name: "collapsible",
		title: "Collapsible",
		description: "A single panel that expands and collapses.",
		type: "registry:ui",
		categories: ["Layout"],
		registryDependencies: [],
		docs: "Replaces the stock collapsible: `shadcn add @edmi-ui/collapsible --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/collapsible.tsx" }],
				dependencies: ["@base-ui/react"],
			},
		},
	},
	{
		name: "resizable",
		title: "Resizable",
		description: "Panels the user can resize by dragging a handle.",
		type: "registry:ui",
		categories: ["Layout"],
		registryDependencies: [],
		docs: "Replaces the stock resizable: `shadcn add @edmi-ui/resizable --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/resizable.tsx" }],
				dependencies: ["cn", "react-resizable-panels"],
			},
		},
	},
	{
		name: "scroll-area",
		title: "Scroll Area",
		description: "Custom thin scrollbars over native scrolling.",
		type: "registry:ui",
		categories: ["Layout"],
		registryDependencies: [],
		docs: "Replaces the stock scroll-area: `shadcn add @edmi-ui/scroll-area --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/scroll-area.tsx" }],
				dependencies: base,
			},
		},
	},
	{
		name: "carousel",
		title: "Carousel",
		description:
			"Swipeable slides built on Embla, with arrows and position dots.",
		type: "registry:ui",
		categories: ["Layout"],
		registryDependencies: ["button"],
		docs: "Replaces the stock carousel: `shadcn add @edmi-ui/carousel --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/carousel.tsx" }],
				dependencies: ["cn", "embla-carousel-react"],
			},
		},
	},
	{
		name: "direction",
		title: "Direction",
		description: "DirectionProvider and useDirection for LTR / RTL layouts.",
		type: "registry:ui",
		categories: ["Layout"],
		registryDependencies: [],
		docs: "Replaces the stock direction: `shadcn add @edmi-ui/direction --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/direction.tsx" }],
				dependencies: ["@base-ui/react"],
			},
		},
	},
];
