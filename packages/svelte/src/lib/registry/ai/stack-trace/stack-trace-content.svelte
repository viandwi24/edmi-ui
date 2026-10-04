<script lang="ts">
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		maxHeight = 400,
		class: className,
		style,
		children,
		...restProps
	}: ComponentProps<typeof Collapsible.Content> & { maxHeight?: number } = $props();
</script>

<Collapsible.Content
	bind:ref
	data-slot="ai-stack-trace-content"
	class={cn("overflow-auto border-t border-border", className)}
	style={`max-height: ${maxHeight}px;${style ? ` ${style}` : ""}`}
	{...restProps}
>
	{@render children?.()}
</Collapsible.Content>
