<script lang="ts">
	import { PieChart } from "layerchart";
	import * as Card from "@edmi-svelte/ui/card";
	import * as Chart from "@edmi-svelte/ui/chart";

	const config = {
		nvdax: { label: "NVDAx", color: "var(--chart-1)" },
		msftx: { label: "MSFTx", color: "var(--chart-2)" },
		aaplx: { label: "AAPLx", color: "var(--chart-3)" },
		anthrp: { label: "ANTHRP-pre", color: "var(--chart-4)" },
	} satisfies Chart.ChartConfig;

	const data = [
		{ token: "nvdax", weight: 32 },
		{ token: "msftx", weight: 28 },
		{ token: "aaplx", weight: 24 },
		{ token: "anthrp", weight: 16 },
	].map((d) => ({
		...d,
		name: config[d.token as keyof typeof config].label,
		color: config[d.token as keyof typeof config].color,
	}));
</script>

<Card.Root class="w-full max-w-sm gap-0 py-0">
	<Card.Header class="gap-1 px-6 pt-5.5 pb-0">
		<Card.Title class="font-semibold text-base tracking-[-0.2px]">Allocation</Card.Title>
		<Card.Description class="text-[13.5px]">MAG4 weights</Card.Description>
	</Card.Header>
	<Card.Content class="items-center px-5 pt-2.5 pb-0">
		<Chart.Container {config} class="aspect-auto h-60 w-full">
			<PieChart
				{data}
				key="token"
				label="name"
				value="weight"
				c="color"
				innerRadius={-26}
				padAngle={0.02}
				legend
				props={{ pie: { motion: "tween" } }}
			>
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel nameKey="token" indicator="dashed" />
				{/snippet}
			</PieChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
