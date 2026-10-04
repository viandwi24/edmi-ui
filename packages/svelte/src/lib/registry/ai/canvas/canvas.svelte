<script lang="ts">
	import { Background, BackgroundVariant, SvelteFlow, type SvelteFlowProps } from "@xyflow/svelte";
	import type { Snippet } from "svelte";
	import { cn } from "$lib/utils.js";
	import "@xyflow/svelte/dist/style.css";

	let {
		nodes = $bindable([]),
		edges = $bindable([]),
		class: className,
		style,
		children,
		...restProps
	}: SvelteFlowProps & { children?: Snippet } = $props();

	// xyflow reads these variables; mapping them to Edmi tokens keeps every mode and theme in sync.
	const tokenVars = [
		"--xy-edge-stroke-default: var(--muted-foreground)",
		"--xy-edge-stroke-selected-default: var(--foreground)",
		"--xy-edge-stroke-width-default: 1.6",
		"--xy-connectionline-stroke-default: var(--ring)",
		"--xy-connectionline-stroke-width-default: 1.6",
		"--xy-background-color-default: var(--background)",
		"--xy-attribution-background-color-default: var(--card)",
		"--xy-selection-background-color-default: var(--ring-soft)",
		"--xy-selection-border-default: 1px solid var(--ring)",
	].join(";");
</script>

<!-- Workflow surface: dotted --input dots on --background, pan on scroll, selection on drag, fit view on load. -->
<SvelteFlow
	data-slot="ai-canvas"
	bind:nodes
	bind:edges
	class={cn("bg-background", className)}
	style={`${tokenVars};${style ?? ""}`}
	deleteKey={["Backspace", "Delete"]}
	fitView
	panOnDrag={false}
	panOnScroll
	selectionOnDrag
	zoomOnDoubleClick={false}
	{...restProps}
>
	<Background gap={18} size={1} variant={BackgroundVariant.Dots} patternColor="var(--input)" />
	{@render children?.()}
</SvelteFlow>
