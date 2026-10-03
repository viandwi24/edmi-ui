<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		fade = false,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { fade?: boolean } = $props();
</script>

<div
	bind:this={ref}
	data-slot="inset-panel-body"
	data-fade={fade || undefined}
	class={cn(
		"relative -mx-px flex-1 overflow-hidden rounded-t-xl border border-b-0 border-border bg-card",
		"group-data-[raised]/inset-panel:shadow-[inset_0_1px_0_var(--card-hi)]",
		// no footer: the body runs to the bottom edge
		"group-has-[[data-slot=inset-panel-footer]]/inset-panel:mb-0 not-group-has-[[data-slot=inset-panel-footer]]/inset-panel:-mb-px",
		"data-[fade]:after:pointer-events-none data-[fade]:after:absolute data-[fade]:after:inset-x-0 data-[fade]:after:bottom-0 data-[fade]:after:h-14 data-[fade]:after:bg-linear-to-b data-[fade]:after:from-transparent data-[fade]:after:to-card",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
