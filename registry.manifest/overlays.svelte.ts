import type { FrameworkEntry } from "./types.ts";

/** `frameworks.svelte` entries for items in ./overlays.ts, keyed by item name (owned by the svelte worker). */
export const entries: Record<string, FrameworkEntry> = {
	popover: {
		files: [
			{ path: "src/lib/registry/ui/popover/popover.svelte" },
			{ path: "src/lib/registry/ui/popover/popover-close.svelte" },
			{ path: "src/lib/registry/ui/popover/popover-content.svelte" },
			{ path: "src/lib/registry/ui/popover/popover-description.svelte" },
			{ path: "src/lib/registry/ui/popover/popover-header.svelte" },
			{ path: "src/lib/registry/ui/popover/popover-portal.svelte" },
			{ path: "src/lib/registry/ui/popover/popover-title.svelte" },
			{ path: "src/lib/registry/ui/popover/popover-trigger.svelte" },
			{ path: "src/lib/registry/ui/popover/index.ts" },
		],
	},
	dialog: {
		files: [
			{ path: "src/lib/registry/ui/dialog/dialog.svelte" },
			{ path: "src/lib/registry/ui/dialog/dialog-close.svelte" },
			{ path: "src/lib/registry/ui/dialog/dialog-content.svelte" },
			{ path: "src/lib/registry/ui/dialog/dialog-description.svelte" },
			{ path: "src/lib/registry/ui/dialog/dialog-footer.svelte" },
			{ path: "src/lib/registry/ui/dialog/dialog-header.svelte" },
			{ path: "src/lib/registry/ui/dialog/dialog-overlay.svelte" },
			{ path: "src/lib/registry/ui/dialog/dialog-portal.svelte" },
			{ path: "src/lib/registry/ui/dialog/dialog-title.svelte" },
			{ path: "src/lib/registry/ui/dialog/dialog-trigger.svelte" },
			{ path: "src/lib/registry/ui/dialog/index.ts" },
		],
	},
	alert: {
		files: [
			{ path: "src/lib/registry/ui/alert/alert-action.svelte" },
			{ path: "src/lib/registry/ui/alert/alert-description.svelte" },
			{ path: "src/lib/registry/ui/alert/alert-title.svelte" },
			{ path: "src/lib/registry/ui/alert/alert.svelte" },
			{ path: "src/lib/registry/ui/alert/index.ts" },
		],
	},
	"alert-dialog": {
		files: [
			{ path: "src/lib/registry/ui/alert-dialog/alert-dialog-action.svelte" },
			{ path: "src/lib/registry/ui/alert-dialog/alert-dialog-cancel.svelte" },
			{ path: "src/lib/registry/ui/alert-dialog/alert-dialog-content.svelte" },
			{
				path: "src/lib/registry/ui/alert-dialog/alert-dialog-description.svelte",
			},
			{ path: "src/lib/registry/ui/alert-dialog/alert-dialog-footer.svelte" },
			{ path: "src/lib/registry/ui/alert-dialog/alert-dialog-header.svelte" },
			{ path: "src/lib/registry/ui/alert-dialog/alert-dialog-media.svelte" },
			{ path: "src/lib/registry/ui/alert-dialog/alert-dialog-overlay.svelte" },
			{ path: "src/lib/registry/ui/alert-dialog/alert-dialog-portal.svelte" },
			{ path: "src/lib/registry/ui/alert-dialog/alert-dialog-title.svelte" },
			{ path: "src/lib/registry/ui/alert-dialog/alert-dialog-trigger.svelte" },
			{ path: "src/lib/registry/ui/alert-dialog/alert-dialog.svelte" },
			{ path: "src/lib/registry/ui/alert-dialog/index.ts" },
		],
	},
	sheet: {
		files: [
			{ path: "src/lib/registry/ui/sheet/sheet-close.svelte" },
			{ path: "src/lib/registry/ui/sheet/sheet-content.svelte" },
			{ path: "src/lib/registry/ui/sheet/sheet-description.svelte" },
			{ path: "src/lib/registry/ui/sheet/sheet-footer.svelte" },
			{ path: "src/lib/registry/ui/sheet/sheet-header.svelte" },
			{ path: "src/lib/registry/ui/sheet/sheet-overlay.svelte" },
			{ path: "src/lib/registry/ui/sheet/sheet-portal.svelte" },
			{ path: "src/lib/registry/ui/sheet/sheet-title.svelte" },
			{ path: "src/lib/registry/ui/sheet/sheet-trigger.svelte" },
			{ path: "src/lib/registry/ui/sheet/sheet.svelte" },
			{ path: "src/lib/registry/ui/sheet/index.ts" },
		],
	},
	drawer: {
		files: [
			{ path: "src/lib/registry/ui/drawer/drawer-close.svelte" },
			{ path: "src/lib/registry/ui/drawer/drawer-content.svelte" },
			{ path: "src/lib/registry/ui/drawer/drawer-description.svelte" },
			{ path: "src/lib/registry/ui/drawer/drawer-footer.svelte" },
			{ path: "src/lib/registry/ui/drawer/drawer-header.svelte" },
			{ path: "src/lib/registry/ui/drawer/drawer-nested.svelte" },
			{ path: "src/lib/registry/ui/drawer/drawer-overlay.svelte" },
			{ path: "src/lib/registry/ui/drawer/drawer-portal.svelte" },
			{ path: "src/lib/registry/ui/drawer/drawer-swipe-handle.svelte" },
			{ path: "src/lib/registry/ui/drawer/drawer-title.svelte" },
			{ path: "src/lib/registry/ui/drawer/drawer-trigger.svelte" },
			{ path: "src/lib/registry/ui/drawer/drawer.svelte" },
			{ path: "src/lib/registry/ui/drawer/index.ts" },
		],
	},
	sonner: {
		files: [
			{ path: "src/lib/registry/ui/sonner/sonner.svelte" },
			{ path: "src/lib/registry/ui/sonner/index.ts" },
		],
	},
	tooltip: {
		files: [
			{ path: "src/lib/registry/ui/tooltip/tooltip-content.svelte" },
			{ path: "src/lib/registry/ui/tooltip/tooltip-portal.svelte" },
			{ path: "src/lib/registry/ui/tooltip/tooltip-provider.svelte" },
			{ path: "src/lib/registry/ui/tooltip/tooltip-trigger.svelte" },
			{ path: "src/lib/registry/ui/tooltip/tooltip.svelte" },
			{ path: "src/lib/registry/ui/tooltip/index.ts" },
		],
	},
	"hover-card": {
		files: [
			{ path: "src/lib/registry/ui/hover-card/hover-card-content.svelte" },
			{ path: "src/lib/registry/ui/hover-card/hover-card-portal.svelte" },
			{ path: "src/lib/registry/ui/hover-card/hover-card-trigger.svelte" },
			{ path: "src/lib/registry/ui/hover-card/hover-card.svelte" },
			{ path: "src/lib/registry/ui/hover-card/index.ts" },
		],
	},
};
