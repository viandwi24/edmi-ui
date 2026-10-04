<script lang="ts">
	import { ElevationProvider } from "@edmi-svelte/ui/elevation";
	import { Canvas } from "@edmi-svelte/ai/canvas";
	import { Controls } from "@edmi-svelte/ai/controls";
	import { Edge } from "@edmi-svelte/ai/edge";
	import { Panel } from "@edmi-svelte/ai/panel";
	import { Button } from "@edmi-svelte/ui/button";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { edges as edgeData, legend, nodes as nodeData } from "./data";
	import Step from "./svelte/step.svelte";

	const nodeTypes = { step: Step };
	const edgeTypes = { animated: Edge.Animated, temporary: Edge.Temporary };

	let nodes = $state.raw(nodeData);
	let edges = $state.raw(edgeData);
</script>

<ElevationProvider mode="layered">
<div class="h-svh min-h-96 w-full bg-background text-foreground">
	<Canvas bind:nodes bind:edges {nodeTypes} {edgeTypes}>
		<Controls position="bottom-left" />
		<Panel position="top-left" class="px-3 py-2.5 text-xs">
			<p class="mb-1.5 font-semibold">Legend</p>
			{#each legend as item, i (item.label)}
				<p class={i ? "mt-1 flex items-center gap-2" : "flex items-center gap-2"}>
					<svg aria-hidden="true" height="6" width="26">
						<path d="M0 3h26" stroke={item.color} stroke-dasharray={item.dash} stroke-width="1.6" />
					</svg>
					{item.label}
				</p>
			{/each}
		</Panel>
		<Panel position="top-right" class="flex items-center gap-1.5">
			<Button size="sm">
				<IconPlaceholder
					lucide="PlayIcon"
					tabler="IconPlayerPlay"
					hugeicons="PlayIcon"
					phosphor="PlayIcon"
					remixicon="RiPlayLine"
					class="size-3.5"
				/>
				Run
			</Button>
			<Button size="sm" variant="outline">Save</Button>
		</Panel>
	</Canvas>
</div>
</ElevationProvider>
