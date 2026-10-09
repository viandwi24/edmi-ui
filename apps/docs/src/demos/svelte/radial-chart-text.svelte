<script lang="ts">
	import * as Card from "@edmi-svelte/ui/card";
	import * as Chart from "@edmi-svelte/ui/chart";

	const config = {
		safari: { label: "Safari", color: "var(--chart-1)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="w-full max-w-sm gap-0 py-0">
	<Card.Header class="items-center gap-1 px-6 pt-5.5 pb-0 text-center">
		<Card.Title class="font-semibold text-base tracking-[-0.2px]">Radial Chart - Text</Card.Title>
		<Card.Description class="text-[13.5px]">January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content class="flex-1 items-center px-5 pt-2.5 pb-0">
		<Chart.Container {config} class="aspect-auto h-auto w-full">
			<svg viewBox="0 0 256 240" role="img" class="mx-auto aspect-square max-h-60 w-full">
			<path d="M128.0,24.0A96,96 0 0 1 128.0,216.0" fill="none" stroke="var(--color-safari)" stroke-width="14" stroke-linecap="round"><title>Safari: 200</title></path>
			<text x="128" y="118" text-anchor="middle" class="fill-foreground" font-size="34" font-weight="600" letter-spacing="-1">200</text>
			<text x="128" y="138" text-anchor="middle" class="fill-muted-foreground" font-size="12">Visitors</text>
			</svg>
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col items-center gap-1 px-6 pt-3.5 pb-5.5 text-center text-[13.5px]">
		<b class="inline-flex items-center gap-2 font-medium">
			Trending up by 5.2% this month
			<svg viewBox="0 0 24 24" class="size-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 7-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></svg>
		</b>
		<span class="text-muted-foreground">Showing total visitors for the last 6 months</span>
	</Card.Footer>
</Card.Root>
