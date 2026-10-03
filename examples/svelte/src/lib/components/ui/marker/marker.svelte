<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const markerVariants = tv({
		base: "group/marker relative flex min-h-4 w-full items-center gap-2 text-left text-[12.5px] text-muted-foreground [&_svg:not([class*='size-'])]:size-3.5 [a]:underline [a]:underline-offset-3 [a]:hover:text-foreground",
		variants: {
			variant: {
				default: "",
				separator:
					"before:mr-1 before:h-px before:min-w-0 before:flex-1 before:bg-border after:ml-1 after:h-px after:min-w-0 after:flex-1 after:bg-border",
				border: "border-b border-border pb-2.5",
			},
		},
		defaultVariants: { variant: "default" },
	});

	export type MarkerVariant = VariantProps<typeof markerVariants>["variant"];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAnchorAttributes, HTMLAttributes } from "svelte/elements";

	// Renders a `<div>`; pass `href` to render an `<a>`.
	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		href = undefined,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> &
		WithElementRef<HTMLAnchorAttributes> & { variant?: MarkerVariant } = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="marker"
		data-variant={variant}
		class={cn(markerVariants({ variant }), className)}
		{href}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<div
		bind:this={ref}
		data-slot="marker"
		data-variant={variant}
		class={cn(markerVariants({ variant }), className)}
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}
