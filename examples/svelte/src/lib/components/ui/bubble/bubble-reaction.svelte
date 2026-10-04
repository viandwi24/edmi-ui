<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	/** ✦ Edmi addition: a single solid floating chip (DESIGN §4.6, no ring, 1px border). */
	export const bubbleReactionVariants = tv({
		base: "inline-flex h-[22px] items-center gap-1 rounded-full border border-border bg-popover px-[7px] text-[11.5px] text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
		variants: {
			active: {
				true: "border-[color-mix(in_srgb,var(--brand)_45%,var(--popover))] bg-[color-mix(in_srgb,var(--brand)_14%,var(--popover))] text-brand-text",
				false: "",
			},
			// ✦ elevation: the chip bevels (flat is the default)
			elevation: { flat: "", raised: "border-transparent shadow-btn-raised-neutral" },
		},
		defaultVariants: { active: false, elevation: "flat" },
	});

	export type BubbleReactionVariants = VariantProps<typeof bubbleReactionVariants>;
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import type { Elevation } from "#lib/components/ui/elevation/index.js";
	import { getBubbleReactionsCtx } from "./bubble-reactions.svelte";

	let {
		ref = $bindable(null),
		class: className,
		active = false,
		elevation = "auto",
		children,
		...restProps
	}: WithElementRef<HTMLButtonAttributes> & {
		active?: boolean;
		/** ✦ overrides the BubbleReactions `elevation` for this chip. */
		elevation?: Elevation;
	} = $props();

	const ctx = getBubbleReactionsCtx();
	const isRaised = $derived(
		elevation !== "auto" ? elevation === "raised" || elevation === "floating" : (ctx?.raised ?? false)
	);
</script>

<button
	bind:this={ref}
	data-slot="bubble-reaction"
	data-active={active ? "" : undefined}
	type="button"
	aria-pressed={active}
	class={cn(bubbleReactionVariants({ active, elevation: isRaised ? "raised" : "flat" }), className)}
	{...restProps}
>
	{@render children?.()}
</button>
