<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { CollapsibleContent } from "$lib/registry/ui/collapsible/index.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof CollapsibleContent> = $props();
</script>

<CollapsibleContent
	data-slot="ai-queue-section-content"
	class={cn(
		"overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</CollapsibleContent>
