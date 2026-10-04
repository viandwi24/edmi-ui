<script lang="ts">
	import { Panel as PanelPrimitive, type PanelProps } from "@xyflow/svelte";
	import { cn } from "$lib/utils.js";

	/** Any UI pinned to a canvas corner (legend, filters, run buttons). Workflow only, not the ui inset panel. */
	let { class: className, children, ...restProps }: PanelProps = $props();
</script>

<PanelPrimitive
	data-slot="ai-panel"
	class={cn(
		"m-4 overflow-hidden rounded-[calc(var(--radius)*1.2)] border border-border bg-card p-1",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</PanelPrimitive>
