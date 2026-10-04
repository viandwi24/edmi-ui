<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		completed = false,
		children,
		...restProps
	}: HTMLAttributes<HTMLSpanElement> & { completed?: boolean } = $props();
</script>

<span
	data-slot="ai-queue-item-content"
	class={cn(
		"line-clamp-1 grow break-words",
		completed ? "text-muted-foreground-2 line-through" : "text-foreground",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</span>
