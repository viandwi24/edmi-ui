<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-slot="ai-chat-header-actions"
	class={cn("flex shrink-0 items-center gap-1", className)}
	{...restProps}
>
	{@render children?.()}
</div>
