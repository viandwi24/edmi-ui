<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<!-- Thread bar: title, project indicator and actions. -->
<header
	data-slot="ai-chat-header"
	class={cn(
		"flex h-[52px] w-full items-center justify-between gap-3 rounded-[calc(var(--radius)*1.2)] border border-border bg-background pr-2.5 pl-4",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</header>
