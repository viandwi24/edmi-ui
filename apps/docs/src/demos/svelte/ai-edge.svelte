<script lang="ts">
	import { Canvas } from "@edmi-svelte/ai/canvas";
	import { Edge } from "@edmi-svelte/ai/edge";
	import Step from "./_shared/ai-workflow-step.svelte";

	const nodeTypes = { step: Step };
	const edgeTypes = { animated: Edge.Animated, temporary: Edge.Temporary };

	const step = (title: string, target: boolean) => ({ title, compact: true, handles: { target, source: !target } });

	let nodes = $state.raw([
		{ id: "a", type: "step", position: { x: 0, y: 40 }, data: step("Start", false) },
		{ id: "b", type: "step", position: { x: 320, y: 0 }, data: step("Check drift", true) },
		{ id: "c", type: "step", position: { x: 320, y: 120 }, data: step("Draft post", true) },
		{ id: "d", type: "step", position: { x: 320, y: 240 }, data: step("Escalate", true) },
	]);
	let edges = $state.raw([
		{ id: "e1", source: "a", target: "b", type: "animated" },
		{ id: "e2", source: "a", target: "c" },
		{ id: "e3", source: "a", target: "d", type: "temporary" },
	]);
</script>

<div style="height: 288px" class="w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
	<Canvas bind:nodes bind:edges {nodeTypes} {edgeTypes} />
</div>
