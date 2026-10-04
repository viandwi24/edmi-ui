import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type * as React from "react";

// Soft fill + tinted 30-40% border for coloured variants, never solid (DESIGN §4.12).
const alertVariants = cva(
	"group/alert relative grid w-full grid-cols-[1fr_auto] items-start gap-x-3 gap-y-0.5 rounded-xl border px-4 py-3.5 text-left text-sm has-[>svg]:grid-cols-[20px_1fr_auto] *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default: "border-border bg-card text-card-foreground",
				destructive:
					"border-[color-mix(in_srgb,var(--destructive)_40%,var(--popover))] bg-destructive-soft text-destructive-text",
				brand:
					"border-[color-mix(in_srgb,var(--brand)_40%,var(--popover))] bg-brand-soft text-brand-text", // ✦
				success:
					"border-[color-mix(in_srgb,var(--success)_40%,var(--popover))] bg-success-soft text-success-text", // ✦
				warning:
					"border-[color-mix(in_srgb,var(--warning)_40%,var(--popover))] bg-warning-soft text-warning-text", // ✦
				info: "border-[color-mix(in_srgb,var(--info)_40%,var(--popover))] bg-info-soft text-info-text", // ✦
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Alert({
	className,
	variant,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot="alert"
			data-variant={variant ?? "default"}
			role="alert"
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	);
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-title"
			className={cn(
				"col-start-1 font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDescription({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-description"
			className={cn(
				"col-start-1 text-[13px] text-balance text-muted-foreground group-has-[>svg]/alert:col-start-2 md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
				"group-data-[variant=destructive]/alert:text-destructive-text/80",
				className,
			)}
			{...props}
		/>
	);
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-action"
			className={cn(
				"col-start-2 row-span-2 row-start-1 self-center group-has-[>svg]/alert:col-start-3",
				className,
			)}
			{...props}
		/>
	);
}

export { Alert, AlertAction, AlertDescription, AlertTitle };
