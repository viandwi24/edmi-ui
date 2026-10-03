import type { FrameworkEntry } from "./types.ts";

/** `frameworks.vue` entries for items in ./forms-text.ts, keyed by item name (owned by the vue worker). */
export const entries: Record<string, FrameworkEntry> = {
	input: {
		files: [
			{ path: "registry/ui/input/Input.vue" },
			{ path: "registry/ui/input/index.ts" },
		],
		dependencies: ["@vueuse/core"],
	},
	label: {
		files: [
			{ path: "registry/ui/label/Label.vue" },
			{ path: "registry/ui/label/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core"],
	},
	textarea: {
		files: [
			{ path: "registry/ui/textarea/Textarea.vue" },
			{ path: "registry/ui/textarea/index.ts" },
		],
		dependencies: ["@vueuse/core"],
	},
	"native-select": {
		files: [
			{ path: "registry/ui/native-select/NativeSelect.vue" },
			{ path: "registry/ui/native-select/NativeSelectOptGroup.vue" },
			{ path: "registry/ui/native-select/NativeSelectOption.vue" },
			{ path: "registry/ui/native-select/index.ts" },
		],
		dependencies: ["@vueuse/core"],
	},
	"input-otp": {
		files: [
			{ path: "registry/ui/input-otp/InputOTP.vue" },
			{ path: "registry/ui/input-otp/InputOTPGroup.vue" },
			{ path: "registry/ui/input-otp/InputOTPSeparator.vue" },
			{ path: "registry/ui/input-otp/InputOTPSlot.vue" },
			{ path: "registry/ui/input-otp/index.ts" },
		],
		dependencies: ["vue-input-otp", "reka-ui", "@vueuse/core"],
	},
	"input-group": {
		files: [
			{ path: "registry/ui/input-group/InputGroup.vue" },
			{ path: "registry/ui/input-group/InputGroupAddon.vue" },
			{ path: "registry/ui/input-group/InputGroupButton.vue" },
			{ path: "registry/ui/input-group/InputGroupInput.vue" },
			{ path: "registry/ui/input-group/InputGroupText.vue" },
			{ path: "registry/ui/input-group/InputGroupTextarea.vue" },
			{ path: "registry/ui/input-group/index.ts" },
		],
		dependencies: ["class-variance-authority"],
	},
	field: {
		files: [
			{ path: "registry/ui/field/Field.vue" },
			{ path: "registry/ui/field/FieldContent.vue" },
			{ path: "registry/ui/field/FieldDescription.vue" },
			{ path: "registry/ui/field/FieldError.vue" },
			{ path: "registry/ui/field/FieldGroup.vue" },
			{ path: "registry/ui/field/FieldLabel.vue" },
			{ path: "registry/ui/field/FieldLegend.vue" },
			{ path: "registry/ui/field/FieldSeparator.vue" },
			{ path: "registry/ui/field/FieldSet.vue" },
			{ path: "registry/ui/field/FieldTitle.vue" },
			{ path: "registry/ui/field/index.ts" },
		],
		dependencies: ["class-variance-authority"],
	},
	select: {
		files: [
			{ path: "registry/ui/select/Select.vue" },
			{ path: "registry/ui/select/SelectContent.vue" },
			{ path: "registry/ui/select/SelectGroup.vue" },
			{ path: "registry/ui/select/SelectItem.vue" },
			{ path: "registry/ui/select/SelectItemText.vue" },
			{ path: "registry/ui/select/SelectLabel.vue" },
			{ path: "registry/ui/select/SelectScrollDownButton.vue" },
			{ path: "registry/ui/select/SelectScrollUpButton.vue" },
			{ path: "registry/ui/select/SelectSeparator.vue" },
			{ path: "registry/ui/select/SelectTrigger.vue" },
			{ path: "registry/ui/select/SelectValue.vue" },
			{ path: "registry/ui/select/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core"],
	},
	combobox: {
		files: [
			{ path: "registry/ui/combobox/Combobox.vue" },
			{ path: "registry/ui/combobox/ComboboxAnchor.vue" },
			{ path: "registry/ui/combobox/ComboboxChip.vue" },
			{ path: "registry/ui/combobox/ComboboxChips.vue" },
			{ path: "registry/ui/combobox/ComboboxChipsInput.vue" },
			{ path: "registry/ui/combobox/ComboboxEmpty.vue" },
			{ path: "registry/ui/combobox/ComboboxGroup.vue" },
			{ path: "registry/ui/combobox/ComboboxInput.vue" },
			{ path: "registry/ui/combobox/ComboboxItem.vue" },
			{ path: "registry/ui/combobox/ComboboxItemIndicator.vue" },
			{ path: "registry/ui/combobox/ComboboxList.vue" },
			{ path: "registry/ui/combobox/ComboboxSeparator.vue" },
			{ path: "registry/ui/combobox/ComboboxTrigger.vue" },
			{ path: "registry/ui/combobox/ComboboxViewport.vue" },
			{ path: "registry/ui/combobox/index.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core"],
	},
};
