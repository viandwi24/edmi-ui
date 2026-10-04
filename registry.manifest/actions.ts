import type { Item } from "./types.ts";

export const items: Item[] = [
	{
		name: "button",
		title: "Button",
		description:
			"Pressable action control, flat by default; the elevation prop adds sunken, raised and floating depth. Variants default, secondary, outline, ghost, destructive, link and brand.",
		type: "registry:ui",
		categories: ["Actions"],
		registryDependencies: ["elevation"],
		docs: "Replaces the stock button: `shadcn add @edmi-ui/button --overwrite`. Style links with `buttonVariants()` on a plain <a>.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/button.tsx" }],
				dependencies: ["@base-ui/react", "class-variance-authority", "cn"],
			},
		},
	},
	{
		name: "badge",
		title: "Badge",
		description:
			"Compact status label. Variants default, secondary, destructive, outline, ghost, link plus brand, warning and info, and pill/number shapes.",
		type: "registry:ui",
		categories: ["Actions"],
		registryDependencies: ["elevation"],
		docs: "Replaces the stock badge: `shadcn add @edmi-ui/badge --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/badge.tsx" }],
				dependencies: ["@base-ui/react", "class-variance-authority", "cn"],
			},
		},
	},
	{
		name: "button-group",
		title: "Button Group",
		description:
			"Joins related buttons, inputs and text into one control with shared borders. Horizontal or vertical, with ButtonGroupSeparator and ButtonGroupText.",
		type: "registry:ui",
		categories: ["Actions"],
		registryDependencies: ["separator", "elevation", "button"],
		docs: "Replaces the stock button-group: `shadcn add @edmi-ui/button-group --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/button-group.tsx" }],
				dependencies: ["@base-ui/react", "class-variance-authority", "cn"],
			},
		},
	},
	{
		name: "toggle",
		title: "Toggle",
		description:
			"Two-state button. The pressed state is an accent fill with an inner shadow. Variants default and outline, sizes sm, default and lg; elevation adds depth.",
		type: "registry:ui",
		categories: ["Actions"],
		registryDependencies: ["elevation"],
		docs: "Replaces the stock toggle: `shadcn add @edmi-ui/toggle --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/toggle.tsx" }],
				dependencies: ["@base-ui/react", "class-variance-authority", "cn"],
			},
		},
	},
	{
		name: "toggle-group",
		title: "Toggle Group",
		description:
			"A set of toggles. Items are spaced 2 by default; spacing 0 joins them. Supports vertical orientation and a flat segmented track variant.",
		type: "registry:ui",
		categories: ["Actions"],
		registryDependencies: ["toggle", "elevation"],
		docs: 'Replaces the stock toggle-group: `shadcn add @edmi-ui/toggle-group --overwrite`. Use `variant="segmented"` for the flat track.',
		frameworks: {
			react: {
				files: [{ path: "registry/ui/toggle-group.tsx" }],
				dependencies: ["@base-ui/react", "class-variance-authority", "cn"],
			},
		},
	},
	{
		name: "kbd",
		title: "Kbd",
		description:
			"Keyboard key cap with a KbdGroup for combinations; elevation raises the key. Adapts inside tooltips.",
		type: "registry:ui",
		categories: ["Actions"],
		registryDependencies: ["elevation"],
		docs: "Replaces the stock kbd: `shadcn add @edmi-ui/kbd --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/kbd.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
];
