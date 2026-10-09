<script lang="ts">
	import { BarChart } from "layerchart";
	import * as Card from "@edmi-svelte/ui/card";
	import * as Chart from "@edmi-svelte/ui/chart";

	const data = [
		{ month: "January", desktop: 186, mobile: 80 },
		{ month: "February", desktop: 305, mobile: 200 },
		{ month: "March", desktop: 237, mobile: 120 },
		{ month: "April", desktop: 73, mobile: 190 },
		{ month: "May", desktop: 209, mobile: 130 },
		{ month: "June", desktop: 214, mobile: 140 },
	];
	const config = {
		desktop: { label: "Desktop", color: "var(--chart-1)" },
		mobile: { label: "Mobile", color: "var(--chart-2)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="w-full max-w-sm gap-0 py-0">
	<Card.Header class="gap-1 px-6 pt-5.5 pb-0">
		<Card.Title class="font-semibold text-base tracking-[-0.2px]">Bar Chart - Stacked + Legend</Card.Title>
		<Card.Description class="text-[13.5px]">January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content class="items-center px-5 pt-2.5 pb-0">
		<Chart.Container {config} class="aspect-auto h-52 w-full [&_.lc-bar]:stroke-card [&_.lc-bar]:stroke-2">
			<BarChart
				{data}
				x="month"
				legend
				seriesLayout="stack"
				stackPadding={2}
				series={[
					{ key: "desktop", label: config.desktop.label, color: "var(--color-desktop)", props: { rounded: "none" } },
					{ key: "mobile", label: config.mobile.label, color: "var(--color-mobile)", props: { rounded: "top" } },
				]}
				bandPadding={0.5}
				grid={{ x: false }}
				props={{
				bars: { radius: 4, rounded: "top", width: 24 },
				xAxis: { format: (v: string) => v.slice(0, 3) },
				yAxis: { format: () => "" },
			}}
			>
				{#snippet tooltip()}
				<Chart.Tooltip indicator="dot" />
			{/snippet}
			</BarChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
