import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import * as React from "react";

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
					"*:data-[slot=bubble-content]:bg-primary *:data-[slot=bubble-content]:text-primary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary/85",
				secondary:
					"*:data-[slot=bubble-content]:border-border *:data-[slot=bubble-content]:bg-secondary *:data-[slot=bubble-content]:text-secondary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-accent",
				muted:
					"*:data-[slot=bubble-content]:bg-muted *:data-[slot=bubble-content]:text-muted-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-accent",
				tinted:
					"*:data-[slot=bubble-content]:border-brand/25 *:data-[slot=bubble-content]:bg-brand-soft *:data-[slot=bubble-content]:text-foreground",
				outline:
					"*:data-[slot=bubble-content]:border-input *:data-[slot=bubble-content]:bg-transparent [&>[data-slot=bubble-content]:is(button,a):hover]:bg-accent",
				// Ghost keeps its vertical padding so avatars line up with the first line.
				ghost:
					"*:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:px-0 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-accent",
				destructive:
					"*:data-[slot=bubble-content]:border-destructive/30 *:data-[slot=bubble-content]:bg-destructive-soft *:data-[slot=bubble-content]:text-destructive-text",
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

// ✦ `raised` on BubbleReactions flows to every BubbleReaction chip.
const BubbleReactionsContext = React.createContext({ raised: false });

function BubbleReactions({
	side = "bottom",
	align = "end",
	raised = false,
	className,
	...props
}: React.ComponentProps<"div"> & {
	raised?: boolean;
	align?: "start" | "end";
	side?: "top" | "bottom";
}) {
	return (
		<BubbleReactionsContext.Provider value={{ raised }}>
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
			// ✦ opt-in one-step 3D look
			raised: { false: "", true: "border-b-lip shadow-[0_1px_0_var(--lip)]" },
		},
		defaultVariants: { active: false, raised: false },
	},
);

function BubbleReaction({
	active = false,
	raised,
	className,
	render,
	...props
}: useRender.ComponentProps<"button"> &
	VariantProps<typeof bubbleReactionVariants>) {
	const context = React.useContext(BubbleReactionsContext);
	return useRender({
		defaultTagName: "button",
		props: mergeProps<"button">(
			{
				type: "button",
				"aria-pressed": !!active,
				className: cn(
					bubbleReactionVariants({ active, raised: raised ?? context.raised }),
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
