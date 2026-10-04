<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const kbdVariants = tv({
		base: "pointer-events-none inline-flex h-[22px] w-fit min-w-[22px] items-center justify-center gap-1 rounded-[5px] border border-input bg-muted px-1.5 font-mono text-[11.5px] font-medium text-muted-foreground select-none in-data-[slot=tooltip-content]:border-[color-mix(in_srgb,var(--background)_20%,var(--primary))] in-data-[slot=tooltip-content]:bg-[color-mix(in_srgb,var(--background)_10%,var(--primary))] in-data-[slot=tooltip-content]:text-background [&_svg:not([class*='size-'])]:size-3",
		variants: {
			// ✦ depth (v4); inside a tooltip the key stays flat
			elevation: {
				flat: "",
				sunken: "",
				raised:
					"border-transparent [background-image:var(--r1-s-face)] [background-origin:border-box] shadow-btn-raised-neutral in-data-[slot=tooltip-content]:bg-none in-data-[slot=tooltip-content]:shadow-none",
				floating:
					"border-transparent [background-image:var(--fl-s-face)] [background-origin:border-box] shadow-btn-float-neutral in-data-[slot=tooltip-content]:bg-none in-data-[slot=tooltip-content]:shadow-none",
			},
		},
		defaultVariants: { elevation: "flat" },
	});

	export type KbdVariants = VariantProps<typeof kbdVariants>;
</script>

<script lang="ts">
	import { type Elevation, useElevation } from "$lib/registry/ui/elevation/index.js";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		elevation = "auto",
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> & {
		/** ✦ depth: flat 0, raised +1, floating +2. */
		elevation?: Elevation;
	} = $props();

	const level = useElevation(() => elevation, "handle");
</script>

<kbd
	bind:this={ref}
	data-slot="kbd"
	class={cn(kbdVariants({ elevation: level.current }), className)}
	{...restProps}
>
	{@render children?.()}
</kbd>
