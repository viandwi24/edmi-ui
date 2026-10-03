<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { useConnection } from "@xyflow/svelte";

	/** Line drawn while dragging from a handle: ring-colored bezier with an end dot. */
	const connection = useConnection();

	const HALF = 0.5;

	const line = $derived.by(() => {
		const { from, to, inProgress } = connection.current;
		if (!inProgress || !from || !to) return null;
		const controlX = from.x + (to.x - from.x) * HALF;
		return {
			from,
			to,
			d: `M${from.x},${from.y} C ${controlX},${from.y} ${controlX},${to.y} ${to.x},${to.y}`,
		};
	});
</script>

{#if line}
	<g data-slot="ai-connection">
		<path class="animated" d={line.d} fill="none" stroke="var(--ring)" stroke-linecap="round" stroke-width="1.6" />
		<circle cx={line.from.x} cy={line.from.y} r="4.5" fill="var(--card)" stroke="var(--ring)" stroke-width="1.6" />
		<circle cx={line.to.x} cy={line.to.y} r="3" fill="var(--ring)" />
	</g>
{/if}
