<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<!-- Title with its indicators; put `ChatHeaderProject` and `ChatHeaderMenu` inside. -->
<div
	data-slot="ai-chat-header-title"
	class={cn("flex min-w-0 items-center gap-2.5 text-[14.5px]", className)}
	{...restProps}
>
	{@render children?.()}
</div>
