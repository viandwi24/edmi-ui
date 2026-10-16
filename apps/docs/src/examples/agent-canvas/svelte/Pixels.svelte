<script lang="ts">
	import type { Rect } from "../data";

	/** Decorative pixel art drawn from the rect lists in data.ts. */
	let { w, h, rects, class: className }: { w: number; h: number; rects: Rect[]; class?: string } = $props();
</script>

<svg viewBox="0 0 {w} {h}" shape-rendering="crispEdges" preserveAspectRatio="xMidYMid slice" aria-hidden="true" class={className}>
	{#each rects as r, i (i)}
		<rect x={r.x} y={r.y} width={r.w} height={r.h} fill={r.c} />
	{/each}
</svg>
