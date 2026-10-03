<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { CollapsibleTrigger } from "$lib/registry/ui/collapsible/index.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof CollapsibleTrigger> = $props();
</script>

<CollapsibleTrigger
	data-slot="ai-queue-section-trigger"
	class={cn(
		"group/queue-trigger flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-semibold text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</CollapsibleTrigger>
