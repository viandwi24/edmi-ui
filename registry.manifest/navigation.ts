import type { Item } from "./types.ts";

export const items: Item[] = [
	{
		name: "tabs",
		title: "Tabs",
		description:
			"Tabs in a flat, sunken track (variant default) or underlined (variant line). Horizontal and vertical.",
		type: "registry:ui",
		categories: ["Navigation"],
		registryDependencies: ["elevation"],
		docs: "Replaces the stock tabs: `shadcn add @edmi-ui/tabs --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/tabs.tsx" }],
				dependencies: ["@base-ui/react", "class-variance-authority", "cn"],
			},
		},
	},
	{
		name: "breadcrumb",
		title: "Breadcrumb",
		description:
			"Hierarchy trail: list, items, links, current page, separator and ellipsis.",
		type: "registry:ui",
		categories: ["Navigation"],
		docs: "Replaces the stock breadcrumb: `shadcn add @edmi-ui/breadcrumb --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/breadcrumb.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
	{
		name: "pagination",
		title: "Pagination",
		description:
			"Page navigation built from Edmi buttons: active page outline, previous/next and ellipsis.",
		type: "registry:ui",
		categories: ["Navigation"],
		registryDependencies: ["button", "elevation"],
		docs: "Replaces the stock pagination: `shadcn add @edmi-ui/pagination --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/pagination.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "dropdown-menu",
		title: "Dropdown Menu",
		description:
			"Menu opened by a button: items (default, destructive), checkbox and radio items, labels, shortcuts and sub-menus.",
		type: "registry:ui",
		categories: ["Navigation"],
		registryDependencies: ["elevation"],
		docs: "Replaces the stock dropdown-menu: `shadcn add @edmi-ui/dropdown-menu --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/dropdown-menu.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
	{
		name: "context-menu",
		title: "Context Menu",
		description:
			"Right-click menu with the same anatomy and recipe as the dropdown menu.",
		type: "registry:ui",
		categories: ["Navigation"],
		registryDependencies: ["elevation"],
		docs: "Replaces the stock context-menu: `shadcn add @edmi-ui/context-menu --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/context-menu.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
	{
		name: "menubar",
		title: "Menubar",
		description: "Persistent row of menus; items have a destructive variant.",
		type: "registry:ui",
		categories: ["Navigation"],
		registryDependencies: ["dropdown-menu", "elevation"],
		docs: "Replaces the stock menubar: `shadcn add @edmi-ui/menubar --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/menubar.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
	{
		name: "navigation-menu",
		title: "Navigation Menu",
		description:
			"Top-level links with rich dropdown panels for the navbar layout.",
		type: "registry:ui",
		categories: ["Navigation"],
		docs: "Replaces the stock navigation-menu: `shadcn add @edmi-ui/navigation-menu --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/navigation-menu.tsx" }],
				dependencies: ["@base-ui/react", "class-variance-authority", "cn"],
			},
		},
	},
	{
		name: "command",
		title: "Command",
		description:
			"Command palette (cmdk): input row, groups, items with mono shortcuts, empty state and a dialog form for ⌘K.",
		type: "registry:ui",
		categories: ["Navigation"],
		registryDependencies: ["dialog"],
		docs: "Replaces the stock command: `shadcn add @edmi-ui/command --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/command.tsx" }],
				dependencies: ["cmdk", "cn"],
			},
		},
	},
	{
		name: "use-mobile",
		title: "useIsMobile",
		description:
			"Hook returning true below the 768px breakpoint. Used by the sidebar.",
		type: "registry:hook",
		categories: ["Navigation"],
		docs: "Replaces the stock use-mobile hook: `shadcn add @edmi-ui/use-mobile --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/hooks/use-mobile.ts" }],
				dependencies: [],
			},
		},
	},
	{
		name: "sidebar",
		title: "Sidebar",
		description:
			"App frame sidebar: variants sidebar, floating, inset; collapsible offcanvas, icon or none; either side. Groups, menus, sub-menus, badges, rail and trigger.",
		type: "registry:ui",
		categories: ["Navigation"],
		registryDependencies: [
			"button",
			"input",
			"separator",
			"sheet",
			"skeleton",
			"tooltip",
			"use-mobile",
		],
		docs: "Replaces the stock sidebar: `shadcn add @edmi-ui/sidebar --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/sidebar.tsx" }],
				dependencies: ["@base-ui/react", "class-variance-authority", "cn"],
			},
		},
	},
];
