<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import {
		Bubble,
		BubbleContent,
		type BubbleVariant,
	} from "$lib/registry/ui/bubble/index.js";
	import { MessageContent as UiMessageContent } from "$lib/registry/ui/message/index.js";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { useMessageContext } from "./use-message.svelte.js";

	let {
		class: className,
		variant,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		/** Defaults to `secondary` for the user and `ghost` (no fill, keeps vertical padding) for the assistant. */
		variant?: BubbleVariant;
		children?: Snippet;
	} = $props();

	const message = useMessageContext();
	const user = $derived(message?.from === "user");
</script>

<UiMessageContent data-slot="ai-message-content">
	<Bubble
		variant={variant ?? (user ? "secondary" : "ghost")}
		align={user ? "end" : "start"}
		class={cn(!user && "w-full")}
	>
		<BubbleContent class={cn(!user && "w-full", className)} {...(restProps as Record<string, unknown>)}>
			{@render children?.()}
		</BubbleContent>
	</Bubble>
</UiMessageContent>
