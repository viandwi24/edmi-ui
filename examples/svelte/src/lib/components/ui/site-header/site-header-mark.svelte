<script lang="ts">
	import ChartLineUpIcon from 'phosphor-svelte/lib/ChartLineUp';
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		raised = false,
		...restProps
	}: WithElementRef<Omit<HTMLAttributes<HTMLSpanElement>, "children">> & {
		/** ✦ opt-in one-step 3D look. */
		raised?: boolean;
	} = $props();
</script>

<!-- Dark tile with a chart glyph: the Stockbreak mark. Pass a `logo` snippet to the brand/header to replace it. -->
<span
	bind:this={ref}
	data-slot="site-header-mark"
	class={cn(
		"inline-flex size-7 items-center justify-center rounded-lg border border-primary bg-primary text-primary-foreground",
		raised && "border-primary-edge border-b-primary-lip bg-linear-to-b from-primary-hi to-primary shadow-[0_2px_0_var(--primary-lip)] [background-origin:border-box]",
		className
	)}
	{...restProps}
>
	<ChartLineUpIcon class="size-[15px]" />
</span>
