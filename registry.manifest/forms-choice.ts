import type { Item } from "./types.ts";

export const items: Item[] = [
	{
		name: "checkbox",
		title: "Checkbox",
		description:
			"Toggle one option on or off. Checked and indeterminate states are raised controls.",
		type: "registry:ui",
		categories: ["Forms"],
		registryDependencies: [],
		docs: "Replaces the stock checkbox: `shadcn add @edmi/checkbox --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/checkbox.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
	{
		name: "radio-group",
		title: "Radio Group",
		description: "Pick exactly one option from a short list.",
		type: "registry:ui",
		categories: ["Forms"],
		registryDependencies: [],
		docs: "Replaces the stock radio-group: `shadcn add @edmi/radio-group --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/radio-group.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
	{
		name: "switch",
		title: "Switch",
		description:
			"Instant on/off for a setting. Brand-colored when on; sizes default and sm.",
		type: "registry:ui",
		categories: ["Forms"],
		registryDependencies: [],
		docs: "Replaces the stock switch: `shadcn add @edmi/switch --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/switch.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
	{
		name: "slider",
		title: "Slider",
		description:
			"Pick a value or range by dragging. Array value: 1 single, 2 range, 3+ multiple thumbs.",
		type: "registry:ui",
		categories: ["Forms"],
		registryDependencies: [],
		docs: "Replaces the stock slider: `shadcn add @edmi/slider --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/slider.tsx" }],
				dependencies: ["@base-ui/react", "cn"],
			},
		},
	},
	{
		name: "calendar",
		title: "Calendar",
		description:
			"Month grid for picking a date or range (react-day-picker). Selected day is a raised control.",
		type: "registry:ui",
		categories: ["Forms"],
		registryDependencies: ["button"],
		docs: "Replaces the stock calendar: `shadcn add @edmi/calendar --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/calendar.tsx" }],
				dependencies: ["@base-ui/react", "cn", "date-fns", "react-day-picker"],
			},
		},
	},
	{
		name: "date-picker",
		title: "Date Picker",
		description:
			"Popover + outline Button + Calendar. DatePicker for a single date, DateRangePicker with optional presets.",
		type: "registry:block",
		categories: ["Forms"],
		registryDependencies: ["button", "calendar", "popover"],
		docs: "Composition block: `shadcn add @edmi/date-picker`.",
		frameworks: {
			react: {
				files: [
					{
						path: "registry/blocks/date-picker/date-picker.tsx",
						type: "registry:component",
					},
				],
				dependencies: ["cn", "date-fns", "react-day-picker"],
			},
		},
	},
];
