<script lang="ts">
	import { BarChart } from "layerchart";
	import * as Card from "@edmi-svelte/ui/card";
	import * as Chart from "@edmi-svelte/ui/chart";

	const daily = [
		{ date: "2024-04-01", desktop: 252, mobile: 342 },
		{ date: "2024-04-02", desktop: 254, mobile: 260 },
		{ date: "2024-04-03", desktop: 305, mobile: 300 },
		{ date: "2024-04-04", desktop: 322, mobile: 338 },
		{ date: "2024-04-05", desktop: 321, mobile: 313 },
		{ date: "2024-04-06", desktop: 283, mobile: 279 },
		{ date: "2024-04-07", desktop: 290, mobile: 371 },
		{ date: "2024-04-08", desktop: 351, mobile: 384 },
		{ date: "2024-04-09", desktop: 384, mobile: 338 },
		{ date: "2024-04-10", desktop: 302, mobile: 346 },
		{ date: "2024-04-11", desktop: 337, mobile: 360 },
		{ date: "2024-04-12", desktop: 307, mobile: 261 },
		{ date: "2024-04-13", desktop: 254, mobile: 273 },
		{ date: "2024-04-14", desktop: 214, mobile: 315 },
		{ date: "2024-04-15", desktop: 244, mobile: 362 },
		{ date: "2024-04-16", desktop: 252, mobile: 280 },
		{ date: "2024-04-17", desktop: 277, mobile: 222 },
		{ date: "2024-04-18", desktop: 311, mobile: 242 },
		{ date: "2024-04-19", desktop: 185, mobile: 242 },
		{ date: "2024-04-20", desktop: 247, mobile: 210 },
		{ date: "2024-04-21", desktop: 194, mobile: 253 },
		{ date: "2024-04-22", desktop: 159, mobile: 243 },
		{ date: "2024-04-23", desktop: 222, mobile: 190 },
		{ date: "2024-04-24", desktop: 237, mobile: 227 },
		{ date: "2024-04-25", desktop: 235, mobile: 160 },
		{ date: "2024-04-26", desktop: 211, mobile: 180 },
		{ date: "2024-04-27", desktop: 192, mobile: 143 },
		{ date: "2024-04-28", desktop: 235, mobile: 206 },
		{ date: "2024-04-29", desktop: 234, mobile: 223 },
		{ date: "2024-04-30", desktop: 212, mobile: 196 },
		{ date: "2024-05-01", desktop: 210, mobile: 270 },
		{ date: "2024-05-02", desktop: 283, mobile: 224 },
		{ date: "2024-05-03", desktop: 249, mobile: 254 },
		{ date: "2024-05-04", desktop: 238, mobile: 174 },
		{ date: "2024-05-05", desktop: 223, mobile: 205 },
		{ date: "2024-05-06", desktop: 250, mobile: 260 },
		{ date: "2024-05-07", desktop: 306, mobile: 345 },
		{ date: "2024-05-08", desktop: 287, mobile: 243 },
		{ date: "2024-05-09", desktop: 288, mobile: 326 },
		{ date: "2024-05-10", desktop: 371, mobile: 327 },
		{ date: "2024-05-11", desktop: 320, mobile: 323 },
		{ date: "2024-05-12", desktop: 354, mobile: 301 },
		{ date: "2024-05-13", desktop: 378, mobile: 374 },
		{ date: "2024-05-14", desktop: 386, mobile: 383 },
		{ date: "2024-05-15", desktop: 310, mobile: 375 },
		{ date: "2024-05-16", desktop: 365, mobile: 290 },
		{ date: "2024-05-17", desktop: 373, mobile: 358 },
		{ date: "2024-05-18", desktop: 347, mobile: 326 },
		{ date: "2024-05-19", desktop: 350, mobile: 264 },
		{ date: "2024-05-20", desktop: 276, mobile: 266 },
		{ date: "2024-05-21", desktop: 347, mobile: 219 },
		{ date: "2024-05-22", desktop: 231, mobile: 371 },
		{ date: "2024-05-23", desktop: 240, mobile: 310 },
		{ date: "2024-05-24", desktop: 253, mobile: 342 },
		{ date: "2024-05-25", desktop: 231, mobile: 255 },
		{ date: "2024-05-26", desktop: 190, mobile: 223 },
		{ date: "2024-05-27", desktop: 214, mobile: 272 },
		{ date: "2024-05-28", desktop: 285, mobile: 194 },
		{ date: "2024-05-29", desktop: 181, mobile: 235 },
		{ date: "2024-05-30", desktop: 223, mobile: 210 },
		{ date: "2024-05-31", desktop: 171, mobile: 155 },
		{ date: "2024-06-01", desktop: 244, mobile: 249 },
		{ date: "2024-06-02", desktop: 225, mobile: 252 },
		{ date: "2024-06-03", desktop: 181, mobile: 170 },
		{ date: "2024-06-04", desktop: 188, mobile: 198 },
		{ date: "2024-06-05", desktop: 177, mobile: 209 },
		{ date: "2024-06-06", desktop: 155, mobile: 207 },
		{ date: "2024-06-07", desktop: 171, mobile: 163 },
		{ date: "2024-06-08", desktop: 244, mobile: 232 },
		{ date: "2024-06-09", desktop: 208, mobile: 217 },
		{ date: "2024-06-10", desktop: 185, mobile: 293 },
		{ date: "2024-06-11", desktop: 233, mobile: 272 },
		{ date: "2024-06-12", desktop: 252, mobile: 336 },
		{ date: "2024-06-13", desktop: 334, mobile: 282 },
		{ date: "2024-06-14", desktop: 329, mobile: 265 },
		{ date: "2024-06-15", desktop: 342, mobile: 260 },
		{ date: "2024-06-16", desktop: 333, mobile: 339 },
		{ date: "2024-06-17", desktop: 385, mobile: 328 },
		{ date: "2024-06-18", desktop: 345, mobile: 266 },
		{ date: "2024-06-19", desktop: 321, mobile: 362 },
		{ date: "2024-06-20", desktop: 336, mobile: 272 },
		{ date: "2024-06-21", desktop: 289, mobile: 342 },
		{ date: "2024-06-22", desktop: 306, mobile: 340 },
		{ date: "2024-06-23", desktop: 296, mobile: 286 },
		{ date: "2024-06-24", desktop: 287, mobile: 269 },
		{ date: "2024-06-25", desktop: 353, mobile: 313 },
		{ date: "2024-06-26", desktop: 290, mobile: 291 },
		{ date: "2024-06-27", desktop: 305, mobile: 325 },
		{ date: "2024-06-28", desktop: 380, mobile: 381 },
		{ date: "2024-06-29", desktop: 302, mobile: 261 },
		{ date: "2024-06-30", desktop: 279, mobile: 297 },
	];

	const config = {
		views: { label: "Page Views", color: "var(--chart-1)" },
	} satisfies Chart.ChartConfig;

	const labels = { desktop: "Desktop", mobile: "Mobile" } as const;
	const keys = ["desktop", "mobile"] as const;
	const totals = {
		desktop: daily.reduce((sum, d) => sum + d.desktop, 0),
		mobile: daily.reduce((sum, d) => sum + d.mobile, 0),
	};

	let active = $state<"desktop" | "mobile">("desktop");
	const data = $derived(daily.map((d) => ({ date: d.date, views: d[active] })));
	const ticks = daily.filter((_, i) => i % 5 === 4).map((d) => d.date);

	const formatDate = (v: string) =>
		new Date(v).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
</script>

<Card.Root class="w-full max-w-4xl gap-0 py-0">
	<div class="flex flex-col items-stretch border-b sm:flex-row">
		<div class="flex flex-1 flex-col justify-center gap-1 px-6 py-5">
			<Card.Title class="font-semibold text-base tracking-[-0.2px]">Bar Chart - Interactive</Card.Title>
			<Card.Description class="text-[13.5px]">Showing total visitors for the last 3 months</Card.Description>
		</div>
		<div class="flex">
			{#each keys as key (key)}
				<Chart.StatWell active={active === key} onclick={() => (active = key)}>
					{labels[key]}
					<b>{totals[key].toLocaleString()}</b>
				</Chart.StatWell>
			{/each}
		</div>
	</div>
	<Card.Content class="px-5 pt-5 pb-5">
		<Chart.Container {config} class="aspect-auto h-60 w-full [&_.lc-bar]:stroke-none">
			<BarChart
				{data}
				x="date"
				series={[{ key: "views", label: config.views.label, color: "var(--color-views)" }]}
				bandPadding={0.2}
				grid={{ x: false }}
				props={{
					bars: { radius: 2, rounded: "top" },
					xAxis: { format: formatDate, ticks },
					yAxis: { format: () => "" },
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip indicator="dot" labelFormatter={formatDate} />
				{/snippet}
			</BarChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
