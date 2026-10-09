<script lang="ts">
	import { PieChart } from "layerchart";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import * as Card from "@edmi-svelte/ui/card";
	import * as Chart from "@edmi-svelte/ui/chart";

	const config = {
		chrome: { label: "Chrome", color: "var(--chart-1)" },
		safari: { label: "Safari", color: "var(--chart-2)" },
		firefox: { label: "Firefox", color: "var(--chart-3)" },
		edge: { label: "Edge", color: "var(--chart-4)" },
		other: { label: "Other", color: "var(--chart-5)" },
	} satisfies Chart.ChartConfig;

	const data = [
		{ browser: "chrome", visitors: 275, name: "Chrome", color: "var(--color-chrome)" },
		{ browser: "safari", visitors: 200, name: "Safari", color: "var(--color-safari)" },
		{ browser: "firefox", visitors: 187, name: "Firefox", color: "var(--color-firefox)" },
		{ browser: "edge", visitors: 173, name: "Edge", color: "var(--color-edge)" },
		{ browser: "other", visitors: 90, name: "Other", color: "var(--color-other)" },
	];
</script>

<Card.Root class="w-full max-w-sm gap-0 py-0">
	<Card.Header class="items-center justify-items-center gap-1 px-6 pt-5.5 pb-0 text-center">
		<Card.Title class="font-semibold text-base tracking-[-0.2px]">Pie Chart - Donut</Card.Title>
		<Card.Description class="text-[13.5px]">January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content class="items-center px-5 pt-2.5 pb-0">
		<Chart.Container {config} class="aspect-auto h-[236px] w-full">
			<PieChart
				{data}
				key="browser"
				label="name"
				value="visitors"
				c="color"
				innerRadius={-38}
				padAngle={0.02}
				props={{ pie: { motion: "tween" } }}
			>
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel nameKey="browser" />
				{/snippet}
			</PieChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col items-center gap-1 px-6 pt-3.5 pb-5.5 text-center text-[13.5px]">
		<div class="flex items-center gap-1.5 font-medium">
			Trending up by 5.2% this month
			<IconPlaceholder lucide="TrendingUpIcon" tabler="IconTrendingUp" hugeicons="ChartUpIcon" phosphor="TrendUpIcon" remixicon="RiArrowUpLine" class="size-4" />
		</div>
		<div class="text-muted-foreground">Showing total visitors for the last 6 months</div>
	</Card.Footer>
</Card.Root>
