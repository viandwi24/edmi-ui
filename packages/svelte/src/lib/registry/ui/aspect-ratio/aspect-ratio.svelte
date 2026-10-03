<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		ratio,
		style,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { ratio: number } = $props();
</script>

<div
	bind:this={ref}
	data-slot="aspect-ratio"
	style="--ratio: {ratio};{style ?? ''}"
	class={cn("relative aspect-(--ratio)", className)}
	{...restProps}
>
	{@render children?.()}
</div>
