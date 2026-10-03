<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();
</script>

<span
	bind:this={ref}
	data-slot="marker-icon"
	aria-hidden="true"
	class={cn(
		"inline-flex size-3.5 shrink-0 items-center justify-center [&_svg:not([class*='size-'])]:size-3.5",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</span>
