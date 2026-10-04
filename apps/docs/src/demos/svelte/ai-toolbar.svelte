<script lang="ts">
	import { Canvas } from "@edmi-svelte/ai/canvas";
	import Step from "./_shared/ai-workflow-step.svelte";

	const nodeTypes = { step: Step };

	let nodes = $state.raw([
		{ id: "decision", type: "step", position: { x: 0, y: 40 }, selected: true, data: { title: "Decision", description: "drift > 2%?", badges: ["yes"], toolbar: true, handles: { target: true, source: true } } },
	]);
	let edges = $state.raw([]);
</script>

<div style="height: 256px" class="w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
	<Canvas bind:nodes bind:edges {nodeTypes} fitViewOptions={{ maxZoom: 1, padding: 0.4 }} />
</div>
