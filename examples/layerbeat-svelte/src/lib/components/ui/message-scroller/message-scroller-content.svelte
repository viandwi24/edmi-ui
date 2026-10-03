<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { onMount } from "svelte";
	import { useMessageScrollerContext } from "./use-message-scroller.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		spacerClass,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { spacerClass?: string } = $props();

	const scroller = useMessageScrollerContext();
	let spacer: HTMLDivElement | null = $state(null);

	onMount(() => {
		const content = ref;
		if (!content) return;
		scroller.setContentElement(content);
		scroller.setSpacerElement(spacer);
		scroller.handleContentChange();
		let frame = 0;
		let mutationObserver: MutationObserver | null = null;
		let resizeObserver: ResizeObserver | null = null;
		if (typeof MutationObserver !== "undefined") {
			mutationObserver = new MutationObserver(() => scroller.handleContentChange());
			mutationObserver.observe(content, { childList: true });
		}
		if (typeof ResizeObserver !== "undefined") {
			resizeObserver = new ResizeObserver(() => {
				window.cancelAnimationFrame(frame);
				frame = window.requestAnimationFrame(scroller.handleResize);
			});
			resizeObserver.observe(content);
		}
		return () => {
			window.cancelAnimationFrame(frame);
			mutationObserver?.disconnect();
			resizeObserver?.disconnect();
			scroller.setContentElement(null);
			scroller.setSpacerElement(null);
		};
	});
</script>

<div
	bind:this={ref}
	data-slot="message-scroller-content"
	role="log"
	aria-relevant="additions"
	class={cn("flex h-max min-h-full flex-col gap-6", className)}
	{...restProps}
>
	{@render children?.()}
	<div
		bind:this={spacer}
		aria-hidden="true"
		data-message-scroller-spacer=""
		hidden
		class={spacerClass}
	></div>
</div>
