<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { onMount } from "svelte";
	import { SCROLL_KEYS, useMessageScrollerContext } from "./use-message-scroller.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		preserveScrollOnPrepend = true,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		preserveScrollOnPrepend?: boolean;
	} = $props();

	const scroller = useMessageScrollerContext();

	$effect(() => {
		scroller.setPreserveScrollOnPrepend(preserveScrollOnPrepend);
	});

	onMount(() => {
		const viewport = ref;
		scroller.setViewportElement(viewport);
		let frame = 0;
		let observer: ResizeObserver | null = null;
		if (viewport && typeof ResizeObserver !== "undefined") {
			observer = new ResizeObserver(() => {
				window.cancelAnimationFrame(frame);
				frame = window.requestAnimationFrame(scroller.handleResize);
			});
			observer.observe(viewport);
		}
		return () => {
			window.cancelAnimationFrame(frame);
			observer?.disconnect();
			scroller.setViewportElement(null);
		};
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	bind:this={ref}
	data-slot="message-scroller-viewport"
	role="region"
	aria-label="Messages"
	tabindex="0"
	data-scrollable={scroller.scrollableAttr}
	data-autoscrolling={scroller.autoscrolling ? "" : undefined}
	class={cn(
		"size-full min-h-0 min-w-0 scroll-fade-b scrollbar-thin scrollbar-gutter-stable overflow-y-auto overscroll-contain contain-content data-[autoscrolling]:scrollbar-thumb-transparent data-[autoscrolling]:scrollbar-track-transparent",
		className
	)}
	onscroll={() => scroller.syncAfterScroll()}
	onwheel={() => scroller.userScrollIntent()}
	ontouchmove={() => scroller.userScrollIntent()}
	onkeydown={(event) => {
		if (SCROLL_KEYS.has(event.key)) scroller.userScrollIntent();
	}}
	{...restProps}
>
	{@render children?.()}
</div>
