<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import {
		MessageScroller,
		MessageScrollerProvider,
	} from "$lib/registry/ui/message-scroller/index.js";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	// Thin layer on ui/message-scroller (DESIGN §5b): the scroller already follows streaming replies and
	// owns the scroll state; this adds the AI Elements anatomy, EmptyState (+ home variant) and Download.

	let {
		class: className,
		autoScroll = true,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		/** Follow new content while the user is at the bottom. */
		autoScroll?: boolean;
		children?: Snippet;
	} = $props();
</script>

<MessageScrollerProvider {autoScroll}>
	<MessageScroller
		data-slot="ai-conversation"
		role="log"
		class={cn("flex-1", className)}
		{...restProps}
	>
		{@render children?.()}
	</MessageScroller>
</MessageScrollerProvider>
