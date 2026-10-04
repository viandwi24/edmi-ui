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
	data-slot="ai-sandbox-tabs-bar"
	class={cn("flex w-full items-center px-3 pt-2.5", className)}
	{...restProps}
>
	{@render children?.()}
</div>
