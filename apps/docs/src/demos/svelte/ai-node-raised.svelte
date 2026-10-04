<script lang="ts">
	import { Canvas } from "@edmi-svelte/ai/canvas";
	import Step from "./_shared/ai-workflow-step.svelte";

	const nodeTypes = { step: Step };

	const levels = ["sunken", "flat", "raised", "floating"] as const;
	const labels = { sunken: "Sunken (-1)", flat: "Flat (0)", raised: "Raised (+1)", floating: "Floating (+2)" };

	let nodes = $state.raw(
		levels.map((elevation, i) => ({
			id: elevation,
			type: "step",
			position: { x: (i % 2) * 290, y: Math.floor(i / 2) * 170 },
			data: { title: "Check drift", description: labels[elevation], body: "MAG4 drift: 2.4%", footer: "412 ms", elevation, handles: { target: true, source: true } },
		})),
	);
	let edges = $state.raw([]);
</script>

<div style="height: 416px" class="w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
	<Canvas bind:nodes bind:edges {nodeTypes} fitViewOptions={{ maxZoom: 1, padding: 0.2 }} />
</div>
