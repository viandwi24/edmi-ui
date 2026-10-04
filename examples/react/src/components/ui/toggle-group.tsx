"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import type { VariantProps } from "class-variance-authority";
import { cn } from "cn";
import * as React from "react";

import {
	type Elevation,
	type ElevationLevel,
	useElevation,
} from "@/components/ui/elevation";
import { toggleVariants } from "@/components/ui/toggle";

const ToggleGroupContext = React.createContext<
	VariantProps<typeof toggleVariants> & {
		spacing?: number;
		orientation?: "horizontal" | "vertical";
		elevation?: ElevationLevel;
	}
>({
	size: "default",
	variant: "default",
	spacing: 2,
	orientation: "horizontal",
	elevation: undefined,
});

function ToggleGroup({
	className,
	variant,
	size,
	spacing = 2,
	orientation = "horizontal",
	elevation,
	children,
	...props
}: ToggleGroupPrimitive.Props &
	VariantProps<typeof toggleVariants> & {
		spacing?: number;
		orientation?: "horizontal" | "vertical";
		/** ✦ depth, passed down to every item (segmented: only the ON item rises). */
		elevation?: Elevation;
	}) {
	const level = useElevation(elevation, "control");
	// ✦ `variant="segmented"` renders a flat track (DESIGN §4.5); gap is fixed at 2px.
	const segmented = variant === "segmented";
	return (
		<ToggleGroupPrimitive
			data-slot="toggle-group"
			data-variant={variant}
			data-size={size}
			data-spacing={segmented ? 0.5 : spacing}
			data-orientation={orientation}
			style={{ "--gap": segmented ? 0.5 : spacing } as React.CSSProperties}
			className={cn(
				"group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
				segmented &&
					"rounded-[10px] border border-border bg-muted p-[3px] shadow-[inset_0_1px_2px_rgb(0_0_0/0.04)]",
				className,
			)}
			{...props}
		>
			<ToggleGroupContext.Provider
				value={{ variant, size, spacing, orientation, elevation: level }}
			>
				{children}
			</ToggleGroupContext.Provider>
		</ToggleGroupPrimitive>
	);
}

function ToggleGroupItem({
	className,
	children,
	variant = "default",
	size = "default",
	elevation,
	...props
}: TogglePrimitive.Props &
	Omit<VariantProps<typeof toggleVariants>, "elevation"> & {
		elevation?: Elevation;
	}) {
	const context = React.useContext(ToggleGroupContext);

	return (
		<TogglePrimitive
			data-slot="toggle-group-item"
			data-variant={context.variant || variant}
			data-size={context.size || size}
			data-spacing={context.spacing}
			className={cn(
				"shrink-0 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:last:rounded-b-lg group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
				toggleVariants({
					variant: context.variant || variant,
					size: context.size || size,
					elevation:
						elevation && elevation !== "auto" ? elevation : context.elevation,
				}),
				className,
			)}
			{...props}
		>
			{children}
		</TogglePrimitive>
	);
}

export { ToggleGroup, ToggleGroupItem };
