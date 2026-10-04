import type { Item } from "./types.ts";

export const items: Item[] = [
	{
		name: "popover",
		title: "Popover",
		description:
			"Rich content in a floating panel opened by a button. Optional elevation (raised, floating). PopoverHeader, PopoverTitle, PopoverDescription.",
		type: "registry:ui",
		categories: ["Overlays"],
		registryDependencies: ["elevation"],
		docs: "Replaces the stock popover: `shadcn add @edmi-ui/popover --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/popover.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
	{
		name: "dialog",
		title: "Dialog",
		description:
			"Modal window for a focused task on a --overlay scrim, with optional elevation. showCloseButton on the content.",
		type: "registry:ui",
		categories: ["Overlays"],
		registryDependencies: ["button", "elevation"],
		docs: "Replaces the stock dialog: `shadcn add @edmi-ui/dialog --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/dialog.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
	{
		name: "alert",
		title: "Alert",
		description:
			"Inline message in the page flow. default, destructive plus brand, warning and info soft-fill variants.",
		type: "registry:ui",
		categories: ["Overlays"],
		docs: "Replaces the stock alert: `shadcn add @edmi-ui/alert --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/alert.tsx" }],
				dependencies: ["cn", "class-variance-authority"],
			},
		},
	},
	{
		name: "alert-dialog",
		title: "Alert dialog",
		description:
			"Blocking confirm for destructive or irreversible actions. No close icon; clicking outside does nothing.",
		type: "registry:ui",
		categories: ["Overlays"],
		registryDependencies: ["button", "elevation"],
		docs: "Replaces the stock alert-dialog: `shadcn add @edmi-ui/alert-dialog --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/alert-dialog.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
	{
		name: "sheet",
		title: "Sheet",
		description:
			"Dialog that slides in from an edge (side top, right, bottom, left).",
		type: "registry:ui",
		categories: ["Overlays"],
		registryDependencies: ["button"],
		docs: "Replaces the stock sheet: `shadcn add @edmi-ui/sheet --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/sheet.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
	{
		name: "drawer",
		title: "Drawer",
		description:
			"Base UI drawer: swipeDirection, snapPoints, DrawerSwipeHandle.",
		type: "registry:ui",
		categories: ["Overlays"],
		docs: "Replaces the stock drawer (Base UI based, no vaul): `shadcn add @edmi-ui/drawer --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/drawer.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
	{
		name: "sonner",
		title: "Sonner",
		description:
			"Toast via Sonner: default, success, info, warning, error, loading, promise. Soft fill and tinted border per type.",
		type: "registry:ui",
		categories: ["Overlays"],
		registryDependencies: ["elevation"],
		docs: "Replaces the stock sonner: `shadcn add @edmi-ui/sonner --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/sonner.tsx" }],
				dependencies: ["sonner", "next-themes"],
			},
		},
	},
	{
		name: "tooltip",
		title: "Tooltip",
		description:
			"Short label on hover or focus. Solid primary chip with a small arrow.",
		type: "registry:ui",
		categories: ["Overlays"],
		docs: "Replaces the stock tooltip: `shadcn add @edmi-ui/tooltip --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/tooltip.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
	{
		name: "hover-card",
		title: "Hover card",
		description:
			"Preview of what is behind a link, opened on hover after a short delay.",
		type: "registry:ui",
		categories: ["Overlays"],
		docs: "Replaces the stock hover-card: `shadcn add @edmi-ui/hover-card --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/hover-card.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
];
