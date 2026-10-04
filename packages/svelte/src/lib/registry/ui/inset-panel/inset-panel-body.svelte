<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { getInsetPanelLevel, insetPanelElevation } from "./context.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		fade = false,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { fade?: boolean } = $props();

	const panel = getInsetPanelLevel();
</script>

<div
	bind:this={ref}
	data-slot="inset-panel-body"
	data-fade={fade || undefined}
	class={cn(
		"relative mx-0.5 mb-0.5 flex-1 overflow-hidden rounded-xl border border-border bg-card",
		// footer: it sits right under the body, so no bottom gap
		"group-has-[[data-slot=inset-panel-footer]]/inset-panel:mb-0",
		insetPanelElevation[panel.current].body,
		"data-[fade]:after:pointer-events-none data-[fade]:after:absolute data-[fade]:after:inset-x-0 data-[fade]:after:bottom-0 data-[fade]:after:h-14 data-[fade]:after:bg-linear-to-b data-[fade]:after:from-transparent data-[fade]:after:to-card",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
