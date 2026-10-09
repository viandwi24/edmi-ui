<script lang="ts">
	import { Area, AreaChart } from "layerchart";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import * as Card from "@edmi-svelte/ui/card";
	import * as Chart from "@edmi-svelte/ui/chart";

	const data = [
		{ i: 0, month: "January", desktop: 186, mobile: 80 },
		{ i: 1, month: "February", desktop: 305, mobile: 200 },
		{ i: 2, month: "March", desktop: 237, mobile: 120 },
		{ i: 3, month: "April", desktop: 73, mobile: 190 },
		{ i: 4, month: "May", desktop: 209, mobile: 130 },
		{ i: 5, month: "June", desktop: 214, mobile: 140 },
	];

	const config = {
		desktop: { label: "Desktop", color: "var(--chart-1)" },
	} satisfies Chart.ChartConfig;

	// d3 `curveNatural` (natural cubic spline); d3-shape is not a dependency of the docs app.
	function controlPoints(p: number[]): [number[], number[]] {
		const n = p.length - 1;
		const a = new Array<number>(n);
		const b = new Array<number>(n);
		const r = new Array<number>(n);
		a[0] = 0;
		b[0] = 2;
		r[0] = p[0] + 2 * p[1];
		for (let i = 1; i < n - 1; ++i) {
			a[i] = 1;
			b[i] = 4;
			r[i] = 4 * p[i] + 2 * p[i + 1];
		}
		a[n - 1] = 2;
		b[n - 1] = 7;
		r[n - 1] = 8 * p[n - 1] + p[n];
		for (let i = 1; i < n; ++i) {
			const m = a[i] / b[i - 1];
			b[i] -= m;
			r[i] -= m * r[i - 1];
		}
		a[n - 1] = r[n - 1] / b[n - 1];
		for (let i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
		b[n - 1] = (p[n] + a[n - 1]) / 2;
		for (let i = 0; i < n - 1; ++i) b[i] = 2 * p[i + 1] - a[i + 1];
		return [a, b];
	}

	// biome-ignore lint/suspicious/noExplicitAny: d3 curve factory shape
	const curveNatural = (context: any) => {
		let line = Number.NaN;
		let xs: number[] = [];
		let ys: number[] = [];
		return {
			areaStart() {
				line = 0;
			},
			areaEnd() {
				line = Number.NaN;
			},
			lineStart() {
				xs = [];
				ys = [];
			},
			lineEnd() {
				const n = xs.length;
				if (n) {
					if (line) context.lineTo(xs[0], ys[0]);
					else context.moveTo(xs[0], ys[0]);
					if (n === 2) context.lineTo(xs[1], ys[1]);
					else if (n > 2) {
						const [px0, px1] = controlPoints(xs);
						const [py0, py1] = controlPoints(ys);
						for (let i = 0; i < n - 1; ++i) {
							context.bezierCurveTo(px0[i], py0[i], px1[i], py1[i], xs[i + 1], ys[i + 1]);
						}
					}
				}
				if (line || (line !== 0 && n === 1)) context.closePath();
				line = 1 - line;
			},
			point(px: number, py: number) {
				xs.push(+px);
				ys.push(+py);
			},
		};
	};

</script>

<Card.Root class="w-full max-w-sm gap-0 py-0">
	<Card.Header class="gap-1 px-6 pt-5.5 pb-0">
		<Card.Title class="font-semibold text-base tracking-[-0.2px]">Area Chart</Card.Title>
		<Card.Description class="text-[13.5px]">Showing total visitors for the last 6 months</Card.Description>
	</Card.Header>
	<Card.Content class="items-center px-5 pt-2.5 pb-0">
		<Chart.Container {config} class="aspect-auto h-44 w-full">
			<AreaChart
				{data}
				x="i"
				seriesLayout="overlap"
				series={[
					{ key: "desktop", label: config.desktop.label, color: "var(--color-desktop)" },
				]}
				padding={{ left: 12, right: 12, top: 4, bottom: 20 }}
				props={{
					xAxis: { format: (v: number) => data[v]?.month.slice(0, 3) ?? "", ticks: 6 },
					yAxis: { format: () => "" },
				}}
			>
				{#snippet marks({ context })}
					<defs>
			<linearGradient id="fill-desktop-default" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0" style="stop-color: var(--chart-1); stop-opacity: 0.26" />
				<stop offset="1" style="stop-color: var(--chart-1); stop-opacity: 0.03" />
			</linearGradient>
					</defs>
					{#each context.series.visibleSeries as s (s.key)}
						<Area
							seriesKey={s.key}
							curve={curveNatural}
							fill="url(#fill-{s.key}-default)"
							fillOpacity={1}
							line={{ class: "stroke-2" }}
						/>
					{/each}
				{/snippet}
				{#snippet tooltip()}
					<Chart.Tooltip indicator="line" labelFormatter={(v: number) => data[v]?.month ?? ""} />
				{/snippet}
			</AreaChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col items-stretch gap-1 px-6 pt-3.5 pb-5.5 text-[13.5px]">
		<b class="flex items-center gap-2 font-medium">
			Trending up by 5.2% this month
			<IconPlaceholder
				lucide="TrendingUpIcon"
				tabler="IconTrendingUp"
				hugeicons="AnalyticsUpIcon"
				phosphor="TrendUpIcon"
				remixicon="RiLineChartLine"
				class="size-4"
			/>
		</b>
		<span class="text-muted-foreground">January - June 2024</span>
	</Card.Footer>
</Card.Root>
