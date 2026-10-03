import type { FrameworkEntry } from "./types.ts";

/** `frameworks.vue` entries for items in ./display.ts, keyed by item name (owned by the vue worker). */
export const entries: Record<string, FrameworkEntry> = {
	card: {
		files: [
			{ path: "registry/ui/card/Card.vue" },
			{ path: "registry/ui/card/CardAction.vue" },
			{ path: "registry/ui/card/CardContent.vue" },
			{ path: "registry/ui/card/CardDescription.vue" },
			{ path: "registry/ui/card/CardFooter.vue" },
			{ path: "registry/ui/card/CardHeader.vue" },
			{ path: "registry/ui/card/CardTitle.vue" },
			{ path: "registry/ui/card/index.ts" },
		],
		dependencies: [],
	},
	"inset-panel": {
		files: [
			{ path: "registry/ui/inset-panel/InsetPanel.vue" },
			{ path: "registry/ui/inset-panel/InsetPanelBody.vue" },
			{ path: "registry/ui/inset-panel/InsetPanelFooter.vue" },
			{ path: "registry/ui/inset-panel/InsetPanelHeader.vue" },
			{ path: "registry/ui/inset-panel/index.ts" },
		],
		dependencies: [],
	},
	separator: {
		files: [
			{ path: "registry/ui/separator/Separator.vue" },
			{ path: "registry/ui/separator/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core"],
	},
	spinner: {
		files: [
			{ path: "registry/ui/spinner/Spinner.vue" },
			{ path: "registry/ui/spinner/index.ts" },
		],
		dependencies: [],
	},
	skeleton: {
		files: [
			{ path: "registry/ui/skeleton/Skeleton.vue" },
			{ path: "registry/ui/skeleton/index.ts" },
		],
		dependencies: [],
	},
	progress: {
		files: [
			{ path: "registry/ui/progress/Progress.vue" },
			{ path: "registry/ui/progress/ProgressLabel.vue" },
			{ path: "registry/ui/progress/ProgressValue.vue" },
			{ path: "registry/ui/progress/context.ts" },
			{ path: "registry/ui/progress/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core"],
	},
	"aspect-ratio": {
		files: [
			{ path: "registry/ui/aspect-ratio/AspectRatio.vue" },
			{ path: "registry/ui/aspect-ratio/index.ts" },
		],
		dependencies: [],
	},
	avatar: {
		files: [
			{ path: "registry/ui/avatar/Avatar.vue" },
			{ path: "registry/ui/avatar/AvatarBadge.vue" },
			{ path: "registry/ui/avatar/AvatarFallback.vue" },
			{ path: "registry/ui/avatar/AvatarGroup.vue" },
			{ path: "registry/ui/avatar/AvatarGroupCount.vue" },
			{ path: "registry/ui/avatar/AvatarImage.vue" },
			{ path: "registry/ui/avatar/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core"],
	},
	item: {
		files: [
			{ path: "registry/ui/item/Item.vue" },
			{ path: "registry/ui/item/ItemActions.vue" },
			{ path: "registry/ui/item/ItemContent.vue" },
			{ path: "registry/ui/item/ItemDescription.vue" },
			{ path: "registry/ui/item/ItemFooter.vue" },
			{ path: "registry/ui/item/ItemGroup.vue" },
			{ path: "registry/ui/item/ItemHeader.vue" },
			{ path: "registry/ui/item/ItemMedia.vue" },
			{ path: "registry/ui/item/ItemSeparator.vue" },
			{ path: "registry/ui/item/ItemTitle.vue" },
			{ path: "registry/ui/item/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core", "class-variance-authority"],
	},
	empty: {
		files: [
			{ path: "registry/ui/empty/Empty.vue" },
			{ path: "registry/ui/empty/EmptyContent.vue" },
			{ path: "registry/ui/empty/EmptyDescription.vue" },
			{ path: "registry/ui/empty/EmptyHeader.vue" },
			{ path: "registry/ui/empty/EmptyMedia.vue" },
			{ path: "registry/ui/empty/EmptyTitle.vue" },
			{ path: "registry/ui/empty/index.ts" },
		],
		dependencies: ["class-variance-authority"],
	},
	attachment: {
		files: [
			{ path: "registry/ui/attachment/Attachment.vue" },
			{ path: "registry/ui/attachment/AttachmentAction.vue" },
			{ path: "registry/ui/attachment/AttachmentActions.vue" },
			{ path: "registry/ui/attachment/AttachmentContent.vue" },
			{ path: "registry/ui/attachment/AttachmentDescription.vue" },
			{ path: "registry/ui/attachment/AttachmentGroup.vue" },
			{ path: "registry/ui/attachment/AttachmentMedia.vue" },
			{ path: "registry/ui/attachment/AttachmentTitle.vue" },
			{ path: "registry/ui/attachment/AttachmentTrigger.vue" },
			{ path: "registry/ui/attachment/index.ts" },
		],
		dependencies: ["reka-ui", "class-variance-authority"],
	},
};
