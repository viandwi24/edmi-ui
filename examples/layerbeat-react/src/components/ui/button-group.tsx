"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type * as React from "react";

import { ButtonElevationContext } from "@/components/ui/button";
import { type Elevation, useElevation } from "@/components/ui/elevation";
import { Separator } from "@/components/ui/separator";

const buttonGroupVariants = cva(
	"flex w-fit items-stretch [&>[data-variant=default]+[data-slot=button-group-separator]]:bg-[color-mix(in_srgb,var(--primary-foreground)_25%,var(--primary))] [&>[data-variant=brand]+[data-slot=button-group-separator]]:bg-[color-mix(in_srgb,var(--brand-foreground)_25%,var(--brand))] [&>[data-variant=destructive]+[data-slot=button-group-separator]]:bg-[color-mix(in_srgb,white_25%,var(--destructive))] *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 [&>[data-slot=input-group]]:shadow-none [&>[data-slot=input]]:shadow-none has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
	{
		variants: {
			orientation: {
				horizontal:
					"*:data-slot:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg! [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0",
				vertical:
					"flex-col *:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg! [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0",
			},
		},
		defaultVariants: {
			orientation: "horizontal",
		},
	},
);

function ButtonGroup({
	className,
	orientation,
	elevation,
	...props
}: React.ComponentProps<"div"> &
	VariantProps<typeof buttonGroupVariants> & {
		/** ✦ raised: each item is raised; floating: the whole group floats as one plate (items stay raised). */
		elevation?: Elevation;
	}) {
	const level = useElevation(elevation, "button-filled");
	return (
		<ButtonElevationContext.Provider
			value={
				elevation && elevation !== "auto"
					? level === "floating"
						? "raised"
						: level
					: undefined
			}
		>
			{/* biome-ignore lint/a11y/useSemanticElements: stock markup; a div group avoids fieldset layout quirks */}
			<div
				role="group"
				data-slot="button-group"
				data-orientation={orientation}
				className={cn(
					buttonGroupVariants({ orientation }),
					level === "floating" && "rounded-lg shadow-group-float",
					className,
				)}
				{...props}
			/>
		</ButtonElevationContext.Provider>
	);
}

function ButtonGroupText({
	className,
	render,
	...props
}: useRender.ComponentProps<"div">) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps<"div">(
			{
				className: cn(
					"flex items-center gap-2 rounded-lg border border-input bg-muted px-2.5 text-[13px] font-medium text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
					className,
				),
			},
			props,
		),
		render,
		state: {
			slot: "button-group-text",
		},
	});
}

function ButtonGroupSeparator({
	className,
	orientation = "vertical",
	...props
}: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot="button-group-separator"
			orientation={orientation}
			className={cn(
				"relative self-stretch bg-input data-[orientation=horizontal]:mx-px data-[orientation=horizontal]:w-auto data-[orientation=vertical]:my-px data-[orientation=vertical]:h-auto",
				className,
			)}
			{...props}
		/>
	);
}

export {
	ButtonGroup,
	ButtonGroupSeparator,
	ButtonGroupText,
	buttonGroupVariants,
};
