<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { NodeToolbar, Position, type NodeToolbarProps } from "@xyflow/svelte";
	import { cn } from "$lib/utils.js";

	/** Floating actions attached to a node (solid chip: --popover + 1px border). Above the node by default. */
	let {
		class: className,
		position = Position.Top,
		children,
		...restProps
	}: NodeToolbarProps = $props();
</script>

<NodeToolbar
	data-slot="ai-toolbar"
	{position}
	class={cn(
		"flex items-center gap-0.5 rounded-[9px] border border-border bg-popover p-[3px]",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</NodeToolbar>
