<script lang="ts">
	import { Area, AreaChart } from "layerchart";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import * as Card from "@edmi-svelte/ui/card";
	import * as Chart from "@edmi-svelte/ui/chart";

	const data = [
		{ i: 0, month: "January", desktop: 186, mobile: 80 },
		{ i: 1, month: "February", desktop: 305, mobile: 200 },
		{ i: 2, month: "March", desktop: 237, mobile: 120 },
		{ i: 3, month: "April", desktop: 73, mobile: 190 },
		{ i: 4, month: "May", desktop: 209, mobile: 130 },
		{ i: 5, month: "June", desktop: 214, mobile: 140 },
	];

	const config = {
		desktop: { label: "Desktop", color: "var(--chart-1)" },
	} satisfies Chart.ChartConfig;

</script>

<Card.Root class="w-full max-w-sm gap-0 py-0">
	<Card.Header class="gap-1 px-6 pt-5.5 pb-0">
		<Card.Title class="font-semibold text-base tracking-[-0.2px]">Area Chart - Linear</Card.Title>
		<Card.Description class="text-[13.5px]">Showing total visitors for the last 6 months</Card.Description>
	</Card.Header>
	<Card.Content class="items-center px-5 pt-2.5 pb-0">
		<Chart.Container {config} class="aspect-auto h-44 w-full">
			<AreaChart
				{data}
				x="i"
				seriesLayout="overlap"
				series={[
					{ key: "desktop", label: config.desktop.label, color: "var(--color-desktop)" },
				]}
				padding={{ left: 12, right: 12, top: 4, bottom: 20 }}
				props={{
					xAxis: { format: (v: number) => data[v]?.month.slice(0, 3) ?? "", ticks: 6 },
					yAxis: { format: () => "" },
				}}
			>
				{#snippet marks({ context })}
					<defs>
			<linearGradient id="fill-desktop-linear" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0" style="stop-color: var(--chart-1); stop-opacity: 0.26" />
				<stop offset="1" style="stop-color: var(--chart-1); stop-opacity: 0.03" />
			</linearGradient>
					</defs>
					{#each context.series.visibleSeries as s (s.key)}
						<Area
							seriesKey={s.key}
							fill="url(#fill-{s.key}-linear)"
							fillOpacity={1}
							line={{ class: "stroke-2" }}
						/>
					{/each}
				{/snippet}
				{#snippet tooltip()}
					<Chart.Tooltip indicator="line" labelFormatter={(v: number) => data[v]?.month ?? ""} />
				{/snippet}
			</AreaChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col items-stretch gap-1 px-6 pt-3.5 pb-5.5 text-[13.5px]">
		<b class="flex items-center gap-2 font-medium">
			Trending up by 5.2% this month
			<IconPlaceholder
				lucide="TrendingUpIcon"
				tabler="IconTrendingUp"
				hugeicons="AnalyticsUpIcon"
				phosphor="TrendUpIcon"
				remixicon="RiLineChartLine"
				class="size-4"
			/>
		</b>
		<span class="text-muted-foreground">January - June 2024</span>
	</Card.Footer>
</Card.Root>
