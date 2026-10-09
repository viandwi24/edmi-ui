<script lang="ts">
	import { LineChart } from "layerchart";
	import * as Card from "@edmi-svelte/ui/card";
	import * as Chart from "@edmi-svelte/ui/chart";

	type Key = "desktop" | "mobile";

	const desktop = [
		223, 243, 240, 188, 168, 232, 245, 275, 233, 205, 197, 257, 283, 292, 225, 151, 179, 227,
		259, 230, 215, 159, 189, 219, 226, 189, 161, 155, 198, 190, 185, 174, 142, 145, 157, 180,
		155, 145, 145, 172, 182, 169, 204, 167, 138, 183, 213, 205, 203, 162, 152, 227, 263, 260,
		216, 157, 199, 255, 269, 262, 217, 143, 221, 278, 256, 241, 191, 185, 216, 229, 227, 229,
		164, 190, 204, 219, 218, 195, 157, 187, 178, 200, 166, 182, 143, 169, 192, 184, 159, 142,
		154,
	];

	const mobile = [
		168, 206, 170, 122, 151, 195, 160, 179, 197, 169, 126, 182, 229, 203, 142, 138, 168, 153,
		167, 193, 178, 107, 141, 193, 170, 121, 140, 157, 141, 126, 166, 159, 100, 113, 158, 149,
		102, 127, 152, 131, 120, 153, 178, 116, 105, 171, 171, 130, 154, 162, 124, 143, 201, 212,
		146, 112, 177, 198, 167, 183, 192, 123, 139, 206, 211, 163, 128, 167, 180, 147, 159, 198,
		139, 122, 161, 192, 154, 128, 148, 168, 121, 141, 162, 153, 96, 138, 178, 139, 106, 137,
		152,
	];

	// Apr 1 to Jun 30
	const rows = desktop.map((d, i) => ({
		i,
		date: Date.UTC(2024, 3, 1 + i),
		desktop: d,
		mobile: mobile[i],
	}));

	const config = {
		views: { label: "Page Views" },
		desktop: { label: "Desktop", color: "var(--chart-1)" },
		mobile: { label: "Mobile", color: "var(--chart-2)" },
	} satisfies Chart.ChartConfig;

	const keys: Key[] = ["desktop", "mobile"];
	let active = $state<Key>("desktop");
	const total = {
		desktop: rows.reduce((sum, d) => sum + d.desktop, 0),
		mobile: rows.reduce((sum, d) => sum + d.mobile, 0),
	};
	// One "views" value per row: the tooltip row is always "Page Views".
	const data = $derived(rows.map((r) => ({ i: r.i, date: r.date, views: r[active] })));

	const formatDate = (i: number) =>
		new Date(rows[i]?.date ?? 0).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			timeZone: "UTC",
		});
</script>

<Card.Root class="w-full gap-0 py-0">
	<div class="flex items-stretch justify-between border-border border-b">
		<div class="flex flex-col justify-center gap-1 px-6 pt-5.5 pb-4.5">
			<Card.Title class="font-semibold text-base tracking-[-0.2px]">Line Chart - Interactive</Card.Title>
			<Card.Description class="text-[13.5px]">Showing total visitors for the last 3 months</Card.Description>
		</div>
		<div class="flex">
			{#each keys as key (key)}
				<Chart.StatWell active={active === key} onclick={() => (active = key)}>
					{config[key].label}
					<b>{total[key].toLocaleString()}</b>
				</Chart.StatWell>
			{/each}
		</div>
	</div>
	<Card.Content class="items-center px-5 pt-5 pb-5">
		<Chart.Container {config} class="aspect-auto h-64 w-full">
			<LineChart
				{data}
				x="i"
				series={[{ key: "views", label: "Page Views", color: `var(--color-${active})` }]}
				padding={{ left: 12, right: 12, bottom: 24 }}
				props={{
					spline: { strokeWidth: 2 },
					xAxis: { format: formatDate, ticks: 6 },
					yAxis: { format: () => "", ticks: 3 },
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip labelFormatter={formatDate} />
				{/snippet}
			</LineChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
