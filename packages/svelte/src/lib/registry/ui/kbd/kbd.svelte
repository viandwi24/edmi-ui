<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		raised = false,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> & {
		/** ✦ opt-in one-step 3D look. */
		raised?: boolean;
	} = $props();
</script>

<kbd
	bind:this={ref}
	data-slot="kbd"
	class={cn(
		"pointer-events-none inline-flex h-[22px] w-fit min-w-[22px] items-center justify-center gap-1 rounded-[5px] border border-input bg-muted px-1.5 font-mono text-[11.5px] font-medium text-muted-foreground select-none in-data-[slot=tooltip-content]:border-[color-mix(in_srgb,var(--background)_20%,var(--primary))] in-data-[slot=tooltip-content]:bg-[color-mix(in_srgb,var(--background)_15%,var(--primary))] in-data-[slot=tooltip-content]:text-background [&_svg:not([class*='size-'])]:size-3",
		raised &&
			"border-b-secondary-lip bg-linear-to-b from-secondary-hi to-muted shadow-[0_1px_0_var(--secondary-lip)] [background-origin:border-box] in-data-[slot=tooltip-content]:border-b-[color-mix(in_srgb,var(--background)_20%,var(--primary))] in-data-[slot=tooltip-content]:from-[color-mix(in_srgb,var(--background)_20%,var(--primary))] in-data-[slot=tooltip-content]:to-[color-mix(in_srgb,var(--background)_10%,var(--primary))] in-data-[slot=tooltip-content]:shadow-none",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</kbd>
