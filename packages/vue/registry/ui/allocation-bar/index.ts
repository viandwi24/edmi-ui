export type AllocationSegment = {
	label: string;
	/** Weight in percent (any positive number; bars are proportional). */
	value: number;
	/** Any CSS color; defaults cycle `--chart-1…5`. */
	color?: string;
};

export { default as AllocationBar } from "./AllocationBar.vue";
