"use client";

import { cn } from "cn";
import type * as React from "react";

import {
	type Elevation,
	SurfaceProvider,
	useElevation,
} from "@/components/ui/elevation";

// ✦ depth (v4): surface role. A card inside a raised/floating surface resolves flat (no bevel on bevel).
const cardElevation = {
	sunken: "border-sk-bd bg-sk-bg shadow-sunken",
	flat: "",
	raised: "border-transparent shadow-raised",
	floating: "border-transparent shadow-floating",
};

function Card({
	className,
	size = "default",
	elevation,
	children,
	...props
}: React.ComponentProps<"div"> & {
	size?: "default" | "sm";
	/** ✦ depth: sunken -1, flat 0, raised +1 (bevel), floating +2 (bevel + drop). */
	elevation?: Elevation;
}) {
	const level = useElevation(elevation, "surface");
	return (
		<div
			data-slot="card"
			data-size={size}
			className={cn(
				// Flat by default (border only). Spacing: 22px default, 16px sm.
				"group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl border border-border bg-card py-(--card-spacing) text-sm text-card-foreground [--card-spacing:22px] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:16px] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
				cardElevation[level],
				className,
			)}
			{...props}
		>
			<SurfaceProvider level={level}>{children}</SurfaceProvider>
		</div>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
				className,
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn(
				"text-base leading-snug font-semibold tracking-[-0.2px] group-data-[size=sm]/card:text-sm",
				className,
			)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-[13px] text-muted-foreground", className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				className,
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn("px-(--card-spacing)", className)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn(
				"flex items-center gap-2 rounded-b-xl border-t border-border bg-[color-mix(in_srgb,var(--muted)_60%,var(--card))] p-(--card-spacing)",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
};
