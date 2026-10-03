<script lang="ts">
	import { Canvas } from "@edmi-svelte/ai/canvas";
	import Step from "./_shared/ai-workflow-step.svelte";

	const nodeTypes = { step: Step };

	let nodes = $state.raw([
		{ id: "check", type: "step", position: { x: 0, y: 0 }, data: { title: "Check drift", description: "Tool · get_prices", body: "MAG4 drift: 2.4%", footer: "412 ms", handles: { target: true, source: true } } },
		{ id: "decision", type: "step", position: { x: 300, y: 0 }, selected: true, data: { title: "Decision", description: "drift > 2%?", badges: ["yes", "no"], footer: "selected", handles: { target: true, source: true } } },
	]);
	let edges = $state.raw([]);
</script>

<div style="height: 224px" class="w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
	<Canvas bind:nodes bind:edges {nodeTypes} />
</div>
