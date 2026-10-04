<script lang="ts">
	import {
		MessageScrollerContent,
		MessageScrollerViewport,
	} from "$lib/registry/ui/message-scroller/index.js";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
</script>

<!-- Viewport + content column. Wrap each turn in ConversationItem so the scroller can anchor it. -->
<MessageScrollerViewport>
	<MessageScrollerContent
		data-slot="ai-conversation-content"
		class={cn("gap-6 p-4", className)}
		{...restProps}
	>
		{@render children?.()}
	</MessageScrollerContent>
</MessageScrollerViewport>
