import type { FrameworkEntry } from "./types.ts";

/** `frameworks.svelte` entries for items in ./forms-text.ts, keyed by item name (owned by the svelte worker). */
export const entries: Record<string, FrameworkEntry> = {
	input: {
		files: [
			{ path: "src/lib/registry/ui/input/input.svelte" },
			{ path: "src/lib/registry/ui/input/index.ts" },
		],
	},
	label: {
		files: [
			{ path: "src/lib/registry/ui/label/label.svelte" },
			{ path: "src/lib/registry/ui/label/index.ts" },
		],
	},
	textarea: {
		files: [
			{ path: "src/lib/registry/ui/textarea/textarea.svelte" },
			{ path: "src/lib/registry/ui/textarea/index.ts" },
		],
	},
	"native-select": {
		files: [
			{
				path: "src/lib/registry/ui/native-select/native-select-opt-group.svelte",
			},
			{ path: "src/lib/registry/ui/native-select/native-select-option.svelte" },
			{ path: "src/lib/registry/ui/native-select/native-select.svelte" },
			{ path: "src/lib/registry/ui/native-select/index.ts" },
		],
	},
	"input-otp": {
		files: [
			{ path: "src/lib/registry/ui/input-otp/input-otp-group.svelte" },
			{ path: "src/lib/registry/ui/input-otp/input-otp-separator.svelte" },
			{ path: "src/lib/registry/ui/input-otp/input-otp-slot.svelte" },
			{ path: "src/lib/registry/ui/input-otp/input-otp.svelte" },
			{ path: "src/lib/registry/ui/input-otp/index.ts" },
		],
	},
	"input-group": {
		files: [
			{ path: "src/lib/registry/ui/input-group/input-group-addon.svelte" },
			{ path: "src/lib/registry/ui/input-group/input-group-button.svelte" },
			{ path: "src/lib/registry/ui/input-group/input-group-input.svelte" },
			{ path: "src/lib/registry/ui/input-group/input-group-text.svelte" },
			{ path: "src/lib/registry/ui/input-group/input-group-textarea.svelte" },
			{ path: "src/lib/registry/ui/input-group/input-group.svelte" },
			{ path: "src/lib/registry/ui/input-group/index.ts" },
		],
	},
	field: {
		files: [
			{ path: "src/lib/registry/ui/field/field-content.svelte" },
			{ path: "src/lib/registry/ui/field/field-description.svelte" },
			{ path: "src/lib/registry/ui/field/field-error.svelte" },
			{ path: "src/lib/registry/ui/field/field-group.svelte" },
			{ path: "src/lib/registry/ui/field/field-label.svelte" },
			{ path: "src/lib/registry/ui/field/field-legend.svelte" },
			{ path: "src/lib/registry/ui/field/field-separator.svelte" },
			{ path: "src/lib/registry/ui/field/field-set.svelte" },
			{ path: "src/lib/registry/ui/field/field-title.svelte" },
			{ path: "src/lib/registry/ui/field/field.svelte" },
			{ path: "src/lib/registry/ui/field/index.ts" },
		],
	},
	select: {
		files: [
			{ path: "src/lib/registry/ui/select/select-content.svelte" },
			{ path: "src/lib/registry/ui/select/select-group-heading.svelte" },
			{ path: "src/lib/registry/ui/select/select-group.svelte" },
			{ path: "src/lib/registry/ui/select/select-item.svelte" },
			{ path: "src/lib/registry/ui/select/select-label.svelte" },
			{ path: "src/lib/registry/ui/select/select-portal.svelte" },
			{ path: "src/lib/registry/ui/select/select-scroll-down-button.svelte" },
			{ path: "src/lib/registry/ui/select/select-scroll-up-button.svelte" },
			{ path: "src/lib/registry/ui/select/select-separator.svelte" },
			{ path: "src/lib/registry/ui/select/select-trigger.svelte" },
			{ path: "src/lib/registry/ui/select/select-value.svelte" },
			{ path: "src/lib/registry/ui/select/select.svelte" },
			{ path: "src/lib/registry/ui/select/index.ts" },
		],
		registryDependencies: ["separator", "elevation"],
	},
	combobox: {
		files: [
			{ path: "src/lib/registry/ui/combobox/combobox-chip.svelte" },
			{ path: "src/lib/registry/ui/combobox/combobox-chips-input.svelte" },
			{ path: "src/lib/registry/ui/combobox/combobox-chips.svelte" },
			{ path: "src/lib/registry/ui/combobox/combobox-content.svelte" },
			{ path: "src/lib/registry/ui/combobox/combobox-empty.svelte" },
			{ path: "src/lib/registry/ui/combobox/combobox-group.svelte" },
			{ path: "src/lib/registry/ui/combobox/combobox-input.svelte" },
			{ path: "src/lib/registry/ui/combobox/combobox-item.svelte" },
			{ path: "src/lib/registry/ui/combobox/combobox-label.svelte" },
			{ path: "src/lib/registry/ui/combobox/combobox-list.svelte" },
			{ path: "src/lib/registry/ui/combobox/combobox-separator.svelte" },
			{ path: "src/lib/registry/ui/combobox/combobox-trigger.svelte" },
			{ path: "src/lib/registry/ui/combobox/combobox.svelte" },
			{ path: "src/lib/registry/ui/combobox/context.ts" },
			{ path: "src/lib/registry/ui/combobox/index.ts" },
		],
	},
};
