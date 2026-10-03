import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Button } from "./Button.vue";

// Flat by default (plain shadcn look). `raised` ✦ = one-step 3D: gradient fill + top highlight + ONE hard lip.
// `background-origin: border-box` keeps the gradient from repeating under the border.
const raised = "border bg-linear-to-b [background-origin:border-box]";

export const buttonVariants = cva(
	"group/button relative inline-flex shrink-0 items-center justify-center gap-2 font-medium whitespace-nowrap transition-[filter,transform,box-shadow] outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4",
	{
		variants: {
			variant: {
				default:
					"border border-transparent bg-primary text-primary-foreground hover:bg-[color-mix(in_srgb,var(--primary)_90%,var(--background))] active:brightness-95",
				secondary:
					"border border-transparent bg-secondary text-secondary-foreground hover:bg-accent data-[state=open]:bg-accent",
				outline:
					"border border-input bg-background text-foreground hover:bg-accent data-[state=open]:bg-accent",
				ghost: "text-foreground hover:bg-accent data-[state=open]:bg-accent",
				destructive:
					"border border-transparent bg-destructive text-white hover:bg-[color-mix(in_srgb,var(--destructive)_90%,var(--background))]",
				link: "px-1 text-foreground underline underline-offset-4",
				// ✦ Edmi addition
				brand:
					"border border-transparent bg-brand text-brand-foreground hover:bg-[color-mix(in_srgb,var(--brand)_90%,var(--background))]",
			},
			// ✦ opt-in one-step 3D look
			raised: { false: "", true: "active:translate-y-[2px]" },
			size: {
				default:
					"h-9 rounded-md px-3.5 text-[13.5px] has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
				xs: "h-6 rounded-md px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*=size-])]:size-3.5",
				sm: "h-8 gap-1.5 rounded-[7px] px-3 text-[13px] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*=size-])]:size-3.5",
				lg: "h-[42px] rounded-lg px-5 text-[15px] has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
				icon: "size-9 rounded-md",
				"icon-xs":
					"size-6 rounded-md in-data-[slot=button-group]:rounded-lg [&_svg:not([class*=size-])]:size-3.5",
				"icon-sm":
					"size-8 rounded-[7px] in-data-[slot=button-group]:rounded-lg",
				"icon-lg": "size-[42px] rounded-lg",
			},
		},
		compoundVariants: [
			{
				raised: true,
				variant: "default",
				class: `${raised} border-primary-edge from-primary-hi to-primary border-b-primary-lip shadow-btn-primary hover:brightness-105 active:shadow-pressed active:border-b-primary-edge`,
			},
			{
				raised: true,
				variant: "secondary",
				class: `${raised} border-input from-secondary-hi to-secondary border-b-secondary-lip shadow-btn-secondary hover:from-accent hover:to-accent data-[state=open]:from-accent data-[state=open]:to-accent active:shadow-pressed`,
			},
			{
				raised: true,
				variant: "outline",
				class:
					"bg-linear-to-b from-outline-hi to-outline-face [background-origin:border-box] border-b-outline-lip shadow-btn-outline hover:from-accent hover:to-accent data-[state=open]:from-accent data-[state=open]:to-accent active:shadow-none active:bg-none active:bg-outline-face",
			},
			{
				raised: true,
				variant: "destructive",
				class: `${raised} border-destructive-edge from-destructive-hi to-destructive border-b-destructive-lip shadow-btn-destructive hover:brightness-105 active:shadow-pressed`,
			},
			{
				raised: true,
				variant: "brand",
				class: `${raised} border-brand-edge from-brand-hi to-brand border-b-brand-lip shadow-btn-brand hover:brightness-105 active:shadow-pressed`,
			},
			// ghost & link are never raised
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
export type ButtonVariants = VariantProps<typeof buttonVariants>;
