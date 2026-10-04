"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

import { type Elevation, useElevation } from "@/components/ui/elevation";

// ✦ only the ON item of a segmented toggle rises (copied from the v4 recipes)
const raisedActive =
	"data-[pressed]:[background-image:var(--r1-s-face)] data-[pressed]:[background-origin:border-box] data-[pressed]:border-transparent data-[pressed]:shadow-btn-raised-neutral";

const toggleVariants = cva(
	"group/toggle inline-flex items-center justify-center gap-1.5 rounded-md border border-transparent text-[13.5px] font-medium whitespace-nowrap text-muted-foreground transition-[background-color,box-shadow,transform] outline-none hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-invalid:border-destructive data-[pressed]:bg-accent data-[pressed]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline: "border-input bg-transparent text-foreground hover:bg-accent",
				// ✦ Edmi addition: flat item for a ToggleGroup track (DESIGN §4.5)
				segmented: "bg-transparent",
			},
			// ✦ depth (v4): default toggles show depth only when ON, outline toggles rise as a whole
			elevation: {
				flat: "",
				sunken: "",
				raised: "data-[pressed]:shadow-pressed",
				floating: "data-[pressed]:shadow-pressed",
			},
			size: {
				sm: "h-8 min-w-8 px-2 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
				default:
					"h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
				lg: "h-[42px] min-w-[42px] px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
			},
		},
		compoundVariants: [
			{
				variant: "outline",
				elevation: "raised",
				class:
					"border-transparent [background-image:var(--r1-s-face)] [background-origin:border-box] shadow-btn-raised-neutral data-[pressed]:bg-none data-[pressed]:bg-accent data-[pressed]:shadow-pressed",
			},
			{
				variant: "outline",
				elevation: "floating",
				class:
					"border-transparent [background-image:var(--fl-s-face)] [background-origin:border-box] shadow-btn-float-neutral data-[pressed]:bg-none data-[pressed]:bg-accent data-[pressed]:shadow-pressed-float",
			},
			{
				variant: "segmented",
				class:
					"h-[30px] min-w-[30px] rounded-[7px] px-3 hover:bg-transparent data-[pressed]:translate-y-0 data-[pressed]:border-border data-[pressed]:bg-tab-active data-[pressed]:text-foreground",
			},
			{
				variant: "segmented",
				elevation: ["raised", "floating"],
				class: raisedActive,
			},
		],
		defaultVariants: {
			variant: "default",
			size: "default",
			elevation: "flat",
		},
	},
);

function Toggle({
	className,
	variant = "default",
	size = "default",
	elevation,
	...props
}: TogglePrimitive.Props &
	Omit<VariantProps<typeof toggleVariants>, "elevation"> & {
		/** ✦ depth: flat 0, raised +1, floating +2 (default toggles only show it when ON). */
		elevation?: Elevation;
	}) {
	const level = useElevation(
		elevation,
		variant === "outline" ? "button-quiet" : "control",
	);
	return (
		<TogglePrimitive
			data-slot="toggle"
			className={cn(
				toggleVariants({ variant, size, elevation: level, className }),
			)}
			{...props}
		/>
	);
}

export { Toggle, toggleVariants };
