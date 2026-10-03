import type { DateValue } from "reka-ui";

export { default as DatePicker } from "./DatePicker.vue";
export { default as DateRangePicker } from "./DateRangePicker.vue";

/** ✦ A quick range shown in a column left of the calendar. */
export type DateRangePickerPreset = {
    label: string;
    range: () => { start: DateValue | undefined; end: DateValue | undefined };
};
