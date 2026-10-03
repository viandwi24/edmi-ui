<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	// ✦ `variant="card"`: items live inside a raised card with hairline dividers.
	export const accordionVariants = tv({
		base: "flex w-full flex-col",
		variants: {
			variant: {
				default: "",
				card: "rounded-xl border border-border bg-card px-4",
			},
		},
		defaultVariants: { variant: "default" },
	});

	export type AccordionVariant = VariantProps<typeof accordionVariants>["variant"];
</script>

<script lang="ts">
	import { Accordion as AccordionPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		value = $bindable(),
		variant = "default",
		class: className,
		...restProps
	}: AccordionPrimitive.RootProps & { variant?: AccordionVariant } = $props();
</script>

<AccordionPrimitive.Root
	bind:ref
	bind:value={value as never}
	data-slot="accordion"
	data-variant={variant}
	class={cn(accordionVariants({ variant }), className)}
	{...restProps}
/>
