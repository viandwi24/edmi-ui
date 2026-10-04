import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Button } from "./Button.vue";

// Flat by default (plain shadcn look). `elevation` ✦ adds depth (v4): sunken -1, raised +1 (bevel), floating +2 (bevel + soft drop).
// `background-origin: border-box` keeps the gradient from repeating under the transparent border.
// ButtonGroup provides its level to the buttons it contains through this key (a getter object).
export const BUTTON_ELEVATION_KEY = Symbol("EDMI_BUTTON_ELEVATION");

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
			// ✦ depth (v4)
			elevation: {
				flat: "",
				sunken: "",
				raised: "active:translate-y-px",
				floating: "active:translate-y-px",
			},
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
			// +1 raised
			{
				elevation: "raised",
				variant: "default",
				class:
					"border-transparent [background-origin:border-box] [background-image:var(--r1-p-face)] shadow-btn-raised-primary hover:brightness-105 active:shadow-pressed",
			},
			{
				elevation: "raised",
				variant: ["secondary", "outline", "ghost"],
				class:
					"border-transparent [background-origin:border-box] [background-image:var(--r1-s-face)] shadow-btn-raised-neutral active:shadow-pressed",
			},
			{
				elevation: "raised",
				variant: "destructive",
				class:
					"border-transparent [background-origin:border-box] bg-linear-to-b from-destructive-hi to-destructive shadow-btn-raised-color hover:brightness-105 active:shadow-pressed",
			},
			{
				elevation: "raised",
				variant: "brand",
				class:
					"border-transparent [background-origin:border-box] bg-linear-to-b from-brand-hi to-brand shadow-btn-raised-color hover:brightness-105 active:shadow-pressed",
			},
			// +2 floating (one hero action per view)
			{
				elevation: "floating",
				variant: "default",
				class:
					"border-transparent [background-origin:border-box] [background-image:var(--fl-p-face)] shadow-btn-float-primary active:shadow-pressed-float",
			},
			{
				elevation: "floating",
				variant: ["secondary", "outline", "ghost"],
				class:
					"border-transparent [background-origin:border-box] [background-image:var(--fl-s-face)] shadow-btn-float-neutral active:shadow-pressed-float",
			},
			{
				elevation: "floating",
				variant: "destructive",
				class:
					"border-transparent [background-origin:border-box] bg-linear-to-b from-destructive-hi to-destructive shadow-btn-float-color active:shadow-pressed-float",
			},
			{
				elevation: "floating",
				variant: "brand",
				class:
					"border-transparent [background-origin:border-box] bg-linear-to-b from-brand-hi to-brand shadow-btn-float-color active:shadow-pressed-float",
			},
			// -1 sunken: filled variants keep their colour (8% darker) + inset, neutral ones become a well
			{
				elevation: "sunken",
				variant: "default",
				class:
					"border-transparent bg-[color-mix(in_srgb,var(--primary)_92%,#000)] shadow-btn-sunken-filled",
			},
			{
				elevation: "sunken",
				variant: "destructive",
				class:
					"border-transparent bg-[color-mix(in_srgb,var(--destructive)_92%,#000)] shadow-btn-sunken-filled",
			},
			{
				elevation: "sunken",
				variant: "brand",
				class:
					"border-transparent bg-[color-mix(in_srgb,var(--brand)_92%,#000)] shadow-btn-sunken-filled",
			},
			{
				elevation: "sunken",
				variant: ["secondary", "outline", "ghost"],
				class: "border-sk-bd bg-sk-bg shadow-sunken",
			},
			// link never gets depth
			{
				elevation: ["raised", "floating", "sunken"],
				variant: "link",
				class: "bg-none shadow-none active:translate-y-0",
			},
		],
		defaultVariants: {
			variant: "default",
			size: "default",
			elevation: "flat",
		},
	},
);
export type ButtonVariants = VariantProps<typeof buttonVariants>;
