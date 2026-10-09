<script lang="ts">
	import { BarChart } from "layerchart";
	import * as Card from "@edmi-svelte/ui/card";
	import * as Chart from "@edmi-svelte/ui/chart";

	const data = [
		{ browser: "chrome", visitors: 275 },
		{ browser: "safari", visitors: 200 },
		{ browser: "firefox", visitors: 187 },
		{ browser: "edge", visitors: 173 },
		{ browser: "other", visitors: 90 },
	];
	const config = {
		chrome: { label: "Chrome", color: "var(--chart-1)" },
		safari: { label: "Safari", color: "var(--chart-2)" },
		firefox: { label: "Firefox", color: "var(--chart-3)" },
		edge: { label: "Edge", color: "var(--chart-4)" },
		other: { label: "Other", color: "var(--chart-5)" },
	} satisfies Chart.ChartConfig;
	const keys = ["chrome", "safari", "firefox", "edge", "other"] as const;
	const label = (k: string) => config[k as keyof typeof config]?.label ?? k;
</script>

<Card.Root class="w-full max-w-sm gap-0 py-0">
	<Card.Header class="gap-1 px-6 pt-5.5 pb-0">
		<Card.Title class="font-semibold text-base tracking-[-0.2px]">Bar Chart - Custom Label</Card.Title>
		<Card.Description class="text-[13.5px]">January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content class="items-center px-5 pt-2.5 pb-0">
		<Chart.Container {config} class="aspect-auto h-52 w-full [&_.lc-bar]:stroke-none">
			<BarChart
				{data}
				y="browser"
				x="visitors"
				orientation="horizontal"
				series={[{ key: "visitors", label: "Visitors", color: "var(--chart-1)" }]}
				bandPadding={0.35}
				labels={{ offset: 8 }}
				grid={false}
				axis="y"
				padding={{ top: 4, left: 50, right: 32, bottom: 4 }}
				props={{
					bars: { radius: 4, rounded: "right", height: 24 },
					yAxis: { format: label },
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip indicator="dot" hideLabel nameKey="browser" />
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
