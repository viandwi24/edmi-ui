<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { CardContent } from "$lib/registry/ui/card/index.js";
	import { CollapsibleContent } from "$lib/registry/ui/collapsible/index.js";
	import type { ComponentProps } from "svelte";

	let { class: className, children, ...restProps }: ComponentProps<typeof CardContent> = $props();
</script>

<CollapsibleContent
	class="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
>
	<CardContent
		data-slot="ai-plan-content"
		class={cn("pb-3.5 text-[13.5px] leading-[1.7] text-foreground-2", className)}
		{...restProps}
	>
		{@render children?.()}
	</CardContent>
</CollapsibleContent>
