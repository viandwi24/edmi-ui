<script lang="ts">
	import { getChartContext, Tooltip as TooltipPrimitive } from "layerchart";
	import { cn, type WithElementRef, type WithoutChildren } from "$lib/utils.js";
	import { chartColor, getPayloadConfigFromPayload, useChart, type TooltipPayload } from "./chart-utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function defaultFormatter(value: any, _payload: TooltipPayload[]) {
		return `${value}`;
	}

	let {
		ref = $bindable(null),
		class: className,
		hideLabel = false,
		indicator = "dot",
		hideIndicator = false,
		labelKey,
		label,
		labelFormatter = defaultFormatter,
		labelClassName,
		formatter,
		nameKey,
		color,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> & {
		hideLabel?: boolean;
		label?: string;
		indicator?: "line" | "dot" | "dashed" | "none";
		nameKey?: string;
		labelKey?: string;
		hideIndicator?: boolean;
		labelClassName?: string;
		labelFormatter?: // eslint-disable-next-line @typescript-eslint/no-explicit-any
			((value: any, payload: TooltipPayload[]) => string | number | Snippet) | null;
		formatter?: Snippet<
			[
				{
					value: unknown;
					name: string;
					item: TooltipPayload;
					index: number;
					payload: TooltipPayload[];
				},
			]
		>;
	} = $props();

	const chart = useChart();
	const chartCtx = getChartContext();

	// Filter to series with defined values (important for item-based charts like Pie/Arc
	// where only the hovered item has a value)
	const visibleSeries = $derived(
		chartCtx.tooltip.series.filter((s: TooltipPayload) => s.value !== undefined)
	);

	const formattedLabel = $derived.by(() => {
		if (hideLabel || !visibleSeries?.length) return null;

		const [item] = visibleSeries;
		const tooltipData = chartCtx.tooltip.data;

		// Get the x-axis label value from the raw tooltip data (e.g. a Date or month string)
		const dataLabel = tooltipData != null ? chartCtx.x(tooltipData) : undefined;

		const key = labelKey ?? item?.label ?? item?.key ?? "value";
		const itemConfig = getPayloadConfigFromPayload(
			chart.config,
			item,
			key,
			tooltipData as Record<string, unknown> | null
		);

		let value: unknown;
		if (!labelKey && typeof label === "string") {
			value = chart.config[label as keyof typeof chart.config]?.label ?? label;
		} else if (labelKey) {
			value = itemConfig?.label ?? dataLabel;
		} else {
			value = dataLabel;
		}

		if (value === undefined) return null;
		if (!labelFormatter) return value;
		return labelFormatter(value, visibleSeries);
	});

	const showIndicator = $derived(!hideIndicator && indicator !== "none");
</script>

{#snippet TooltipLabel()}
	{#if formattedLabel}
		<div class={cn("font-medium text-foreground", labelClassName)}>
			{#if typeof formattedLabel === "function"}
				{@render formattedLabel()}
			{:else}
				{formattedLabel}
			{/if}
		</div>
	{/if}
{/snippet}

<TooltipPrimitive.Root variant="none">
	<div
		bind:this={ref}
		class={cn(
			"grid min-w-36 gap-1.5 rounded-lg border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-floating",
			className
		)}
		{...restProps}
	>
		{@render TooltipLabel()}
		<div class="grid gap-1.5">
			{#each visibleSeries as item, i (item.key + i)}
				{@const key = `${nameKey || item.key || item.label || "value"}`}
				{@const itemConfig = getPayloadConfigFromPayload(
					chart.config,
					item,
					key,
					chartCtx.tooltip.data
				)}
				{@const indicatorColor = color || item.config?.color || item.color || chartColor(chart.config, item.key)}
				<div
					class={cn(
						"flex w-full items-center gap-2 [&>svg]:size-3 [&>svg]:text-muted-foreground"
					)}
				>
					{#if formatter && item.value !== undefined && item.label}
						{@render formatter({
							value: item.value,
							name: item.label,
							item,
							index: i,
							payload: visibleSeries,
						})}
					{:else}
						{#if itemConfig?.icon}
							<itemConfig.icon />
						{:else if showIndicator}
							<div
								style="--color-bg: {indicatorColor};"
								class={cn("shrink-0", {
									"size-2 rounded-[2px] bg-(--color-bg)": indicator === "dot",
									"min-h-3.5 w-1 self-stretch rounded-[2px] bg-(--color-bg)": indicator === "line",
									"min-h-3.5 w-0 self-stretch border-l-2 border-dashed border-(--color-bg)": indicator === "dashed",
								})}
							></div>
						{/if}
						<span class="flex-1 text-muted-foreground">
							{itemConfig?.label || item.label}
						</span>
						{#if item.value !== undefined}
							<span class="ml-3 font-semibold whitespace-nowrap text-foreground tabular-nums">
								{item.value.toLocaleString()}
							</span>
						{/if}
					{/if}
				</div>
			{/each}
		</div>
	</div>
</TooltipPrimitive.Root>
