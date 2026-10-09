<script lang="ts">
	import { LineChart, Circle, Points, Spline } from "layerchart";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import * as Card from "@edmi-svelte/ui/card";
	import * as Chart from "@edmi-svelte/ui/chart";

	const labels = [
		"Chrome", "Safari", "Firefox", "Edge", "Other",
	];
	const data = [
		{ i: 0, browser: "Chrome", visitors: 275, fill: "var(--chart-1)" },
		{ i: 1, browser: "Safari", visitors: 200, fill: "var(--chart-2)" },
		{ i: 2, browser: "Firefox", visitors: 187, fill: "var(--chart-3)" },
		{ i: 3, browser: "Edge", visitors: 173, fill: "var(--chart-4)" },
		{ i: 4, browser: "Other", visitors: 90, fill: "var(--chart-5)" },
	];

	const config = {
		visitors: { label: "Visitors", color: "var(--chart-1)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="w-full max-w-sm gap-0 py-0">
	<Card.Header class="gap-1 px-6 pt-5.5 pb-0">
		<Card.Title class="font-semibold text-base tracking-[-0.2px]">Line Chart - Dots Colors</Card.Title>
		<Card.Description class="text-[13.5px]">January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content class="items-center px-5 pt-2.5 pb-0">
		<Chart.Container {config} class="aspect-auto h-44 w-full">
			<LineChart
				{data}
				x="i"
				
				series={[{ key: "visitors", label: "Visitors", color: "var(--color-visitors)" }]}
				padding={{ left: 12, right: 12, bottom: 24 }}
				props={{
					xAxis: { format: (v: number) => labels[v] ?? "", ticks: 5 },
					yAxis: { format: () => "", ticks: 3 },
				}}
			>
				{#snippet marks({ context })}
					{#each context.series.visibleSeries as s (s.key)}
						<Spline seriesKey={s.key} strokeWidth={2} />
						<Points seriesKey={s.key}>
							{#snippet children({ points })}
								{#each points as p}
									<Circle cx={p.x} cy={p.y} r={4} fill={p.data.fill} stroke="var(--card)" strokeWidth={2} />
								{/each}
							{/snippet}
						</Points>
					{/each}
				{/snippet}
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel />
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
