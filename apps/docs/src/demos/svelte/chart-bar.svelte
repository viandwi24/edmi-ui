<script lang="ts">
	import { BarChart } from "layerchart";
	import * as Card from "@edmi-svelte/ui/card";
	import * as Chart from "@edmi-svelte/ui/chart";

	const data = [
		{ day: "M", joins: 62, exits: 37 },
		{ day: "T", joins: 80, exits: 48 },
		{ day: "W", joins: 54, exits: 32 },
		{ day: "T2", joins: 96, exits: 58 },
		{ day: "F", joins: 70, exits: 42 },
		{ day: "S", joins: 110, exits: 66 },
		{ day: "S2", joins: 88, exits: 53 },
	];

	// No colors given: series fall back to --chart-1, --chart-2 by order (✦).
	const config = {
		joins: { label: "Joins" },
		exits: { label: "Exits" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="w-full max-w-md gap-0 py-0">
	<Card.Header class="gap-1 px-6 pt-5.5 pb-0">
		<Card.Title class="font-semibold text-base tracking-[-0.2px]">Joins vs exits</Card.Title>
		<Card.Description class="text-[13.5px]">This week</Card.Description>
	</Card.Header>
	<Card.Content class="items-center px-5 pt-2.5 pb-0">
		<Chart.Container {config} class="aspect-auto h-48 w-full">
			<BarChart
				{data}
				x="day"
				legend
				seriesLayout="group"
				bandPadding={0.25}
				series={[
					{ key: "joins", label: "Joins", color: "var(--color-joins)" },
					{ key: "exits", label: "Exits", color: "var(--color-exits)" },
				]}
				props={{
					bars: { radius: 4, strokeWidth: 0 },
					xAxis: { format: (v: string) => v.replace(/2$/, "") },
					yAxis: { format: () => "" },
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip indicator="line" labelFormatter={(v: string) => v.replace(/2$/, "")} />
				{/snippet}
			</BarChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
