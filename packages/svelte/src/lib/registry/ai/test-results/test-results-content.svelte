<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="ai-test-results-content"
	class={cn("space-y-1 border-t border-border-2 px-4 pt-1.5 pb-3", className)}
	{...restProps}
>
	{@render children?.()}
</div>
