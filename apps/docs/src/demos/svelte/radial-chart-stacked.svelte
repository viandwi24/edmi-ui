<script lang="ts">
	import * as Card from "@edmi-svelte/ui/card";
	import * as Chart from "@edmi-svelte/ui/chart";

	const config = {
		desktop: { label: "Desktop", color: "var(--chart-1)" },
		mobile: { label: "Mobile", color: "var(--chart-2)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="w-full max-w-sm gap-0 py-0">
	<Card.Header class="items-center gap-1 px-6 pt-5.5 pb-0 text-center">
		<Card.Title class="font-semibold text-base tracking-[-0.2px]">Radial Chart - Stacked</Card.Title>
		<Card.Description class="text-[13.5px]">January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content class="flex-1 items-center px-5 pt-2.5 pb-0">
		<Chart.Container {config} class="aspect-auto h-auto w-full flex-col">
			<svg viewBox="0 0 256 210" role="img" class="mx-auto aspect-[256/210] max-h-52 w-full">
			<path d="M28.0,140.0A100,100 0 0 1 183.0,56.5" fill="none" stroke="var(--color-desktop)" stroke-width="22"><title>Desktop: 1,260</title></path>
			<path d="M184.7,57.6A100,100 0 0 1 228.0,140.0" fill="none" stroke="var(--color-mobile)" stroke-width="22"><title>Mobile: 570</title></path>
			<text x="128" y="120" text-anchor="middle" class="fill-foreground" font-size="28" font-weight="600" letter-spacing="-1">1,830</text>
			<text x="128" y="140" text-anchor="middle" class="fill-muted-foreground" font-size="12">Visitors</text>
			</svg>
			<div data-slot="chart-legend" class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 pt-2.5 text-[12.5px] text-foreground-2">
				{#each ["desktop", "mobile"] as const as key (key)}
					<div class="flex items-center gap-1.5">
						<div class="size-2 shrink-0 rounded-[2px]" style="background-color: var(--color-{key})"></div>
						{config[key].label}
					</div>
				{/each}
			</div>
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
