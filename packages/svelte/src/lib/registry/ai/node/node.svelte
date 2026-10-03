<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { Handle, Position } from "@xyflow/svelte";
	import type { ComponentProps } from "svelte";
	import { cn } from "$lib/utils.js";
	import { Card } from "$lib/registry/ui/card/index.js";

	let {
		class: className,
		handles = { target: false, source: false },
		selected = false,
		raised = false,
		children,
		...restProps
	}: Omit<ComponentProps<typeof Card>, "raised"> & {
		handles?: { target?: boolean; source?: boolean };
		/** Ring state. Inside Svelte Flow the `selected` class on the node wrapper does the same. */
		selected?: boolean;
		/** ✦ one-step 3D look. */
		raised?: boolean;
	} = $props();

	const handleClass = "size-2.5! min-h-0! min-w-0! rounded-full! border-2! border-muted-foreground! bg-card!";
</script>

<Card
	{...restProps}
	data-slot="ai-node"
	data-selected={selected ? "" : undefined}
	{raised}
	class={cn(
		"relative size-full h-auto w-60 gap-0 overflow-visible rounded-[calc(var(--radius)*1.2)] py-0",
		"data-[selected]:border-ring data-[selected]:shadow-ring [.selected_&]:border-ring [.selected_&]:shadow-ring",
		className
	)}
>
	{#if handles.target}
		<Handle class={handleClass} position={Position.Left} type="target" />
	{/if}
	{#if handles.source}
		<Handle class={handleClass} position={Position.Right} type="source" />
	{/if}
	{@render children?.()}
</Card>
