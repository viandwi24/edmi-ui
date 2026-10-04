<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const buttonGroupVariants = tv({
		base: "group/button-group flex w-fit items-stretch [&>[data-variant=default]+[data-slot=button-group-separator]]:bg-[color-mix(in_srgb,var(--primary-foreground)_25%,var(--primary))] [&>[data-variant=brand]+[data-slot=button-group-separator]]:bg-[color-mix(in_srgb,var(--brand-foreground)_25%,var(--brand))] [&>[data-variant=destructive]+[data-slot=button-group-separator]]:bg-[color-mix(in_srgb,white_25%,var(--destructive))] *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
		variants: {
			orientation: {
				horizontal: "*:data-slot:rounded-r-none [&>[data-slot=input]]:shadow-none [&>[data-slot=input-group]]:shadow-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg! [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0",
				vertical: "flex-col [&>[data-slot=input]]:shadow-none [&>[data-slot=input-group]]:shadow-none *:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg! [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0",
			},
		},
		defaultVariants: {
			orientation: "horizontal",
		},
	});

	export type ButtonGroupOrientation = VariantProps<typeof buttonGroupVariants>["orientation"];
</script>

<script lang="ts">
	import { setContext } from "svelte";
	import { BUTTON_ELEVATION_CONTEXT } from "#lib/components/ui/button/index.js";
	import { type Elevation, useElevation } from "#lib/components/ui/elevation/index.js";
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		orientation = "horizontal",
		elevation = "auto",
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		orientation?: ButtonGroupOrientation;
		/** ✦ raised: each item is raised; floating: the whole group floats as one plate (items stay raised). */
		elevation?: Elevation;
	} = $props();

	const level = useElevation(() => elevation, "button-filled");

	// items follow the group only when it has an explicit level (floating group => raised items)
	setContext(BUTTON_ELEVATION_CONTEXT, () => {
		if (!elevation || elevation === "auto") return undefined;
		return level.current === "floating" ? "raised" : level.current;
	});
</script>

<div
	bind:this={ref}
	role="group"
	data-slot="button-group"
	data-orientation={orientation}
	class={cn(buttonGroupVariants({ orientation }), level.current === "floating" && "rounded-lg shadow-group-float", className)}
	{...restProps}
>
	{@render children?.()}
</div>
