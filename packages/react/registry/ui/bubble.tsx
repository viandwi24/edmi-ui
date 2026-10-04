import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import * as React from "react";
import { type Elevation, useElevation } from "@/registry/edmi/ui/elevation";

function BubbleGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="bubble-group"
			className={cn("flex min-w-0 flex-col gap-2", className)}
			{...props}
		/>
	);
}

const bubbleVariants = cva(
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

function Bubble({
	variant = "default",
	align = "start",
	className,
	...props
}: React.ComponentProps<"div"> &
	VariantProps<typeof bubbleVariants> & {
		align?: "start" | "end";
	}) {
	return (
		<div
			data-slot="bubble"
			data-variant={variant}
			data-align={align}
			className={cn(bubbleVariants({ variant }), className)}
			{...props}
		/>
	);
}

function BubbleContent({
	className,
	render,
	...props
}: useRender.ComponentProps<"div">) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps<"div">(
			{
				className: cn(
					"w-fit max-w-full min-w-0 overflow-hidden rounded-2xl border border-transparent px-[13px] py-[9px] text-sm leading-normal wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-left [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:outline-2 [button,a]:focus-visible:outline-offset-2 [button,a]:focus-visible:outline-ring",
					className,
				),
			},
			props,
		),
		render,
		state: {
			slot: "bubble-content",
		},
	});
}

const bubbleReactionsVariants = cva(
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

// ✦ `elevation` on BubbleReactions flows to every BubbleReaction chip.
const BubbleReactionsContext = React.createContext<{ raised: boolean }>({
	raised: false,
});

function BubbleReactions({
	side = "bottom",
	align = "end",
	elevation,
	className,
	...props
}: React.ComponentProps<"div"> & {
	/** ✦ depth of the chips: raised +1 / floating +2 bevel every chip (`active` kept). */
	elevation?: Elevation;
	align?: "start" | "end";
	side?: "top" | "bottom";
}) {
	const level = useElevation(elevation, "control");
	return (
		<BubbleReactionsContext.Provider
			value={{ raised: level === "raised" || level === "floating" }}
		>
			<div
				data-slot="bubble-reactions"
				data-align={align}
				data-side={side}
				className={cn(bubbleReactionsVariants({ side, align }), className)}
				{...props}
			/>
		</BubbleReactionsContext.Provider>
	);
}

/** ✦ Edmi addition: a single solid floating chip (DESIGN §4.6, no ring, 1px border). */
const bubbleReactionVariants = cva(
	"inline-flex h-[22px] items-center gap-1 rounded-full border border-border bg-popover px-[7px] text-[11.5px] text-foreground",
	{
		variants: {
			active: {
				true: "border-[color-mix(in_srgb,var(--brand)_45%,var(--popover))] bg-[color-mix(in_srgb,var(--brand)_14%,var(--popover))] text-brand-text",
				false: "",
			},
			// ✦ elevation: the chip bevels (flat is the default)
			elevation: {
				flat: "",
				raised: "border-transparent shadow-btn-raised-neutral",
			},
		},
		defaultVariants: { active: false, elevation: "flat" },
	},
);

function BubbleReaction({
	active = false,
	elevation,
	className,
	render,
	...props
}: useRender.ComponentProps<"button"> & {
	active?: boolean;
	/** ✦ depth of this chip; defaults to the BubbleReactions level. */
	elevation?: Elevation;
}) {
	const context = React.useContext(BubbleReactionsContext);
	const own =
		elevation && elevation !== "auto"
			? elevation === "raised" || elevation === "floating"
			: undefined;
	return useRender({
		defaultTagName: "button",
		props: mergeProps<"button">(
			{
				type: "button",
				"aria-pressed": !!active,
				className: cn(
					bubbleReactionVariants({
						active,
						elevation: (own ?? context.raised) ? "raised" : "flat",
					}),
					"outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
					className,
				),
			},
			props,
		),
		render,
		state: { slot: "bubble-reaction", active: !!active },
	});
}

export {
	Bubble,
	BubbleContent,
	BubbleGroup,
	BubbleReaction,
	BubbleReactions,
	bubbleReactionVariants,
	bubbleVariants,
};
