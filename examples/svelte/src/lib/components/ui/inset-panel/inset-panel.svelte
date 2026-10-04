<script lang="ts">
	// ✦ Edmi addition (DESIGN §4.8, v4): the header sits on the shell (--muted, level 0); the body is a
	// --card plate inset 2px from the shell (left/right/bottom) with its own full radius; with a footer the
	// body keeps a 0 bottom gap and the footer sits on the shell without a divider.
	// ✦ depth: raised = the body plate bevels; floating = the shell also drops; sunken = the shell is a well.
	import { cn, type WithElementRef } from "#lib/utils.js";
	import { type Elevation, setSurface, useElevation } from "#lib/components/ui/elevation/index.js";
	import { insetPanelElevation, setInsetPanelLevel } from "./context.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		elevation = "auto",
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		/** ✦ depth: sunken -1, flat 0, raised +1 (body plate bevels), floating +2 (shell also drops). */
		elevation?: Elevation;
	} = $props();

	const level = useElevation(() => elevation, "surface");
	setSurface(() => level.current);
	setInsetPanelLevel(() => level.current);
</script>

<div
	bind:this={ref}
	data-slot="inset-panel"
	class={cn(
		"group/inset-panel flex flex-col overflow-hidden rounded-2xl border border-border bg-muted",
		insetPanelElevation[level.current].root,
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
