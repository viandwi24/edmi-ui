import type { Item } from "./types.ts";

export const items: Item[] = [
	{
		name: "input",
		title: "Input",
		description:
			"Single-line text field on the card surface with a sunken inner shadow, focus halo and aria-invalid state.",
		type: "registry:ui",
		categories: ["Forms"],
		docs: "Replaces the stock input: `shadcn add @edmi/input --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/input.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
	{
		name: "label",
		title: "Label",
		description:
			"Accessible label tied to a control; dims with disabled peers and Field groups.",
		type: "registry:ui",
		categories: ["Forms"],
		docs: "Replaces the stock label: `shadcn add @edmi/label --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/label.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "textarea",
		title: "Textarea",
		description:
			"Multi-line text on the card surface with a sunken inner shadow, focus halo and aria-invalid state. Grows with content.",
		type: "registry:ui",
		categories: ["Forms"],
		docs: "Replaces the stock textarea: `shadcn add @edmi/textarea --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/textarea.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "native-select",
		title: "Native Select",
		description:
			"The browser select with an Edmi trigger skin, for mobile and long, simple lists.",
		type: "registry:ui",
		categories: ["Forms"],
		docs: "Replaces the stock native-select: `shadcn add @edmi/native-select --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/native-select.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "input-otp",
		title: "Input OTP",
		description:
			"One-time code entry with individual slots, caret and paste support.",
		type: "registry:ui",
		categories: ["Forms"],
		docs: "Replaces the stock input-otp: `shadcn add @edmi/input-otp --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/input-otp.tsx" }],
				dependencies: ["cn", "input-otp"],
			},
		},
	},
	{
		name: "input-group",
		title: "Input Group",
		description:
			"Icons, text, buttons or keys around an input or textarea sharing one focus ring.",
		type: "registry:ui",
		categories: ["Forms"],
		registryDependencies: ["button", "input", "textarea"],
		docs: "Replaces the stock input-group: `shadcn add @edmi/input-group --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/input-group.tsx" }],
				dependencies: ["class-variance-authority", "cn"],
			},
		},
	},
	{
		name: "field",
		title: "Field",
		description:
			"Composes label, control, description and error into one accessible unit; vertical, horizontal or responsive.",
		type: "registry:ui",
		categories: ["Forms"],
		registryDependencies: ["label", "separator"],
		docs: "Replaces the stock field: `shadcn add @edmi/field --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/field.tsx" }],
				dependencies: ["class-variance-authority", "cn"],
			},
		},
	},
	{
		name: "select",
		title: "Select",
		description:
			"Custom select in a popover with groups, labels, separators, disabled items and a check on the chosen value.",
		type: "registry:ui",
		categories: ["Forms"],
		docs: "Replaces the stock select: `shadcn add @edmi/select --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/select.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
	{
		name: "combobox",
		title: "Combobox",
		description:
			"Searchable select (Base UI Combobox) with an input or chips trigger, showClear and multiple selection.",
		type: "registry:ui",
		categories: ["Forms"],
		registryDependencies: ["button", "input-group"],
		docs: "Replaces the stock combobox: `shadcn add @edmi/combobox --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/combobox.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
];
