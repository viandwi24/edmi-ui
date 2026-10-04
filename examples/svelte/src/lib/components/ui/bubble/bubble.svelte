<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const bubbleVariants = tv({
		base: "group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full",
		variants: {
			variant: {
				default:
					"*:data-[slot=bubble-content]:bg-primary *:data-[slot=bubble-content]:text-primary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_srgb,var(--primary)_85%,var(--background))]",
				secondary:
					"*:data-[slot=bubble-content]:border-border *:data-[slot=bubble-content]:bg-secondary *:data-[slot=bubble-content]:text-secondary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-accent",
				muted:
					"*:data-[slot=bubble-content]:bg-muted *:data-[slot=bubble-content]:text-muted-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-accent",
				tinted:
					"*:data-[slot=bubble-content]:border-[color-mix(in_srgb,var(--brand)_25%,var(--popover))] *:data-[slot=bubble-content]:bg-brand-soft *:data-[slot=bubble-content]:text-foreground",
				outline:
					"*:data-[slot=bubble-content]:border-input *:data-[slot=bubble-content]:bg-transparent [&>[data-slot=bubble-content]:is(button,a):hover]:bg-accent",
				// Ghost keeps its vertical padding so avatars line up with the first line.
				ghost:
					"*:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:px-0 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-accent",
				destructive:
					"*:data-[slot=bubble-content]:border-[color-mix(in_srgb,var(--destructive)_30%,var(--popover))] *:data-[slot=bubble-content]:bg-destructive-soft *:data-[slot=bubble-content]:text-destructive-text",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type BubbleVariant = VariantProps<typeof bubbleVariants>["variant"];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		align = "start",
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: BubbleVariant;
		align?: "start" | "end";
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="bubble"
	data-variant={variant}
	data-align={align}
	class={cn(bubbleVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
