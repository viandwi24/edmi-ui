<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		size = "default",
		raised = false,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		size?: "default" | "sm";
		/** ✦ opt-in one-step 3D look (hard lip + top highlight). */
		raised?: boolean;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	data-size={size}
	class={cn(
		// Flat by default (border only); raised ✦ adds the hard lip. Spacing: 22px default, 16px sm.
		"group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl border border-border bg-card py-(--card-spacing) text-sm text-card-foreground [--card-spacing:22px] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:16px] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
		raised && "border-b-lip shadow-card",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
