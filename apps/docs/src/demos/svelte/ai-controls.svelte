<script lang="ts">
	import { Canvas } from "@edmi-svelte/ai/canvas";
	import { Controls } from "@edmi-svelte/ai/controls";
	import Step from "./_shared/ai-workflow-step.svelte";

	const nodeTypes = { step: Step };

	const step = (title: string) => ({ title, description: "Step", compact: true, handles: { target: false, source: false } });

	let nodes = $state.raw([
		{ id: "a", type: "step", position: { x: 0, y: 0 }, data: step("Start") },
		{ id: "b", type: "step", position: { x: 300, y: 40 }, data: step("Check drift") },
	]);
	let edges = $state.raw([]);
</script>

<div style="height: 224px" class="w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
	<Canvas bind:nodes bind:edges {nodeTypes}>
		<Controls position="bottom-left" />
	</Canvas>
</div>
