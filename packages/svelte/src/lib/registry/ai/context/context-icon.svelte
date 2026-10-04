<script lang="ts">
	import { useContextValue } from "./use-context.svelte.js";

	const ICON_RADIUS = 10;
	const ICON_VIEWBOX = 24;
	const ICON_CENTER = 12;
	const ICON_STROKE_WIDTH = 2;

	const context = useContextValue();
	const circumference = 2 * Math.PI * ICON_RADIUS;
	const dashOffset = $derived(
		circumference *
			(1 - (context.maxTokens === 0 ? 0 : Math.min(context.usedTokens / context.maxTokens, 1)))
	);
</script>

<svg
	aria-label="Model context usage"
	height="22"
	role="img"
	viewBox="0 0 {ICON_VIEWBOX} {ICON_VIEWBOX}"
	width="22"
>
	<title>Model context usage</title>
	<circle
		cx={ICON_CENTER}
		cy={ICON_CENTER}
		fill="none"
		r={ICON_RADIUS}
		class="stroke-border"
		stroke-width={ICON_STROKE_WIDTH}
	/>
	<circle
		cx={ICON_CENTER}
		cy={ICON_CENTER}
		fill="none"
		r={ICON_RADIUS}
		class="stroke-brand"
		stroke-dasharray="{circumference} {circumference}"
		stroke-dashoffset={dashOffset}
		stroke-linecap="round"
		stroke-width={ICON_STROKE_WIDTH}
		style="transform: rotate(-90deg); transform-origin: center"
	/>
</svg>
