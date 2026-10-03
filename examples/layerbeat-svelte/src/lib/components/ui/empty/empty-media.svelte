<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const emptyMediaVariants = tv({
		base: "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
		variants: {
			variant: {
				default: "bg-transparent",
				icon: "size-12 rounded-xl border border-border bg-card text-foreground [&_svg:not([class*='size-'])]:size-5",
			},
			// ✦ opt-in one-step 3D look (icon variant only)
			raised: { false: "", true: "" },
		},
		compoundVariants: [
			{ variant: "icon", raised: true, class: "border-b-lip shadow-[0_2px_0_var(--lip)]" },
		],
		defaultVariants: {
			variant: "default",
			raised: false,
		},
	});

	export type EmptyMediaVariant = VariantProps<typeof emptyMediaVariants>["variant"];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		variant = "default",
		raised = false,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: EmptyMediaVariant;
		/** ✦ opt-in one-step 3D look (icon variant). */
		raised?: boolean;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="empty-icon"
	data-variant={variant}
	class={cn(emptyMediaVariants({ variant, raised }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
