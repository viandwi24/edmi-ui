<script lang="ts">
	import * as Card from "@edmi-svelte/ui/card";
	import * as Chart from "@edmi-svelte/ui/chart";

	const config = {
		chrome: { label: "Chrome", color: "var(--chart-1)" },
		safari: { label: "Safari", color: "var(--chart-2)" },
		firefox: { label: "Firefox", color: "var(--chart-3)" },
		edge: { label: "Edge", color: "var(--chart-4)" },
		other: { label: "Other", color: "var(--chart-5)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="w-full max-w-sm gap-0 py-0">
	<Card.Header class="items-center gap-1 px-6 pt-5.5 pb-0 text-center">
		<Card.Title class="font-semibold text-base tracking-[-0.2px]">Radial Chart</Card.Title>
		<Card.Description class="text-[13.5px]">January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content class="flex-1 items-center px-5 pt-2.5 pb-0">
		<Chart.Container {config} class="aspect-auto h-auto w-full">
			<svg viewBox="0 0 256 240" role="img" class="mx-auto aspect-square max-h-60 w-full">
			<path d="M128.0,12.0A108,108 0 1 1 20.0,120.0" fill="none" stroke="color-mix(in srgb,var(--foreground) 7%,var(--card))" stroke-width="14" stroke-linecap="round" />
			<path d="M128.0,12.0A108,108 0 1 1 20.0,120.0" fill="none" stroke="var(--color-chrome)" stroke-width="14" stroke-linecap="round"><title>Chrome: 275</title></path>
			<path d="M128.0,30.0A90,90 0 1 1 38.0,120.0" fill="none" stroke="color-mix(in srgb,var(--foreground) 7%,var(--card))" stroke-width="14" stroke-linecap="round" />
			<path d="M128.0,30.0A90,90 0 1 1 102.6,206.4" fill="none" stroke="var(--color-safari)" stroke-width="14" stroke-linecap="round"><title>Safari: 200</title></path>
			<path d="M128.0,48.0A72,72 0 1 1 56.0,120.0" fill="none" stroke="color-mix(in srgb,var(--foreground) 7%,var(--card))" stroke-width="14" stroke-linecap="round" />
			<path d="M128.0,48.0A72,72 0 1 1 123.5,191.9" fill="none" stroke="var(--color-firefox)" stroke-width="14" stroke-linecap="round"><title>Firefox: 187</title></path>
			<path d="M128.0,66.0A54,54 0 1 1 74.0,120.0" fill="none" stroke="color-mix(in srgb,var(--foreground) 7%,var(--card))" stroke-width="14" stroke-linecap="round" />
			<path d="M128.0,66.0A54,54 0 0 1 137.5,173.2" fill="none" stroke="var(--color-edge)" stroke-width="14" stroke-linecap="round"><title>Edge: 173</title></path>
			<path d="M128.0,84.0A36,36 0 1 1 92.0,120.0" fill="none" stroke="color-mix(in srgb,var(--foreground) 7%,var(--card))" stroke-width="14" stroke-linecap="round" />
			<path d="M128.0,84.0A36,36 0 0 1 164.0,119.0" fill="none" stroke="var(--color-other)" stroke-width="14" stroke-linecap="round"><title>Other: 90</title></path>
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
