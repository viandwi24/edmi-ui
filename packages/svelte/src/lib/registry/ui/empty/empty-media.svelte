<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const emptyMediaVariants = tv({
		base: "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
		variants: {
			variant: {
				default: "bg-transparent",
				icon: "size-12 rounded-xl border border-border bg-card text-foreground [&_svg:not([class*='size-'])]:size-5",
			},
			// ✦ depth (icon variant only): the media tile rises
			elevation: { flat: "", raised: "", floating: "" },
		},
		compoundVariants: [
			{ variant: "icon", elevation: "raised", class: "border-transparent shadow-raised" },
			{ variant: "icon", elevation: "floating", class: "border-transparent shadow-floating" },
		],
		defaultVariants: {
			variant: "default",
			elevation: "flat",
		},
	});

	export type EmptyMediaVariant = VariantProps<typeof emptyMediaVariants>["variant"];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { type Elevation, useElevation } from "$lib/registry/ui/elevation/index.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		variant = "default",
		elevation = "auto",
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: EmptyMediaVariant;
		/** ✦ depth for variant="icon": raised +1 / floating +2 make the media tile rise. */
		elevation?: Elevation;
	} = $props();

	const level = useElevation(() => elevation, "handle");
</script>

<div
	bind:this={ref}
	data-slot="empty-icon"
	data-variant={variant}
	class={cn(emptyMediaVariants({ variant, elevation: level.current === "sunken" ? "flat" : level.current }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
