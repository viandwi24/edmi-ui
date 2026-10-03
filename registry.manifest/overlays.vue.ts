import type { FrameworkEntry } from "./types.ts";

/** `frameworks.vue` entries for items in ./overlays.ts, keyed by item name (owned by the vue worker). */
export const entries: Record<string, FrameworkEntry> = {
	popover: {
		files: [
			{ path: "registry/ui/popover/Popover.vue" },
			{ path: "registry/ui/popover/PopoverAnchor.vue" },
			{ path: "registry/ui/popover/PopoverContent.vue" },
			{ path: "registry/ui/popover/PopoverDescription.vue" },
			{ path: "registry/ui/popover/PopoverHeader.vue" },
			{ path: "registry/ui/popover/PopoverTitle.vue" },
			{ path: "registry/ui/popover/PopoverTrigger.vue" },
			{ path: "registry/ui/popover/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core"],
	},
	dialog: {
		files: [
			{ path: "registry/ui/dialog/Dialog.vue" },
			{ path: "registry/ui/dialog/DialogClose.vue" },
			{ path: "registry/ui/dialog/DialogContent.vue" },
			{ path: "registry/ui/dialog/DialogDescription.vue" },
			{ path: "registry/ui/dialog/DialogFooter.vue" },
			{ path: "registry/ui/dialog/DialogHeader.vue" },
			{ path: "registry/ui/dialog/DialogOverlay.vue" },
			{ path: "registry/ui/dialog/DialogTitle.vue" },
			{ path: "registry/ui/dialog/DialogTrigger.vue" },
			{ path: "registry/ui/dialog/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core"],
	},
	alert: {
		files: [
			{ path: "registry/ui/alert/Alert.vue" },
			{ path: "registry/ui/alert/AlertAction.vue" },
			{ path: "registry/ui/alert/AlertDescription.vue" },
			{ path: "registry/ui/alert/AlertTitle.vue" },
			{ path: "registry/ui/alert/index.ts" },
		],
		dependencies: ["class-variance-authority"],
	},
	"alert-dialog": {
		files: [
			{ path: "registry/ui/alert-dialog/AlertDialog.vue" },
			{ path: "registry/ui/alert-dialog/AlertDialogAction.vue" },
			{ path: "registry/ui/alert-dialog/AlertDialogCancel.vue" },
			{ path: "registry/ui/alert-dialog/AlertDialogContent.vue" },
			{ path: "registry/ui/alert-dialog/AlertDialogDescription.vue" },
			{ path: "registry/ui/alert-dialog/AlertDialogFooter.vue" },
			{ path: "registry/ui/alert-dialog/AlertDialogHeader.vue" },
			{ path: "registry/ui/alert-dialog/AlertDialogMedia.vue" },
			{ path: "registry/ui/alert-dialog/AlertDialogTitle.vue" },
			{ path: "registry/ui/alert-dialog/AlertDialogTrigger.vue" },
			{ path: "registry/ui/alert-dialog/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core"],
	},
	sheet: {
		files: [
			{ path: "registry/ui/sheet/Sheet.vue" },
			{ path: "registry/ui/sheet/SheetClose.vue" },
			{ path: "registry/ui/sheet/SheetContent.vue" },
			{ path: "registry/ui/sheet/SheetDescription.vue" },
			{ path: "registry/ui/sheet/SheetFooter.vue" },
			{ path: "registry/ui/sheet/SheetHeader.vue" },
			{ path: "registry/ui/sheet/SheetOverlay.vue" },
			{ path: "registry/ui/sheet/SheetTitle.vue" },
			{ path: "registry/ui/sheet/SheetTrigger.vue" },
			{ path: "registry/ui/sheet/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core"],
	},
	drawer: {
		files: [
			{ path: "registry/ui/drawer/Drawer.vue" },
			{ path: "registry/ui/drawer/DrawerClose.vue" },
			{ path: "registry/ui/drawer/DrawerContent.vue" },
			{ path: "registry/ui/drawer/DrawerDescription.vue" },
			{ path: "registry/ui/drawer/DrawerFooter.vue" },
			{ path: "registry/ui/drawer/DrawerHeader.vue" },
			{ path: "registry/ui/drawer/DrawerOverlay.vue" },
			{ path: "registry/ui/drawer/DrawerSwipeHandle.vue" },
			{ path: "registry/ui/drawer/DrawerTitle.vue" },
			{ path: "registry/ui/drawer/DrawerTrigger.vue" },
			{ path: "registry/ui/drawer/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core"],
	},
	sonner: {
		files: [
			{ path: "registry/ui/sonner/Sonner.vue" },
			{ path: "registry/ui/sonner/index.ts" },
		],
		dependencies: ["vue-sonner"],
	},
	tooltip: {
		files: [
			{ path: "registry/ui/tooltip/Tooltip.vue" },
			{ path: "registry/ui/tooltip/TooltipContent.vue" },
			{ path: "registry/ui/tooltip/TooltipProvider.vue" },
			{ path: "registry/ui/tooltip/TooltipTrigger.vue" },
			{ path: "registry/ui/tooltip/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core"],
	},
	"hover-card": {
		files: [
			{ path: "registry/ui/hover-card/HoverCard.vue" },
			{ path: "registry/ui/hover-card/HoverCardContent.vue" },
			{ path: "registry/ui/hover-card/HoverCardTrigger.vue" },
			{ path: "registry/ui/hover-card/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core"],
	},
};
