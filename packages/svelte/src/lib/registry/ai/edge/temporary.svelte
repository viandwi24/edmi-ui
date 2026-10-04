<script lang="ts">
	import { BaseEdge, type EdgeProps, getBezierPath } from "@xyflow/svelte";

	/** Conditional or error path: dotted, muted. */
	let {
		id,
		sourceX,
		sourceY,
		targetX,
		targetY,
		sourcePosition,
		targetPosition,
	}: EdgeProps = $props();

	const path = $derived(
		getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition })[0]
	);
</script>

<BaseEdge
	{id}
	{path}
	style="stroke: var(--muted-foreground-2); stroke-dasharray: 2 5; stroke-linecap: round;"
/>
