<script lang="ts">
	import ChartLineUpIcon from 'phosphor-svelte/lib/ChartLineUp';
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type Elevation, useElevation } from "#lib/components/ui/elevation/index.js";

	let {
		ref = $bindable(null),
		class: className,
		elevation = "auto",
		...restProps
	}: WithElementRef<Omit<HTMLAttributes<HTMLSpanElement>, "children">> & {
		/** ✦ raised +1 / floating +2 give the mark the raised face. */
		elevation?: Elevation;
	} = $props();

	const level = useElevation(() => elevation, "handle");
	const raised = $derived(level.current === "raised" || level.current === "floating");
</script>

<!-- Dark tile with a chart glyph: the Stockbreak mark. Pass a `logo` snippet to the brand/header to replace it. -->
<span
	bind:this={ref}
	data-slot="site-header-mark"
	class={cn(
		"inline-flex size-7 items-center justify-center rounded-lg border border-primary bg-primary text-primary-foreground",
		raised && "[background-image:var(--r1-p-face)] shadow-btn-raised-primary [background-origin:border-box]",
		className
	)}
	{...restProps}
>
	<ChartLineUpIcon class="size-[15px]" />
</span>
