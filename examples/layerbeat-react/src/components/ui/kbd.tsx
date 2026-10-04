"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

import { type Elevation, useElevation } from "@/components/ui/elevation";

const kbdVariants = cva(
	"pointer-events-none inline-flex h-[22px] w-fit min-w-[22px] items-center justify-center gap-1 rounded-[5px] border border-input bg-muted px-1.5 font-mono text-[11.5px] font-medium text-muted-foreground select-none in-data-[slot=tooltip-content]:border-[color-mix(in_srgb,var(--background)_20%,var(--primary))] in-data-[slot=tooltip-content]:bg-[color-mix(in_srgb,var(--background)_10%,var(--primary))] in-data-[slot=tooltip-content]:text-background [&_svg:not([class*='size-'])]:size-3",
	{
		variants: {
			// ✦ depth (v4); inside a tooltip the key stays flat
			elevation: {
				flat: "",
				sunken: "",
				raised:
					"border-transparent [background-image:var(--r1-s-face)] [background-origin:border-box] shadow-btn-raised-neutral in-data-[slot=tooltip-content]:bg-none in-data-[slot=tooltip-content]:shadow-none",
				floating:
					"border-transparent [background-image:var(--fl-s-face)] [background-origin:border-box] shadow-btn-float-neutral in-data-[slot=tooltip-content]:bg-none in-data-[slot=tooltip-content]:shadow-none",
			},
		},
		defaultVariants: { elevation: "flat" },
	},
);

function Kbd({
	className,
	elevation,
	...props
}: React.ComponentProps<"kbd"> &
	Omit<VariantProps<typeof kbdVariants>, "elevation"> & {
		/** ✦ depth: flat 0, raised +1, floating +2. */
		elevation?: Elevation;
	}) {
	const level = useElevation(elevation, "handle");
	return (
		<kbd
			data-slot="kbd"
			className={cn(kbdVariants({ elevation: level }), className)}
			{...props}
		/>
	);
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<kbd
			data-slot="kbd-group"
			className={cn("inline-flex items-center gap-1", className)}
			{...props}
		/>
	);
}

export { Kbd, KbdGroup, kbdVariants };
