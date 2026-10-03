<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { ScrollArea } from "$lib/registry/ui/scroll-area/index.js";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";

	let {
		children,
		class: className,
		...restProps
	}: {
		children?: Snippet;
		class?: string;
	} = $props();
</script>

<!-- Row of suggestions; scrolls horizontally. -->
<ScrollArea
	data-slot="ai-suggestions"
	orientation="horizontal"
	scrollbarXClasses="hidden"
	class="w-full whitespace-nowrap"
	{...restProps}
>
	<div class={cn("flex w-max flex-nowrap items-center gap-2", className)}>
		{@render children?.()}
	</div>
</ScrollArea>
