<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	// Soft fill + tinted 30-40% border for coloured variants, never solid (DESIGN 4.12).
	export const alertVariants = tv({
		base: "group/alert relative grid w-full grid-cols-[1fr_auto] items-start gap-x-3 gap-y-0.5 rounded-xl border px-4 py-3.5 text-left text-sm has-[>svg]:grid-cols-[20px_1fr_auto] *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
		variants: {
			variant: {
				default: "border-border bg-card text-card-foreground",
				destructive: "border-destructive/40 bg-destructive-soft text-destructive-text",
				brand: "border-brand/40 bg-brand-soft text-brand-text", // ✦
				success: "border-success/40 bg-success-soft text-success-text", // ✦
				warning: "border-warning/40 bg-warning-soft text-warning-text", // ✦
				info: "border-info/40 bg-info-soft text-info-text", // ✦
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type AlertVariant = VariantProps<typeof alertVariants>["variant"];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: AlertVariant;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="alert"
	data-variant={variant}
	role="alert"
	class={cn(alertVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
