<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="ai-web-preview-navigation"
	class={cn("flex h-11 shrink-0 items-center gap-1 border-b border-border px-2", className)}
	{...restProps}
>
	{@render children?.()}
</div>
