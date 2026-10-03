<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const badgeVariants = tv({
		base: "group/badge inline-flex h-[22px] w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-md border border-transparent px-2 text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-invalid:border-destructive [&>svg]:pointer-events-none [&_svg]:size-3",
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground [a]:hover:bg-[color-mix(in_srgb,var(--primary)_85%,var(--background))]",
				secondary: "border-border bg-secondary text-secondary-foreground [a]:hover:bg-accent",
				destructive: "border-[color-mix(in_srgb,var(--destructive)_30%,var(--popover))] bg-destructive-soft text-destructive-text",
				outline: "border-input text-foreground [a]:hover:bg-accent",
				ghost: "text-foreground hover:bg-accent",
				link: "text-foreground underline underline-offset-[3px] hover:opacity-80",
				// ✦ Edmi additions: soft fill + tinted border, never solid
				brand: "border-[color-mix(in_srgb,var(--brand)_30%,var(--popover))] bg-brand-soft text-brand-text",
				success: "border-[color-mix(in_srgb,var(--success)_30%,var(--popover))] bg-success-soft text-success-text",
				warning: "border-[color-mix(in_srgb,var(--warning)_30%,var(--popover))] bg-warning-soft text-warning-text",
				info: "border-[color-mix(in_srgb,var(--info)_30%,var(--popover))] bg-info-soft text-info-text",
			},
			// ✦ Edmi addition
			shape: {
				default: "",
				pill: "rounded-full",
				number: "min-w-[22px] justify-center px-1.5 font-mono text-[11px]",
			},
		},
		defaultVariants: {
			variant: "default",
			shape: "default",
		},
	});

	export type BadgeShape = VariantProps<typeof badgeVariants>["shape"];
	export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		href,
		class: className,
		variant = "default",
		shape = "default",
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> & {
		variant?: BadgeVariant;
		shape?: BadgeShape;
	} = $props();
</script>

<svelte:element
	this={href ? "a" : "span"}
	bind:this={ref}
	data-slot="badge"
	{href}
	class={cn(badgeVariants({ variant, shape }), className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
