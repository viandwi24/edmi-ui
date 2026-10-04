import type { FrameworkEntry } from "./types.ts";

/** `frameworks.svelte` entries for items in ./display.ts, keyed by item name (owned by the svelte worker). */
export const entries: Record<string, FrameworkEntry> = {
	card: {
		files: [
			{ path: "src/lib/registry/ui/card/card.svelte" },
			{ path: "src/lib/registry/ui/card/card-header.svelte" },
			{ path: "src/lib/registry/ui/card/card-title.svelte" },
			{ path: "src/lib/registry/ui/card/card-description.svelte" },
			{ path: "src/lib/registry/ui/card/card-action.svelte" },
			{ path: "src/lib/registry/ui/card/card-content.svelte" },
			{ path: "src/lib/registry/ui/card/card-footer.svelte" },
			{ path: "src/lib/registry/ui/card/index.ts" },
		],
	},
	"inset-panel": {
		files: [
			{ path: "src/lib/registry/ui/inset-panel/inset-panel.svelte" },
			{ path: "src/lib/registry/ui/inset-panel/inset-panel-header.svelte" },
			{ path: "src/lib/registry/ui/inset-panel/inset-panel-body.svelte" },
			{ path: "src/lib/registry/ui/inset-panel/inset-panel-footer.svelte" },
			{ path: "src/lib/registry/ui/inset-panel/context.ts" },
			{ path: "src/lib/registry/ui/inset-panel/index.ts" },
		],
	},
	separator: {
		files: [
			{ path: "src/lib/registry/ui/separator/separator.svelte" },
			{ path: "src/lib/registry/ui/separator/index.ts" },
		],
	},
	spinner: {
		files: [
			{ path: "src/lib/registry/ui/spinner/spinner.svelte" },
			{ path: "src/lib/registry/ui/spinner/index.ts" },
		],
	},
	skeleton: {
		files: [
			{ path: "src/lib/registry/ui/skeleton/skeleton.svelte" },
			{ path: "src/lib/registry/ui/skeleton/index.ts" },
		],
	},
	progress: {
		files: [
			{ path: "src/lib/registry/ui/progress/context.ts" },
			{ path: "src/lib/registry/ui/progress/progress-label.svelte" },
			{ path: "src/lib/registry/ui/progress/progress-value.svelte" },
			{ path: "src/lib/registry/ui/progress/progress.svelte" },
			{ path: "src/lib/registry/ui/progress/index.ts" },
		],
	},
	"aspect-ratio": {
		files: [
			{ path: "src/lib/registry/ui/aspect-ratio/aspect-ratio.svelte" },
			{ path: "src/lib/registry/ui/aspect-ratio/index.ts" },
		],
	},
	avatar: {
		files: [
			{ path: "src/lib/registry/ui/avatar/avatar-badge.svelte" },
			{ path: "src/lib/registry/ui/avatar/avatar-fallback.svelte" },
			{ path: "src/lib/registry/ui/avatar/avatar-group-count.svelte" },
			{ path: "src/lib/registry/ui/avatar/avatar-group.svelte" },
			{ path: "src/lib/registry/ui/avatar/avatar-image.svelte" },
			{ path: "src/lib/registry/ui/avatar/avatar.svelte" },
			{ path: "src/lib/registry/ui/avatar/index.ts" },
		],
	},
	item: {
		files: [
			{ path: "src/lib/registry/ui/item/item-actions.svelte" },
			{ path: "src/lib/registry/ui/item/item-content.svelte" },
			{ path: "src/lib/registry/ui/item/item-description.svelte" },
			{ path: "src/lib/registry/ui/item/item-footer.svelte" },
			{ path: "src/lib/registry/ui/item/item-group.svelte" },
			{ path: "src/lib/registry/ui/item/item-header.svelte" },
			{ path: "src/lib/registry/ui/item/item-media.svelte" },
			{ path: "src/lib/registry/ui/item/item-separator.svelte" },
			{ path: "src/lib/registry/ui/item/item-title.svelte" },
			{ path: "src/lib/registry/ui/item/item.svelte" },
			{ path: "src/lib/registry/ui/item/index.ts" },
		],
	},
	empty: {
		files: [
			{ path: "src/lib/registry/ui/empty/empty-content.svelte" },
			{ path: "src/lib/registry/ui/empty/empty-description.svelte" },
			{ path: "src/lib/registry/ui/empty/empty-header.svelte" },
			{ path: "src/lib/registry/ui/empty/empty-media.svelte" },
			{ path: "src/lib/registry/ui/empty/empty-title.svelte" },
			{ path: "src/lib/registry/ui/empty/empty.svelte" },
			{ path: "src/lib/registry/ui/empty/index.ts" },
		],
	},
	attachment: {
		files: [
			{ path: "src/lib/registry/ui/attachment/attachment-action.svelte" },
			{ path: "src/lib/registry/ui/attachment/attachment-actions.svelte" },
			{ path: "src/lib/registry/ui/attachment/attachment-content.svelte" },
			{ path: "src/lib/registry/ui/attachment/attachment-description.svelte" },
			{ path: "src/lib/registry/ui/attachment/attachment-group.svelte" },
			{ path: "src/lib/registry/ui/attachment/attachment-media.svelte" },
			{ path: "src/lib/registry/ui/attachment/attachment-title.svelte" },
			{ path: "src/lib/registry/ui/attachment/attachment-trigger.svelte" },
			{ path: "src/lib/registry/ui/attachment/attachment.svelte" },
			{ path: "src/lib/registry/ui/attachment/index.ts" },
		],
	},
};
