<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement> = $props();
</script>

<!-- Title with its indicators; put `ChatHeaderProject` and `ChatHeaderMenu` inside. -->
<div
	bind:this={ref}
	data-slot="ai-chat-header-title"
	class={cn("flex min-w-0 items-center gap-2.5 text-[14.5px]", className)}
	{...restProps}
>
	{@render children?.()}
</div>
