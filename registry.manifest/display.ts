import type { Item } from "./types.ts";

export const items: Item[] = [
	{
		name: "card",
		title: "Card",
		description:
			"Flat surface with optional elevation (sunken, raised, floating). Header, title, description, action, content and footer; size default or sm.",
		type: "registry:ui",
		categories: ["Display"],
		registryDependencies: ["elevation"],
		docs: "Replaces the stock card: `shadcn add @edmi-ui/card --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/card.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "inset-panel",
		title: "Inset panel",
		description:
			"Header and footer on a muted shell with a card body plate inset 2px from the shell. Optional bottom fade and elevation.",
		type: "registry:ui",
		categories: ["Display"],
		registryDependencies: ["elevation"],
		docs: "Edmi extra: `shadcn add @edmi-ui/inset-panel`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/inset-panel.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "separator",
		title: "Separator",
		description:
			"A thin line between groups. Horizontal by default, vertical inside rows.",
		type: "registry:ui",
		categories: ["Display"],
		docs: "Replaces the stock separator: `shadcn add @edmi-ui/separator --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/separator.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
	{
		name: "spinner",
		title: "Spinner",
		description:
			"Shows that something is loading. Inherits color and sizes with the surrounding text.",
		type: "registry:ui",
		categories: ["Display"],
		docs: "Replaces the stock spinner: `shadcn add @edmi-ui/spinner --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/spinner.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "skeleton",
		title: "Skeleton",
		description:
			"Placeholder in the shape of content while it loads. Match real sizes to avoid layout shift.",
		type: "registry:ui",
		categories: ["Display"],
		docs: "Replaces the stock skeleton: `shadcn add @edmi-ui/skeleton --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/skeleton.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "progress",
		title: "Progress",
		description:
			"Shows how far a task is. Label and value parts; brand variant.",
		type: "registry:ui",
		categories: ["Display"],
		docs: "Replaces the stock progress: `shadcn add @edmi-ui/progress --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/progress.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
	{
		name: "aspect-ratio",
		title: "Aspect ratio",
		description:
			"Locks content to a ratio so layouts do not jump while loading.",
		type: "registry:ui",
		categories: ["Display"],
		docs: "Replaces the stock aspect-ratio: `shadcn add @edmi-ui/aspect-ratio --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/aspect-ratio.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "avatar",
		title: "Avatar",
		description:
			"Image with an initials fallback. Sizes sm, default, lg; badge, group and count.",
		type: "registry:ui",
		categories: ["Display"],
		docs: "Replaces the stock avatar: `shadcn add @edmi-ui/avatar --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/avatar.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
	{
		name: "item",
		title: "Item",
		description:
			"Flexible row with media, title, description and actions. Variants default, outline, muted; sizes default, sm, xs.",
		type: "registry:ui",
		categories: ["Display"],
		registryDependencies: ["separator"],
		docs: "Replaces the stock item: `shadcn add @edmi-ui/item --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/item.tsx" }],
				dependencies: ["@base-ui/react", "class-variance-authority", "cn"],
			},
		},
	},
	{
		name: "empty",
		title: "Empty",
		description:
			"What to show when there is nothing yet. Icon media, title, description and actions; dashed outline.",
		type: "registry:ui",
		categories: ["Display"],
		registryDependencies: ["elevation"],
		docs: "Replaces the stock empty: `shadcn add @edmi-ui/empty --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/empty.tsx" }],
				dependencies: ["class-variance-authority", "cn"],
			},
		},
	},
	{
		name: "attachment",
		title: "Attachment",
		description:
			"A file or image with metadata, upload state and actions. States idle, uploading, processing, error, done.",
		type: "registry:ui",
		categories: ["Display"],
		registryDependencies: ["button"],
		docs: "Replaces the stock attachment: `shadcn add @edmi-ui/attachment --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/attachment.tsx" }],
				dependencies: ["@base-ui/react", "class-variance-authority", "cn"],
			},
		},
	},
];
