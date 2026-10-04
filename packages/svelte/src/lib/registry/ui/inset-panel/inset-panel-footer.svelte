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
	data-slot="inset-panel-footer"
	class={cn(
		"bg-muted px-4 py-3 text-center text-[13px] text-foreground-2",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
