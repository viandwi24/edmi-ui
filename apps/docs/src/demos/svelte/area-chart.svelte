<script lang="ts">
	import { Area, AreaChart } from "layerchart";
	import * as Card from "@edmi-svelte/ui/card";
	import * as Chart from "@edmi-svelte/ui/chart";
	import { Select, SelectContent, SelectItem, SelectTrigger } from "@edmi-svelte/ui/select";

	// 91 days (Apr 1 - Jun 30, 2024) of sample visitors.
	const all = Array.from({ length: 91 }, (_, i) => {
		const date = new Date(Date.UTC(2024, 3, 1 + i)).toISOString().slice(0, 10);
		const desktop = Math.round(
			220 + 110 * Math.sin(i / 3.1) + 70 * Math.sin(i / 7.3 + 1) + (i % 5) * 9,
		);
		const mobile = Math.round(
			170 + 90 * Math.sin(i / 2.7 + 2) + 60 * Math.cos(i / 6.1) + (i % 4) * 11,
		);
		return { date, desktop, mobile };
	});

	const config = {
		desktop: { label: "Desktop", color: "var(--chart-1)" },
		mobile: { label: "Mobile", color: "var(--chart-2)" },
	} satisfies Chart.ChartConfig;

	const ranges: Record<string, { label: string; days: number }> = {
		"90d": { label: "Last 3 months", days: 90 },
		"30d": { label: "Last 30 days", days: 30 },
		"7d": { label: "Last 7 days", days: 7 },
	};
	let range = $state("90d");
	const data = $derived(all.slice(-ranges[range].days).map((d, i) => ({ ...d, i })));
	const label = (i: number) =>
		new Date(`${data[Math.round(i)]?.date}`).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			timeZone: "UTC",
		});

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

<Card.Root class="w-full max-w-3xl gap-0 py-0">
	<Card.Header class="gap-1 border-b px-6 pt-5.5 pb-5.5">
		<Card.Title class="font-semibold text-base tracking-[-0.2px]">Area Chart - Interactive</Card.Title>
		<Card.Description class="text-[13.5px]">Showing total visitors for the last 3 months</Card.Description>
		<Card.Action class="self-center">
			<Select type="single" bind:value={range}>
				<SelectTrigger class="w-40" aria-label="Select a range">
					{ranges[range].label}
				</SelectTrigger>
				<SelectContent>
					{#each Object.entries(ranges) as [value, r]}
						<SelectItem {value} label={r.label} />
					{/each}
				</SelectContent>
			</Select>
		</Card.Action>
	</Card.Header>
	<Card.Content class="items-center px-5 pt-2.5 pb-4">
		<Chart.Container {config} class="aspect-auto h-64 w-full">
			<AreaChart
				{data}
				x="i"
				seriesLayout="overlap"
				legend
				series={[
					{ key: "desktop", label: config.desktop.label, color: "var(--color-desktop)" },
					{ key: "mobile", label: config.mobile.label, color: "var(--color-mobile)" },
				]}
				padding={{ left: 12, right: 12, top: 4, bottom: 20 }}
				props={{
					xAxis: { format: (v: number) => label(v), ticks: range === "7d" ? 7 : 8 },
					yAxis: { format: () => "" },
				}}
			>
				{#snippet marks({ context })}
					<defs>
						<linearGradient id="fill-desktop-main" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0" style="stop-color: var(--chart-1); stop-opacity: 0.26" />
							<stop offset="1" style="stop-color: var(--chart-1); stop-opacity: 0.03" />
						</linearGradient>
						<linearGradient id="fill-mobile-main" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0" style="stop-color: var(--chart-2); stop-opacity: 0.26" />
							<stop offset="1" style="stop-color: var(--chart-2); stop-opacity: 0.03" />
						</linearGradient>
					</defs>
					{#each context.series.visibleSeries as s (s.key)}
						<Area
							seriesKey={s.key}
							curve={curveNatural}
							fill="url(#fill-{s.key}-main)"
							fillOpacity={1}
							line={{ class: "stroke-2" }}
						/>
					{/each}
				{/snippet}
				{#snippet tooltip()}
					<Chart.Tooltip indicator="dot" labelFormatter={(v: number) => label(v)} />
				{/snippet}
			</AreaChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
