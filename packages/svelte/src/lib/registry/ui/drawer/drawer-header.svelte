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
	data-slot="drawer-header"
	class={cn("flex flex-col gap-1 text-center group-data-[vaul-drawer-direction=left]/drawer-content:text-left group-data-[vaul-drawer-direction=right]/drawer-content:text-left", className)}
	{...restProps}
>
	{@render children?.()}
</div>
