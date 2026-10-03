<script lang="ts">
	import { AreaChart } from "layerchart";
	import * as Card from "@edmi-svelte/ui/card";
	import * as Chart from "@edmi-svelte/ui/chart";

	const days = ["Sep 1", "Sep 7", "Sep 13", "Sep 19", "Sep 21", "Sep 25", "Oct 1"];
	const data = [
		{ i: 0, mag4: 4.0, spyx: 2.0 },
		{ i: 1, mag4: 5.6, spyx: 2.6 },
		{ i: 2, mag4: 6.4, spyx: 3.4 },
		{ i: 3, mag4: 9.8, spyx: 5.1 },
		{ i: 4, mag4: 11.0, spyx: 6.4 },
		{ i: 5, mag4: 12.3, spyx: 7.2 },
		{ i: 6, mag4: 14.1, spyx: 8.0 },
	];

	const config = {
		mag4: { label: "MAG4", color: "var(--chart-1)" },
		spyx: { label: "SPYx", color: "var(--chart-2)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="w-full max-w-lg">
	<Card.Header>
		<Card.Title>NAV vs benchmark</Card.Title>
		<Card.Description>Last 30 days</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container {config} class="aspect-auto h-52 w-full">
			<AreaChart
				{data}
				x="i"
				legend
				series={[
					{ key: "spyx", label: config.spyx.label, color: "var(--color-spyx)" },
					{ key: "mag4", label: config.mag4.label, color: "var(--color-mag4)" },
				]}
				props={{
					area: { curve: undefined, "fill-opacity": 0.2 },
					xAxis: { format: (v: number) => days[v] ?? "", ticks: 4 },
					yAxis: { format: () => "" },
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip indicator="dot" labelFormatter={(v: number) => days[v] ?? ""} />
				{/snippet}
			</AreaChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
