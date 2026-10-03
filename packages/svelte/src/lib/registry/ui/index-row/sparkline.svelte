<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { SVGAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		data,
		tone,
		width = 88,
		height = 28,
		...restProps
	}: Omit<SVGAttributes<SVGSVGElement>, "children" | "width" | "height"> & {
		ref?: SVGSVGElement | null;
		data: number[];
		/** Defaults to the direction of the series (last vs first). */
		tone?: "up" | "down";
		width?: number;
		height?: number;
	} = $props();

	const points = $derived.by(() => {
		const min = Math.min(...data);
		const max = Math.max(...data);
		const span = max - min || 1;
		const pad = 2;
		return data
			.map((v, i) => {
				const x = pad + (i / (data.length - 1)) * (width - pad * 2);
				const y = pad + (1 - (v - min) / span) * (height - pad * 2);
				return `${x.toFixed(1)},${y.toFixed(1)}`;
			})
			.join(" ");
	});
	const down = $derived(tone ? tone === "down" : (data.at(-1) ?? 0) < (data[0] ?? 0));
</script>

<!-- Tiny trend line. -->
{#if data.length >= 2}
	<svg
		bind:this={ref}
		data-slot="sparkline"
		{width}
		{height}
		viewBox="0 0 {width} {height}"
		fill="none"
		aria-hidden="true"
		class={cn("inline-block", down ? "text-destructive-text" : "text-brand-text", className)}
		{...restProps}
	>
		<polyline {points} stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
{/if}
