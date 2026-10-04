<script lang="ts">
	import { Canvas } from "@edmi-svelte/ai/canvas";
	import Step from "./_shared/ai-workflow-step.svelte";

	const nodeTypes = { step: Step };

	let nodes = $state.raw([
		{ id: "check", type: "step", position: { x: 0, y: 0 }, data: { title: "Check drift", description: "Tool · get_prices", body: "MAG4 drift: 2.4%", footer: "412 ms", raised: true, handles: { target: true, source: true } } },
	]);
	let edges = $state.raw([]);
</script>

<div style="height: 224px" class="w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
	<Canvas bind:nodes bind:edges {nodeTypes} fitViewOptions={{ maxZoom: 1, padding: 0.4 }} />
</div>
