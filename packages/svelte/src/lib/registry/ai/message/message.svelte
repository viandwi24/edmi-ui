<script lang="ts">
	import { Message as UiMessage } from "$lib/registry/ui/message/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";
	import { type MessageRole, setMessageContext } from "./use-message.svelte.js";

	// Thin layer on ui/message + ui/bubble (DESIGN §5b). Assistant turns have NO avatar by default: the response
	// is full width on the left; a user turn is a secondary bubble on the right. `MessageAvatar` + `MessageHeader`
	// are opt-in for multi-agent chats (the avatar then aligns to the name line). Status / shimmer text goes inside
	// `MessageContent` (a ghost bubble) so its first line aligns like any message.

	let {
		from,
		class: className,
		children,
		...restProps
	}: Omit<ComponentProps<typeof UiMessage>, "align"> & { from: MessageRole } = $props();

	setMessageContext({
		get from() {
			return from;
		},
	});
</script>

<UiMessage
	data-slot="ai-message"
	data-from={from}
	align={from === "user" ? "end" : "start"}
	class={cn(
		"max-w-full flex-col items-stretch gap-1.5 data-[align=end]:flex-col",
		// opt-in avatar: two columns, avatar spans the rows, everything else stacks in column 2
		"has-[>[data-slot=message-avatar]]:grid has-[>[data-slot=message-avatar]]:grid-cols-[auto_minmax(0,1fr)] has-[>[data-slot=message-avatar]]:items-start has-[>[data-slot=message-avatar]]:gap-x-2.5 has-[>[data-slot=message-avatar]]:gap-y-1.5 [&>[data-slot=message-avatar]]:row-span-full has-[>[data-slot=message-avatar]]:[&>:not([data-slot=message-avatar])]:col-start-2",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</UiMessage>
