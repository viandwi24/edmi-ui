<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
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
	data-slot="ai-sources-content"
	class={cn(
		"overflow-hidden outline-none data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
		className
	)}
	{...restProps}
>
	<div class="flex flex-col gap-1.5 pt-2 pl-[23px]">
		{@render children?.()}
	</div>
</CollapsibleContent>
