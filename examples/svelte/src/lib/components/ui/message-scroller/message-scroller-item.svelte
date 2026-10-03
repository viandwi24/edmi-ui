<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { useMessageScrollerRegister } from "./use-message-scroller.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		messageId = undefined,
		scrollAnchor = false,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		messageId?: string;
		scrollAnchor?: boolean;
	} = $props();

	const register = useMessageScrollerRegister();

	$effect(() => {
		const element = ref;
		const id = messageId;
		if (!id || !element) return;
		register(id, element, null);
		return () => register(id, null, element);
	});
</script>

<div
	bind:this={ref}
	data-slot="message-scroller-item"
	data-message-id={messageId}
	data-scroll-anchor={scrollAnchor ? "true" : "false"}
	class={cn("min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]", className)}
	{...restProps}
>
	{@render children?.()}
</div>
