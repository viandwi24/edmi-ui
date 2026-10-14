<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement> = $props();
</script>

<div
	bind:this={ref}
	data-slot="ai-artifact-viewer-header"
	class={cn(
		"flex h-[46px] shrink-0 items-center gap-1 border-b border-border pr-2 pl-4",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
