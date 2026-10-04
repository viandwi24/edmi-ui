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

<div bind:this={ref} data-slot="ai-schema-display-content" class={cn("divide-y divide-border-2 border-t border-border-2", className)} {...restProps}>
	{@render children?.()}
</div>
