import type { FrameworkEntry } from "./types.ts";

/** `frameworks.svelte` entries for items in ./navigation.ts, keyed by item name (owned by the svelte worker). */
export const entries: Record<string, FrameworkEntry> = {
	tabs: {
		files: [
			{ path: "src/lib/registry/ui/tabs/tabs.svelte" },
			{ path: "src/lib/registry/ui/tabs/tabs-list.svelte" },
			{ path: "src/lib/registry/ui/tabs/tabs-trigger.svelte" },
			{ path: "src/lib/registry/ui/tabs/tabs-content.svelte" },
			{ path: "src/lib/registry/ui/tabs/index.ts" },
		],
	},
	breadcrumb: {
		files: [
			{ path: "src/lib/registry/ui/breadcrumb/breadcrumb-ellipsis.svelte" },
			{ path: "src/lib/registry/ui/breadcrumb/breadcrumb-item.svelte" },
			{ path: "src/lib/registry/ui/breadcrumb/breadcrumb-link.svelte" },
			{ path: "src/lib/registry/ui/breadcrumb/breadcrumb-list.svelte" },
			{ path: "src/lib/registry/ui/breadcrumb/breadcrumb-page.svelte" },
			{ path: "src/lib/registry/ui/breadcrumb/breadcrumb-separator.svelte" },
			{ path: "src/lib/registry/ui/breadcrumb/breadcrumb.svelte" },
			{ path: "src/lib/registry/ui/breadcrumb/index.ts" },
		],
	},
	pagination: {
		files: [
			{ path: "src/lib/registry/ui/pagination/pagination-content.svelte" },
			{ path: "src/lib/registry/ui/pagination/pagination-ellipsis.svelte" },
			{ path: "src/lib/registry/ui/pagination/pagination-item.svelte" },
			{ path: "src/lib/registry/ui/pagination/pagination-link.svelte" },
			{ path: "src/lib/registry/ui/pagination/pagination-next-button.svelte" },
			{ path: "src/lib/registry/ui/pagination/pagination-next.svelte" },
			{ path: "src/lib/registry/ui/pagination/pagination-prev-button.svelte" },
			{ path: "src/lib/registry/ui/pagination/pagination-previous.svelte" },
			{ path: "src/lib/registry/ui/pagination/pagination.svelte" },
			{ path: "src/lib/registry/ui/pagination/index.ts" },
		],
	},
	"dropdown-menu": {
		files: [
			{
				path: "src/lib/registry/ui/dropdown-menu/dropdown-menu-checkbox-group.svelte",
			},
			{
				path: "src/lib/registry/ui/dropdown-menu/dropdown-menu-checkbox-item.svelte",
			},
			{
				path: "src/lib/registry/ui/dropdown-menu/dropdown-menu-content.svelte",
			},
			{
				path: "src/lib/registry/ui/dropdown-menu/dropdown-menu-group-heading.svelte",
			},
			{ path: "src/lib/registry/ui/dropdown-menu/dropdown-menu-group.svelte" },
			{ path: "src/lib/registry/ui/dropdown-menu/dropdown-menu-item.svelte" },
			{ path: "src/lib/registry/ui/dropdown-menu/dropdown-menu-label.svelte" },
			{ path: "src/lib/registry/ui/dropdown-menu/dropdown-menu-portal.svelte" },
			{
				path: "src/lib/registry/ui/dropdown-menu/dropdown-menu-radio-group.svelte",
			},
			{
				path: "src/lib/registry/ui/dropdown-menu/dropdown-menu-radio-item.svelte",
			},
			{
				path: "src/lib/registry/ui/dropdown-menu/dropdown-menu-separator.svelte",
			},
			{
				path: "src/lib/registry/ui/dropdown-menu/dropdown-menu-shortcut.svelte",
			},
			{
				path: "src/lib/registry/ui/dropdown-menu/dropdown-menu-sub-content.svelte",
			},
			{
				path: "src/lib/registry/ui/dropdown-menu/dropdown-menu-sub-trigger.svelte",
			},
			{ path: "src/lib/registry/ui/dropdown-menu/dropdown-menu-sub.svelte" },
			{
				path: "src/lib/registry/ui/dropdown-menu/dropdown-menu-trigger.svelte",
			},
			{ path: "src/lib/registry/ui/dropdown-menu/dropdown-menu.svelte" },
			{ path: "src/lib/registry/ui/dropdown-menu/index.ts" },
		],
	},
	"context-menu": {
		files: [
			{
				path: "src/lib/registry/ui/context-menu/context-menu-checkbox-item.svelte",
			},
			{ path: "src/lib/registry/ui/context-menu/context-menu-content.svelte" },
			{
				path: "src/lib/registry/ui/context-menu/context-menu-group-heading.svelte",
			},
			{ path: "src/lib/registry/ui/context-menu/context-menu-group.svelte" },
			{ path: "src/lib/registry/ui/context-menu/context-menu-item.svelte" },
			{ path: "src/lib/registry/ui/context-menu/context-menu-label.svelte" },
			{ path: "src/lib/registry/ui/context-menu/context-menu-portal.svelte" },
			{
				path: "src/lib/registry/ui/context-menu/context-menu-radio-group.svelte",
			},
			{
				path: "src/lib/registry/ui/context-menu/context-menu-radio-item.svelte",
			},
			{
				path: "src/lib/registry/ui/context-menu/context-menu-separator.svelte",
			},
			{ path: "src/lib/registry/ui/context-menu/context-menu-shortcut.svelte" },
			{
				path: "src/lib/registry/ui/context-menu/context-menu-sub-content.svelte",
			},
			{
				path: "src/lib/registry/ui/context-menu/context-menu-sub-trigger.svelte",
			},
			{ path: "src/lib/registry/ui/context-menu/context-menu-sub.svelte" },
			{ path: "src/lib/registry/ui/context-menu/context-menu-trigger.svelte" },
			{ path: "src/lib/registry/ui/context-menu/context-menu.svelte" },
			{ path: "src/lib/registry/ui/context-menu/index.ts" },
		],
	},
	menubar: {
		files: [
			{ path: "src/lib/registry/ui/menubar/menubar-checkbox-item.svelte" },
			{ path: "src/lib/registry/ui/menubar/menubar-content.svelte" },
			{ path: "src/lib/registry/ui/menubar/menubar-group-heading.svelte" },
			{ path: "src/lib/registry/ui/menubar/menubar-group.svelte" },
			{ path: "src/lib/registry/ui/menubar/menubar-item.svelte" },
			{ path: "src/lib/registry/ui/menubar/menubar-label.svelte" },
			{ path: "src/lib/registry/ui/menubar/menubar-menu.svelte" },
			{ path: "src/lib/registry/ui/menubar/menubar-portal.svelte" },
			{ path: "src/lib/registry/ui/menubar/menubar-radio-group.svelte" },
			{ path: "src/lib/registry/ui/menubar/menubar-radio-item.svelte" },
			{ path: "src/lib/registry/ui/menubar/menubar-separator.svelte" },
			{ path: "src/lib/registry/ui/menubar/menubar-shortcut.svelte" },
			{ path: "src/lib/registry/ui/menubar/menubar-sub-content.svelte" },
			{ path: "src/lib/registry/ui/menubar/menubar-sub-trigger.svelte" },
			{ path: "src/lib/registry/ui/menubar/menubar-sub.svelte" },
			{ path: "src/lib/registry/ui/menubar/menubar-trigger.svelte" },
			{ path: "src/lib/registry/ui/menubar/menubar.svelte" },
			{ path: "src/lib/registry/ui/menubar/index.ts" },
		],
		registryDependencies: [],
	},
	"navigation-menu": {
		files: [
			{
				path: "src/lib/registry/ui/navigation-menu/navigation-menu-content.svelte",
			},
			{
				path: "src/lib/registry/ui/navigation-menu/navigation-menu-indicator.svelte",
			},
			{
				path: "src/lib/registry/ui/navigation-menu/navigation-menu-item.svelte",
			},
			{
				path: "src/lib/registry/ui/navigation-menu/navigation-menu-link.svelte",
			},
			{
				path: "src/lib/registry/ui/navigation-menu/navigation-menu-list.svelte",
			},
			{
				path: "src/lib/registry/ui/navigation-menu/navigation-menu-trigger.svelte",
			},
			{
				path: "src/lib/registry/ui/navigation-menu/navigation-menu-viewport.svelte",
			},
			{ path: "src/lib/registry/ui/navigation-menu/navigation-menu.svelte" },
			{ path: "src/lib/registry/ui/navigation-menu/index.ts" },
		],
	},
	command: {
		files: [
			{ path: "src/lib/registry/ui/command/command-dialog.svelte" },
			{ path: "src/lib/registry/ui/command/command-empty.svelte" },
			{ path: "src/lib/registry/ui/command/command-group.svelte" },
			{ path: "src/lib/registry/ui/command/command-input.svelte" },
			{ path: "src/lib/registry/ui/command/command-item.svelte" },
			{ path: "src/lib/registry/ui/command/command-link-item.svelte" },
			{ path: "src/lib/registry/ui/command/command-list.svelte" },
			{ path: "src/lib/registry/ui/command/command-loading.svelte" },
			{ path: "src/lib/registry/ui/command/command-separator.svelte" },
			{ path: "src/lib/registry/ui/command/command-shortcut.svelte" },
			{ path: "src/lib/registry/ui/command/command.svelte" },
			{ path: "src/lib/registry/ui/command/index.ts" },
		],
	},
	sidebar: {
		files: [
			{ path: "src/lib/registry/ui/sidebar/constants.ts" },
			{ path: "src/lib/registry/ui/sidebar/context.svelte.ts" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-content.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-footer.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-group-action.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-group-content.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-group-label.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-group.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-header.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-input.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-inset.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-menu-action.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-menu-badge.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-menu-button.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-menu-item.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-menu-skeleton.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-menu-sub-button.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-menu-sub-item.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-menu-sub.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-menu.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-provider.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-rail.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-separator.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar-trigger.svelte" },
			{ path: "src/lib/registry/ui/sidebar/sidebar.svelte" },
			{ path: "src/lib/registry/ui/sidebar/index.ts" },
		],
	},
	"use-mobile": {
		files: [{ path: "src/lib/registry/hooks/is-mobile.svelte.ts" }],
	},
};
