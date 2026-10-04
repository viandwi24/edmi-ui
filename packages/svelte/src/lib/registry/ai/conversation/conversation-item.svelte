<script lang="ts">
	import { MessageScrollerItem } from "$lib/registry/ui/message-scroller/index.js";
	import type { ComponentProps } from "svelte";

	// One turn inside the conversation (pass `messageId`; `scrollAnchor` pins a user turn to the top).
	let { children, ...restProps }: ComponentProps<typeof MessageScrollerItem> = $props();
</script>

<MessageScrollerItem data-slot="ai-conversation-item" {...restProps}>
	{@render children?.()}
</MessageScrollerItem>
