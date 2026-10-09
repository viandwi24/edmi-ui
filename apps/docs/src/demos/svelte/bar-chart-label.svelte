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
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="w-full max-w-sm gap-0 py-0">
	<Card.Header class="gap-1 px-6 pt-5.5 pb-0">
		<Card.Title class="font-semibold text-base tracking-[-0.2px]">Bar Chart - Label</Card.Title>
		<Card.Description class="text-[13.5px]">January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content class="items-center px-5 pt-2.5 pb-0">
		<Chart.Container {config} class="aspect-auto h-52 w-full [&_.lc-bar]:stroke-none">
			<BarChart
				{data}
				x="month"
				series={[{ key: "desktop", label: config.desktop.label, color: "var(--color-desktop)" }]}
				bandPadding={0.5}
				labels={{ offset: 8 }}
				grid={{ x: false }}
				padding={{ top: 20, left: 0, right: 0, bottom: 24 }}
				props={{
				bars: { radius: 4, rounded: "top", width: 24 },
				xAxis: { format: (v: string) => v.slice(0, 3) },
				yAxis: { format: () => "" },
			}}
			>
				{#snippet tooltip()}
				<Chart.Tooltip indicator="dot" hideLabel />
			{/snippet}
			</BarChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col items-stretch gap-1 px-6 pt-3.5 pb-5.5 text-[13.5px]">
		<b class="inline-flex items-center gap-2 font-medium">
			Trending up by 5.2% this month
			<svg viewBox="0 0 24 24" class="size-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 7-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></svg>
		</b>
		<span class="text-muted-foreground">Showing total visitors for the last 6 months</span>
	</Card.Footer>
</Card.Root>
