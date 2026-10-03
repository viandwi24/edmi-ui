import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Bubble } from "./Bubble.vue";
export { default as BubbleContent } from "./BubbleContent.vue";
export { default as BubbleGroup } from "./BubbleGroup.vue";
export { default as BubbleReaction } from "./BubbleReaction.vue";
export { default as BubbleReactions } from "./BubbleReactions.vue";

export const bubbleVariants = cva(
	"group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full",
	{
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
	},
);
export type BubbleVariants = VariantProps<typeof bubbleVariants>;

export const bubbleReactionsVariants = cva(
	"absolute z-10 flex w-fit shrink-0 items-center gap-1",
	{
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
	},
);
export type BubbleReactionsVariants = VariantProps<
	typeof bubbleReactionsVariants
>;

/** ✦ Edmi addition: a single solid floating chip (DESIGN §4.6, no ring, 1px border). */
export const bubbleReactionVariants = cva(
	"inline-flex h-[22px] items-center gap-1 rounded-full border border-border bg-popover px-[7px] text-[11.5px] text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
	{
		variants: {
			active: {
				true: "border-[color-mix(in_srgb,var(--brand)_45%,var(--popover))] bg-[color-mix(in_srgb,var(--brand)_14%,var(--popover))] text-brand-text",
				false: "",
			},
			// ✦ opt-in one-step 3D look
			raised: { false: "", true: "border-b-lip shadow-[0_1px_0_var(--lip)]" },
		},
		defaultVariants: { active: false, raised: false },
	},
);
export type BubbleReactionVariants = VariantProps<
	typeof bubbleReactionVariants
>;
