import type { Tooltip } from "layerchart";
import { type Component, getContext, type Snippet, setContext } from "svelte";

export const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
	[k in string]: {
		label?: string;
		icon?: Component;
	} & (
		| { color?: string; theme?: never }
		| { color?: never; theme: Record<keyof typeof THEMES, string> }
	);
};

export type ExtractSnippetParams<T> = T extends Snippet<[infer P]> ? P : never;

export type TooltipPayload = Tooltip.TooltipSeries;

// Helper to extract item config from a payload.
export function getPayloadConfigFromPayload(
	config: ChartConfig,
	payload: TooltipPayload,
	key: string,
	data?: Record<string, unknown> | null,
) {
	if (typeof payload !== "object" || payload === null) return undefined;

	const payloadConfig =
		"config" in payload &&
		typeof payload.config === "object" &&
		payload.config !== null
			? payload.config
			: undefined;

	let configLabelKey: string = key;

	if (payload.key === key) {
		configLabelKey = payload.key;
	} else if (payload.label === key) {
		configLabelKey = payload.label;
	} else if (
		key in payload &&
		typeof payload[key as keyof typeof payload] === "string"
	) {
		configLabelKey = payload[key as keyof typeof payload] as string;
	} else if (
		payloadConfig !== undefined &&
		key in payloadConfig &&
		typeof payloadConfig[key as keyof typeof payloadConfig] === "string"
	) {
		configLabelKey = payloadConfig[key as keyof typeof payloadConfig] as string;
	} else if (data != null && key in data && typeof data[key] === "string") {
		configLabelKey = data[key] as string;
	}

	return configLabelKey in config
		? config[configLabelKey]
		: config[key as keyof typeof config];
}

type ChartContextValue = {
	config: ChartConfig;
};

const chartContextKey = Symbol("chart-context");

export function setChartContext(value: ChartContextValue) {
	return setContext(chartContextKey, value);
}

export function useChart() {
	return getContext<ChartContextValue>(chartContextKey);
}

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
