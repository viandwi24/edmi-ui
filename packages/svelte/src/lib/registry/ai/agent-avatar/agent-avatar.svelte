<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { SVGAttributes } from "svelte/elements";
	import { agentAvatarCells } from "./identicon.js";

	let {
		seed,
		color,
		size = 40,
		tile = true,
		label,
		class: className,
		...restProps
	}: Omit<SVGAttributes<SVGSVGElement>, "color"> & {
		/** Agent id: the same seed always draws the same mark. */
		seed: string;
		/** `chart-1` to `chart-5`, or any CSS color. Defaults to a chart token picked from the seed. */
		color?: string;
		/** Pixel size of the square. */
		size?: number;
		/** Muted rounded tile behind the mark (default). `false` draws the bare mark. */
		tile?: boolean;
		/** Accessible name; the mark is decorative when omitted. */
		label?: string;
	} = $props();

	const data = $derived(agentAvatarCells(seed));
	const fill = $derived(
		color
			? /^chart-[1-5]$/.test(color)
				? `var(--${color})`
				: color
			: `var(--chart-${data.chart})`
	);
	const inner = $derived(tile ? size * 0.62 : size);
	const offset = $derived(tile ? size * 0.19 : 0);
	const cell = $derived(inner * 0.17);
	const step = $derived((inner - cell) / 4);
</script>

<svg
	data-slot="ai-agent-avatar"
	width={size}
	height={size}
	viewBox="0 0 {size} {size}"
	role={label ? "img" : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : true}
	class={cn("shrink-0", className)}
	{...restProps}
>
	{#if tile}
		<rect
			x={0.5}
			y={0.5}
			width={size - 1}
			height={size - 1}
			rx={size * 0.28}
			fill="var(--muted)"
			stroke="var(--border)"
		/>
	{/if}
	{#each data.cells as c (`${c.x}-${c.y}`)}
		<rect
			x={offset + c.x * step}
			y={offset + c.y * step}
			width={cell}
			height={cell}
			rx={cell * 0.17}
			{fill}
			opacity={c.opacity}
		/>
	{/each}
</svg>
