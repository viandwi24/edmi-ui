import type { FrameworkEntry } from "./types.ts";

/** `frameworks.svelte` entries for items in ./forms-choice.ts, keyed by item name (owned by the svelte worker). */
export const entries: Record<string, FrameworkEntry> = {
	checkbox: {
		files: [
			{ path: "src/lib/registry/ui/checkbox/checkbox.svelte" },
			{ path: "src/lib/registry/ui/checkbox/index.ts" },
		],
	},
	"radio-group": {
		files: [
			{ path: "src/lib/registry/ui/radio-group/radio-group.svelte" },
			{ path: "src/lib/registry/ui/radio-group/radio-group-item.svelte" },
			{ path: "src/lib/registry/ui/radio-group/index.ts" },
		],
	},
	switch: {
		files: [
			{ path: "src/lib/registry/ui/switch/switch.svelte" },
			{ path: "src/lib/registry/ui/switch/index.ts" },
		],
	},
	slider: {
		files: [
			{ path: "src/lib/registry/ui/slider/slider.svelte" },
			{ path: "src/lib/registry/ui/slider/index.ts" },
		],
	},
	// Bits UI Calendar/RangeCalendar + @internationalized/date (not react-day-picker / date-fns).
	calendar: {
		files: [
			{ path: "src/lib/registry/ui/calendar/calendar.svelte" },
			{ path: "src/lib/registry/ui/calendar/calendar-caption.svelte" },
			{ path: "src/lib/registry/ui/calendar/range-calendar.svelte" },
			{ path: "src/lib/registry/ui/calendar/classes.ts" },
			{ path: "src/lib/registry/ui/calendar/index.ts" },
		],
	},
	// Per CONTRIBUTING layout rule: one dir under registry/ui/, so the block is shipped as registry:ui.
	"date-picker": {
		type: "registry:ui",
		files: [
			{ path: "src/lib/registry/ui/date-picker/date-picker.svelte" },
			{ path: "src/lib/registry/ui/date-picker/date-range-picker.svelte" },
			{ path: "src/lib/registry/ui/date-picker/index.ts" },
		],
	},
};
