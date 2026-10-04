"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "cn";
import type * as React from "react";

import {
	type Elevation,
	SurfaceProvider,
	useElevation,
} from "@/registry/edmi/ui/elevation";

// ✦ depth (v4): overlay role. Natural level is floating in layered mode; flat otherwise.
const overlayElevation = {
	sunken: "",
	flat: "",
	raised: "border-transparent shadow-raised",
	floating: "border-transparent shadow-floating",
};

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
	return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
	return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
	className,
	align = "center",
	alignOffset = 0,
	side = "bottom",
	sideOffset = 6,
	elevation,
	children,
	...props
}: PopoverPrimitive.Popup.Props &
	Pick<
		PopoverPrimitive.Positioner.Props,
		"align" | "alignOffset" | "side" | "sideOffset"
	> & {
		/** ✦ depth: flat 0, raised +1 (bevel), floating +2 (bevel + drop). */
		elevation?: Elevation;
	}) {
	const level = useElevation(elevation, "overlay");
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className="isolate z-50"
			>
				<PopoverPrimitive.Popup
					data-slot="popover-content"
					className={cn(
						// Flat (recipes.surface.popover); `elevation` adds the bevel / drop.
						"z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-xl border border-border bg-popover p-3 text-sm text-popover-foreground outline-hidden transition-[opacity,scale] duration-100 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
						overlayElevation[level],
						className,
					)}
					{...props}
				>
					<SurfaceProvider level={level}>{children}</SurfaceProvider>
				</PopoverPrimitive.Popup>
			</PopoverPrimitive.Positioner>
		</PopoverPrimitive.Portal>
	);
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="popover-header"
			className={cn("flex flex-col gap-0.5 text-sm", className)}
			{...props}
		/>
	);
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
	return (
		<PopoverPrimitive.Title
			data-slot="popover-title"
			className={cn("font-medium tracking-[-0.1px]", className)}
			{...props}
		/>
	);
}

function PopoverDescription({
	className,
	...props
}: PopoverPrimitive.Description.Props) {
	return (
		<PopoverPrimitive.Description
			data-slot="popover-description"
			className={cn("text-[13px] text-muted-foreground", className)}
			{...props}
		/>
	);
}

export {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
};
