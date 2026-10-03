export type MeterZone = {
	/** Upper bound of the zone, 0..1. */
	upTo: number;
	/** Any CSS color, e.g. `var(--chart-1)`. */
	color: string;
};

export { default as StatMeter } from "./StatMeter.vue";
export { default as StatStrip } from "./StatStrip.vue";
export { default as StatStripItem } from "./StatStripItem.vue";
export { default as StatTile } from "./StatTile.vue";
