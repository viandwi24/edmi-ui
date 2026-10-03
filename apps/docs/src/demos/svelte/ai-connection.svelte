<script lang="ts">
	import { Canvas } from "@edmi-svelte/ai/canvas";
	import { Connection } from "@edmi-svelte/ai/connection";
	import Step from "./_shared/ai-workflow-step.svelte";

	const nodeTypes = { step: Step };

	const step = (title: string, target: boolean) => ({ title, compact: true, handles: { target, source: !target } });

	let nodes = $state.raw([
		{ id: "a", type: "step", position: { x: 0, y: 40 }, data: step("Start", false) },
		{ id: "b", type: "step", position: { x: 320, y: 40 }, data: step("Check drift", true) },
	]);
	let edges = $state.raw([]);
</script>

<div style="height: 224px" class="relative w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
	<p class="absolute z-10 m-3 text-xs text-muted-foreground">Drag from the right handle of Start.</p>
	<Canvas bind:nodes bind:edges {nodeTypes} connectionLineComponent={Connection} />
</div>
