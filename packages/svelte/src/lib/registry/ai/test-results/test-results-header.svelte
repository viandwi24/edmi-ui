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
	data-slot="ai-test-results-header"
	class={cn("flex items-center justify-between gap-2.5 px-4 py-3.5", className)}
	{...restProps}
>
	{@render children?.()}
</div>
