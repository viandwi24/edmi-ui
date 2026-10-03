import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type * as React from "react";

// Outline = dashed: add `border border-input` (or `border-[1.5px]`) via className; the dashed style is built in.
function Empty({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty"
			className={cn(
				"flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-[14px] border-dashed p-10 text-center text-balance",
				className,
			)}
			{...props}
		/>
	);
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty-header"
			className={cn("flex max-w-sm flex-col items-center gap-1.5", className)}
			{...props}
		/>
	);
}

const emptyMediaVariants = cva(
	"mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				icon: "size-12 rounded-xl border border-border bg-card text-foreground [&_svg:not([class*='size-'])]:size-5",
			},
			// ✦ opt-in one-step 3D look (only affects variant="icon")
			raised: { false: "", true: "" },
		},
		compoundVariants: [
			{
				variant: "icon",
				raised: true,
				class: "border-b-lip shadow-[0_2px_0_var(--lip)]",
			},
		],
		defaultVariants: {
			variant: "default",
			raised: false,
		},
	},
);

function EmptyMedia({
	className,
	variant = "default",
	raised = false,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
	return (
		<div
			data-slot="empty-icon"
			data-variant={variant}
			className={cn(emptyMediaVariants({ variant, raised, className }))}
			{...props}
		/>
	);
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty-title"
			className={cn("text-[15px] font-semibold tracking-[-0.2px]", className)}
			{...props}
		/>
	);
}

function EmptyDescription({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty-description"
			className={cn(
				"text-[13px]/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
				className,
			)}
			{...props}
		/>
	);
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty-content"
			className={cn(
				"flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-sm text-balance",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
};
