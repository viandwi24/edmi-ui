<script lang="ts" module>
	import { getContext, setContext } from "svelte";
	import { type VariantProps, tv } from "tailwind-variants";

	export const bubbleReactionsVariants = tv({
		base: "absolute z-10 flex w-fit shrink-0 items-center gap-1",
		variants: {
			side: {
				top: "top-0 -translate-y-3/4",
				bottom: "bottom-0 translate-y-3/4",
			},
			align: {
				start: "left-3",
				end: "right-3",
			},
		},
		defaultVariants: {
			side: "bottom",
			align: "end",
		},
	});

	export type BubbleReactionsSide = VariantProps<typeof bubbleReactionsVariants>["side"];
	export type BubbleReactionsAlign = VariantProps<typeof bubbleReactionsVariants>["align"];

	export function setBubbleReactionsCtx(ctx: { raised: boolean }) {
		setContext("bubbleReactions", ctx);
	}

	export function getBubbleReactionsCtx() {
		return getContext<{ raised: boolean } | undefined>("bubbleReactions");
	}
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type Elevation, useElevation } from "$lib/registry/ui/elevation/index.js";

	let {
		ref = $bindable(null),
		class: className,
		side = "bottom",
		align = "end",
		elevation = "auto",
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		side?: BubbleReactionsSide;
		align?: BubbleReactionsAlign;
		/** ✦ depth of the chips: raised +1 / floating +2 bevel every `BubbleReaction` chip. */
		elevation?: Elevation;
	} = $props();

	const level = useElevation(() => elevation, "control");
	const raised = $derived(level.current === "raised" || level.current === "floating");

	setBubbleReactionsCtx({
		get raised() {
			return raised;
		},
	});
</script>

<div
	bind:this={ref}
	data-slot="bubble-reactions"
	data-align={align}
	data-side={side}
	class={cn(bubbleReactionsVariants({ side, align }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
