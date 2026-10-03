import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

// Flat by default. `raised` ✦ adds the one-step 3D look: gradient fill + 1px top highlight + ONE hard lip.
// `background-origin: border-box` keeps the gradient from repeating under the border.
const raised = "border bg-linear-to-b [background-origin:border-box]";

const buttonVariants = cva(
	"group/button relative inline-flex shrink-0 items-center justify-center gap-2 font-medium whitespace-nowrap transition-[filter,transform,box-shadow] outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default:
					"border border-transparent bg-primary text-primary-foreground hover:bg-primary/90 active:brightness-95",
				secondary:
					"border border-transparent bg-secondary text-secondary-foreground hover:bg-accent data-[popup-open]:bg-accent",
				outline:
					"border border-input bg-background text-foreground hover:bg-accent data-[popup-open]:bg-accent",
				ghost: "text-foreground hover:bg-accent data-[popup-open]:bg-accent",
				destructive:
					"border border-transparent bg-destructive text-white hover:bg-destructive/90",
				link: "px-1 text-foreground underline underline-offset-4",
				// ✦ Edmi addition
				brand:
					"border border-transparent bg-brand text-brand-foreground hover:bg-brand/90",
			},
			// ✦ opt-in one-step 3D look
			raised: { false: "", true: "active:translate-y-[2px]" },
			size: {
				default:
					"h-9 rounded-md px-3.5 text-[13.5px] has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
				xs: "h-6 rounded-md px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
				sm: "h-8 gap-1.5 rounded-[7px] px-3 text-[13px] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
				lg: "h-[42px] rounded-lg px-5 text-[15px] has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
				icon: "size-9 rounded-md",
				"icon-xs":
					"size-6 rounded-md in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3.5",
				"icon-sm":
					"size-8 rounded-[7px] in-data-[slot=button-group]:rounded-lg",
				"icon-lg": "size-[42px] rounded-lg",
			},
		},
		compoundVariants: [
			{
				raised: true,
				variant: "default",
				class: `${raised} border-primary-edge border-b-primary-lip from-primary-hi to-primary shadow-btn-primary hover:brightness-105 active:border-b-primary-edge active:shadow-pressed`,
			},
			{
				raised: true,
				variant: "secondary",
				class: `${raised} border-input border-b-secondary-lip from-secondary-hi to-secondary shadow-btn-secondary hover:from-accent hover:to-accent data-[popup-open]:from-accent data-[popup-open]:to-accent active:shadow-pressed`,
			},
			{
				raised: true,
				variant: "outline",
				class: "border-b-lip shadow-btn-outline active:shadow-none",
			},
			{
				raised: true,
				variant: "destructive",
				class: `${raised} border-destructive-edge border-b-destructive-lip from-destructive-hi to-destructive shadow-btn-destructive hover:brightness-105 active:shadow-pressed`,
			},
			{
				raised: true,
				variant: "brand",
				class: `${raised} border-brand-edge border-b-brand-lip from-brand-hi to-brand shadow-btn-brand hover:brightness-105 active:shadow-pressed`,
			},
			// ghost & link never get raised
			{
				raised: true,
				variant: ["ghost", "link"],
				class: "active:translate-y-0",
			},
		],
		defaultVariants: {
			variant: "default",
			size: "default",
			raised: false,
		},
	},
);

function Button({
	className,
	variant = "default",
	size = "default",
	raised = false,
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, raised, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
