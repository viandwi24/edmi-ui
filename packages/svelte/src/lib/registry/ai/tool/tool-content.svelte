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
	data-slot="ai-tool-content"
	class={cn(
		"overflow-hidden outline-none data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
		className
	)}
	{...restProps}
>
	<div class="space-y-3 border-t border-border px-3.5 py-3 text-[13px]">
		{@render children?.()}
	</div>
</CollapsibleContent>
