<script lang="ts">
	import { BaseEdge, type EdgeProps, getBezierPath } from "@xyflow/svelte";

	/** Active data flow: brand dashes that move toward the target. */
	let {
		id,
		sourceX,
		sourceY,
		targetX,
		targetY,
		sourcePosition,
		targetPosition,
		markerEnd,
	}: EdgeProps = $props();

	const path = $derived(
		getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition })[0]
	);
</script>

<BaseEdge
	{id}
	{path}
	{markerEnd}
	style="stroke: var(--brand); stroke-dasharray: 6 5; stroke-linecap: round; animation: dashdraw 0.6s linear infinite;"
/>
