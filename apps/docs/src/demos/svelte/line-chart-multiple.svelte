<script lang="ts">
	import { LineChart, Spline } from "layerchart";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import * as Card from "@edmi-svelte/ui/card";
	import * as Chart from "@edmi-svelte/ui/chart";
	import { curveNatural } from "./_chart-curves";

	const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
	const data = [
		{ i: 0, desktop: 186, mobile: 80 },
		{ i: 1, desktop: 305, mobile: 200 },
		{ i: 2, desktop: 237, mobile: 120 },
		{ i: 3, desktop: 73, mobile: 190 },
		{ i: 4, desktop: 209, mobile: 130 },
		{ i: 5, desktop: 214, mobile: 140 },
	];

	const config = {
		desktop: { label: "Desktop", color: "var(--chart-1)" },
		mobile: { label: "Mobile", color: "var(--chart-2)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="w-full max-w-sm gap-0 py-0">
	<Card.Header class="gap-1 px-6 pt-5.5 pb-0">
		<Card.Title class="font-semibold text-base tracking-[-0.2px]">Line Chart - Multiple</Card.Title>
		<Card.Description class="text-[13.5px]">January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content class="items-center px-5 pt-2.5 pb-0">
		<Chart.Container {config} class="aspect-auto h-52 w-full">
			<LineChart
				{data}
				x="i"
				legend
				series={[
					{ key: "desktop", label: config.desktop.label, color: "var(--color-desktop)" },
					{ key: "mobile", label: config.mobile.label, color: "var(--color-mobile)" },
				]}
				padding={{ left: 12, right: 12, bottom: 44 }}
				props={{
					xAxis: { format: (v: number) => labels[v] ?? "", ticks: 6 },
					yAxis: { format: () => "", ticks: 3 },
				}}
			>
				{#snippet marks({ context })}
					{#each context.series.visibleSeries as s (s.key)}
						<Spline seriesKey={s.key} curve={curveNatural} strokeWidth={2} />
					{/each}
				{/snippet}
				{#snippet tooltip()}
					<Chart.Tooltip indicator="line" labelFormatter={(v: number) => labels[v] ?? ""} />
				{/snippet}
			</LineChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col items-stretch gap-1 px-6 pt-3.5 pb-5.5 text-[13.5px]">
		<b class="flex items-center gap-1.5 font-medium">
			Trending up by 5.2% this month
			<IconPlaceholder lucide="TrendingUpIcon" tabler="IconTrendingUp" hugeicons="ChartUpIcon" phosphor="TrendUpIcon" remixicon="RiArrowUpLine" class="size-4" />
		</b>
		<span class="text-muted-foreground">Showing total visitors for the last 6 months</span>
	</Card.Footer>
</Card.Root>
