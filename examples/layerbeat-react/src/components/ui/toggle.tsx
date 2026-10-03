import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

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
			// ✦ opt-in one-step 3D look
			raised: {
				false: "",
				true: "data-[pressed]:translate-y-px data-[pressed]:shadow-sunk",
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
				raised: true,
				class:
					"bg-linear-to-b from-outline-hi to-outline-face [background-origin:border-box] border-b-outline-lip shadow-btn-outline data-[pressed]:bg-none data-[pressed]:bg-accent data-[pressed]:shadow-sunk",
			},
			{
				variant: "segmented",
				class:
					"h-[30px] min-w-[30px] rounded-[7px] px-3 hover:bg-transparent data-[pressed]:translate-y-0 data-[pressed]:border-border data-[pressed]:bg-tab-active data-[pressed]:text-foreground data-[pressed]:shadow-none",
			},
			{
				variant: "segmented",
				raised: true,
				class:
					"data-[pressed]:border-input data-[pressed]:border-b-secondary-lip data-[pressed]:bg-linear-to-b data-[pressed]:from-secondary-hi data-[pressed]:to-secondary data-[pressed]:shadow-btn-secondary data-[pressed]:[background-origin:border-box]",
			},
		],
		defaultVariants: {
			variant: "default",
			size: "default",
			raised: false,
		},
	},
);

function Toggle({
	className,
	variant = "default",
	size = "default",
	raised = false,
	...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
	return (
		<TogglePrimitive
			data-slot="toggle"
			className={cn(toggleVariants({ variant, size, raised, className }))}
			{...props}
		/>
	);
}

export { Toggle, toggleVariants };
