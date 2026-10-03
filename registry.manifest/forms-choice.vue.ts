import type { FrameworkEntry } from "./types.ts";

/** `frameworks.vue` entries for items in ./forms-choice.ts, keyed by item name (owned by the vue worker). */
export const entries: Record<string, FrameworkEntry> = {
	checkbox: {
		files: [
			{ path: "registry/ui/checkbox/Checkbox.vue" },
			{ path: "registry/ui/checkbox/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core"],
	},
	"radio-group": {
		files: [
			{ path: "registry/ui/radio-group/RadioGroup.vue" },
			{ path: "registry/ui/radio-group/RadioGroupItem.vue" },
			{ path: "registry/ui/radio-group/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core"],
	},
	switch: {
		files: [
			{ path: "registry/ui/switch/Switch.vue" },
			{ path: "registry/ui/switch/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core"],
	},
	slider: {
		files: [
			{ path: "registry/ui/slider/Slider.vue" },
			{ path: "registry/ui/slider/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core"],
	},
	// Reka UI Calendar/RangeCalendar + @internationalized/date (not react-day-picker / date-fns).
	calendar: {
		files: [
			{ path: "registry/ui/calendar/Calendar.vue" },
			{ path: "registry/ui/calendar/CalendarCaption.vue" },
			{ path: "registry/ui/calendar/RangeCalendar.vue" },
			{ path: "registry/ui/calendar/classes.ts" },
			{ path: "registry/ui/calendar/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core", "@internationalized/date"],
	},
	// Per CONTRIBUTING layout rule: one dir under registry/ui/, so the block is shipped as registry:ui.
	"date-picker": {
		type: "registry:ui",
		files: [
			{ path: "registry/ui/date-picker/DatePicker.vue" },
			{ path: "registry/ui/date-picker/DateRangePicker.vue" },
			{ path: "registry/ui/date-picker/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core", "@internationalized/date"],
	},
};
