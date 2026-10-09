<script lang="ts">
	import { BarChart } from "layerchart";
	import * as Card from "@edmi-svelte/ui/card";
	import * as Chart from "@edmi-svelte/ui/chart";

	const data = [
		{ date: "2024-07-15", running: 450, swimming: 300 },
		{ date: "2024-07-16", running: 380, swimming: 420 },
		{ date: "2024-07-17", running: 520, swimming: 120 },
		{ date: "2024-07-18", running: 140, swimming: 550 },
		{ date: "2024-07-19", running: 600, swimming: 350 },
		{ date: "2024-07-20", running: 480, swimming: 400 },
	];

	const config = {
		running: { label: "Running", color: "var(--chart-1)" },
		swimming: { label: "Swimming", color: "var(--chart-2)" },
	} satisfies Chart.ChartConfig;

	const weekday = (date: string) =>
		new Date(date).toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });

</script>

{#snippet formatter({ name, value, item })}
	<div class="size-2 shrink-0 rounded-[2px] bg-(--color-bg)" style="--color-bg: {item.key === "running" ? config.running.color : config.swimming.color}"></div>
	<span class="flex-1 text-muted-foreground">{name}</span>
	<span class="ml-3 flex items-baseline gap-0.5 font-semibold text-foreground tabular-nums">
		{value}
		<span class="font-normal text-muted-foreground">kcal</span>
	</span>
{/snippet}

<Card.Root class="w-full max-w-sm gap-0 py-0">
	<Card.Header class="gap-1 px-6 pt-5.5 pb-0">
		<Card.Title class="font-semibold text-base tracking-[-0.2px]">Tooltip - Formatter</Card.Title>
		<Card.Description class="text-[13.5px]">Tooltip with custom formatter.</Card.Description>
	</Card.Header>
	<Card.Content class="items-center px-5 pt-2.5 pb-4">
		<Chart.Container {config} class="aspect-auto h-44 w-full">
			<BarChart
				{data}
				x="date"
				seriesLayout="stack"
				bandPadding={0.35}
				series={[
					{ key: "running", label: config.running.label, color: "var(--color-running)" },
					{ key: "swimming", label: config.swimming.label, color: "var(--color-swimming)" },
				]}
				props={{
					bars: { radius: 4, rounded: "edge", stroke: "var(--card)", strokeWidth: 2 },
					xAxis: { format: (v: string) => weekday(v) },
					yAxis: { format: () => "" },
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip labelFormatter={(value: string) => weekday(value)} {formatter} />
				{/snippet}
			</BarChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
