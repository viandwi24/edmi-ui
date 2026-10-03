<script lang="ts">
	import { Canvas } from "@edmi-svelte/ai/canvas";
	import { Controls } from "@edmi-svelte/ai/controls";
	import { Edge } from "@edmi-svelte/ai/edge";
	import { Panel } from "@edmi-svelte/ai/panel";
	import { Button } from "@edmi-svelte/ui/button";
	import Step from "./_shared/ai-workflow-step.svelte";

	const nodeTypes = { step: Step };
	const edgeTypes = { animated: Edge.Animated, temporary: Edge.Temporary };

	let nodes = $state.raw([
		{ id: "start", type: "step", position: { x: 0, y: 90 }, data: { title: "Start", description: "Trigger · every hour", body: "cron 0 * * * *", handles: { target: false, source: true } } },
		{ id: "drift", type: "step", position: { x: 330, y: 0 }, data: { title: "Check drift", description: "Tool · get_prices", body: "MAG4 drift: 2.4%", footer: "412 ms", handles: { target: true, source: true } } },
		{ id: "post", type: "step", position: { x: 330, y: 190 }, data: { title: "Draft feed post", description: "Agent · writer", body: "Writing...", footer: "running", handles: { target: true, source: true } } },
		{ id: "decision", type: "step", position: { x: 660, y: 0 }, data: { title: "Decision", description: "drift > 2%?", body: "yes / no", handles: { target: true, source: true } } },
	]);
	let edges = $state.raw([
		{ id: "e1", source: "start", target: "drift", type: "animated" },
		{ id: "e2", source: "start", target: "post" },
		{ id: "e3", source: "drift", target: "decision", type: "animated" },
		{ id: "e4", source: "post", target: "decision", type: "temporary" },
	]);
</script>

<div style="height: 420px" class="w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
	<Canvas bind:nodes bind:edges {nodeTypes} {edgeTypes}>
		<Controls />
		<Panel position="top-right">
			<Button size="sm">Run</Button>
		</Panel>
	</Canvas>
</div>
