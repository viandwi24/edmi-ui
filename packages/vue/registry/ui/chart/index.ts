import { createContext } from "reka-ui";
import type { Component, Ref } from "vue";

export { default as ChartContainer } from "./ChartContainer.vue";
export { default as ChartLegendContent } from "./ChartLegendContent.vue";
export { default as ChartStatWell } from "./ChartStatWell.vue";
export { default as ChartTooltipContent } from "./ChartTooltipContent.vue";
export { componentToString } from "./utils";

// Format: { THEME_NAME: CSS_SELECTOR }
export const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
	[k in string]: {
		label?: string | Component;
		icon?: string | Component;
	} & (
		| { color?: string; theme?: never }
		| { color?: never; theme: Record<keyof typeof THEMES, string> }
	);
};

interface ChartContextProps {
	id: string;
	config: Ref<ChartConfig>;
}

export const [useChart, provideChartContext] =
	createContext<ChartContextProps>("Chart");

/** ✦ Series without an explicit color fall back to --chart-1…5 by order. */
export function chartColor(
	config: ChartConfig,
	key: string,
): string | undefined {
	const item = config[key];
	if (item?.color) return item.color;
	if (item?.theme) return `var(--color-${key})`;
	const index = Object.keys(config).indexOf(key);
	return index < 0 ? undefined : `var(--chart-${(index % 5) + 1})`;
}

export {
	VisCrosshair as ChartCrosshair,
	VisTooltip as ChartTooltip,
} from "@unovis/vue";
