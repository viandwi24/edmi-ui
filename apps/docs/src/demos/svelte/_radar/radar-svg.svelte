<script lang="ts">
	// Docs helper (not a demo): LayerChart radial charts need d3 scales, so the radar is plain SVG inside
	// Chart.Container. Geometry and styling follow refs/edmi-ui/reference/ChartRadar*.dc.html.
	type Series = { key: string; label: string; color: string; values: number[] };

	let {
		axes,
		series,
		max = 400,
		grid = "polygon",
		radialLines = true,
		dots = false,
		fillOpacity = 0.18,
		customLabel = false,
		cy = 135,
		radius = 88,
		height = 262,
		tooltipIndicator = "line",
	}: {
		axes: string[];
		series: Series[];
		max?: number;
		/** polygon | circle | custom (two polygon rings) | none */
		grid?: "polygon" | "circle" | "custom" | "none";
		radialLines?: boolean;
		dots?: boolean;
		fillOpacity?: number;
		/** custom: label is "<value> (<axis>)" with a bold value */
		customLabel?: boolean;
		cy?: number;
		radius?: number;
		height?: number;
		tooltipIndicator?: "line" | "dot";
	} = $props();

	const W = 256;
	const CX = W / 2;
	const n = $derived(axes.length);
	const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
	const pt = (i: number, r: number) => ({
		x: CX + r * Math.cos(angle(i)),
		y: cy + r * Math.sin(angle(i)),
	});
	const f = (v: number) => v.toFixed(1);
	const poly = (r: number) =>
		Array.from({ length: n }, (_, i) => {
			const p = pt(i, r);
			return `${f(p.x)},${f(p.y)}`;
		}).join(" ");

	const rings = $derived(
		grid === "none" ? [] : grid === "custom" ? [radius / 2, radius] : [radius / 3, (2 * radius) / 3, radius],
	);
	const spokes = $derived(
		grid === "none" || !radialLines ? [] : Array.from({ length: n }, (_, i) => pt(i, radius)),
	);
	const shapes = $derived(
		series.map((s) => {
			const points = s.values.map((v, i) => pt(i, (Math.min(v, max) / max) * radius));
			return { ...s, points, path: points.map((p) => `${f(p.x)},${f(p.y)}`).join(" ") };
		}),
	);
	const labels = $derived(
		axes.map((axis, i) => {
			const r = radius + 16;
			const a = angle(i);
			const cos = Math.cos(a);
			return {
				axis,
				value: series[0]?.values[i],
				x: CX + r * cos,
				y: cy + r * Math.sin(a) + 4 - (customLabel ? 3 : 0),
				anchor: cos > 0.1 ? "start" : cos < -0.1 ? "end" : "middle",
			};
		}),
	);

	let hover = $state<{ i: number; x: number; y: number } | null>(null);
	function onMove(e: PointerEvent) {
		const el = e.currentTarget as SVGSVGElement;
		const rect = el.getBoundingClientRect();
		const scale = rect.width / W;
		const dx = (e.clientX - rect.left) / scale - CX;
		const dy = (e.clientY - rect.top) / scale - cy;
		let a = Math.atan2(dy, dx) + Math.PI / 2;
		a = (a + 2 * Math.PI) % (2 * Math.PI);
		const i = Math.round(a / ((2 * Math.PI) / n)) % n;
		hover = { i, x: e.clientX - rect.left + 12, y: e.clientY - rect.top + 12 };
	}
	const gridStroke = "color-mix(in srgb,var(--border) 75%,var(--card))";
</script>

<div class="relative mx-auto w-full max-w-64" style:aspect-ratio="{W} / {height}">
	<svg
		viewBox="0 0 {W} {height}"
		class="size-full overflow-visible"
		role="img"
		aria-label="Radar chart"
		onpointermove={onMove}
		onpointerleave={() => (hover = null)}
	>
		{#if grid === "circle"}
			{#each rings as r (r)}
				<circle cx={CX} {cy} {r} fill="none" stroke={gridStroke} />
			{/each}
		{:else}
			{#each rings as r (r)}
				<polygon points={poly(r)} fill="none" stroke={gridStroke} />
			{/each}
		{/if}
		{#each spokes as p, i (i)}
			<line x1={CX} y1={cy} x2={p.x} y2={p.y} stroke={gridStroke} />
		{/each}
		{#each shapes as s (s.key)}
			<polygon
				points={s.path}
				fill={s.color}
				fill-opacity={fillOpacity}
				stroke={s.color}
				stroke-width="2"
				stroke-linejoin="round"
			/>
			{#if dots}
				{#each s.points as p, i (i)}
					<circle cx={p.x} cy={p.y} r="4" fill={s.color} stroke="var(--card)" stroke-width="2" />
				{/each}
			{/if}
		{/each}
		{#each labels as l, i (i)}
			<text x={l.x} y={l.y} text-anchor={l.anchor} class="fill-muted-foreground text-xs">
				{#if customLabel}
					<tspan class="fill-foreground font-semibold">{l.value}</tspan><tspan> ({l.axis})</tspan>
				{:else}
					{l.axis}
				{/if}
			</text>
		{/each}
	</svg>
	{#if hover}
		<div
			class="pointer-events-none absolute z-10 grid min-w-32 gap-1.5 rounded-lg border border-border bg-popover px-3 py-2 text-popover-foreground text-xs shadow-floating"
			style:left="{hover.x}px"
			style:top="{hover.y}px"
		>
			<div class="font-medium text-foreground">{axes[hover.i]}</div>
			{#each series as s (s.key)}
				<div class="flex items-center gap-2">
					<span
						class={tooltipIndicator === "line"
							? "min-h-3.5 w-1 self-stretch rounded-[2px]"
							: "size-2 shrink-0 rounded-[2px]"}
						style:background-color={s.color}
					></span>
					<span class="flex-1 text-muted-foreground">{s.label}</span>
					<span class="ml-3 font-semibold text-foreground tabular-nums">{s.values[hover.i].toLocaleString()}</span>
				</div>
			{/each}
		</div>
	{/if}
</div>
