<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { useMessageScrollerContext } from "./use-message-scroller.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();

	const scroller = useMessageScrollerContext();
</script>

<div
	bind:this={ref}
	data-slot="message-scroller"
	data-scrollable={scroller.scrollableAttr}
	data-autoscrolling={scroller.autoscrolling ? "" : undefined}
	class={cn("group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden", className)}
	{...restProps}
>
	{@render children?.()}
</div>
