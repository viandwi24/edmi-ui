<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import * as Card from "@edmi-svelte/ui/card";
	import * as Chart from "@edmi-svelte/ui/chart";
	import RadarSvg from "./_radar/radar-svg.svelte";

	const axes = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

	const config = {
		desktop: { label: "Desktop", color: "var(--chart-1)" },
	} satisfies Chart.ChartConfig;

	const series = [
	  { key: "desktop", label: "Desktop", color: "var(--color-desktop)", values: [186, 305, 237, 73, 209, 214] },
	];
</script>

<Card.Root class="w-full max-w-sm gap-0 py-0">
	<Card.Header class="gap-1 px-6 pt-5.5 pb-0">
		<Card.Title class="font-semibold text-base tracking-[-0.2px]">Radar Chart - Custom Label</Card.Title>
		<Card.Description class="text-[13.5px]">Showing total visitors for the last 6 months</Card.Description>
	</Card.Header>
	<Card.Content class="items-center px-5 pt-2.5 pb-0">
		<Chart.Container {config} class="aspect-auto h-auto w-full flex-col">
			<RadarSvg {axes} {series} grid="polygon" customLabel />
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col items-stretch gap-1 px-6 pt-3.5 pb-5.5 text-[13.5px]">
		<b class="flex items-center gap-1.5 font-medium">
			Trending up by 5.2% this month
			<IconPlaceholder lucide="TrendingUpIcon" tabler="IconTrendingUp" hugeicons="ChartUpIcon" phosphor="TrendUpIcon" remixicon="RiArrowUpLine" class="size-4" />
		</b>
		<span class="text-muted-foreground">January - June 2024</span>
	</Card.Footer>
</Card.Root>
