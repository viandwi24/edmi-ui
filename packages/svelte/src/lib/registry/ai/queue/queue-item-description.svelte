<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		completed = false,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { completed?: boolean } = $props();
</script>

<div
	data-slot="ai-queue-item-description"
	class={cn(
		"ml-[22px] text-xs",
		completed ? "text-muted-foreground-2 line-through" : "text-muted-foreground",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
