import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const kbdVariants = cva(
	"pointer-events-none inline-flex h-[22px] w-fit min-w-[22px] items-center justify-center gap-1 rounded-[5px] border border-input bg-muted px-1.5 font-mono text-[11.5px] font-medium text-muted-foreground select-none in-data-[slot=tooltip-content]:border-background/20 in-data-[slot=tooltip-content]:bg-background/10 in-data-[slot=tooltip-content]:text-background [&_svg:not([class*='size-'])]:size-3",
	{
		variants: {
			// ✦ opt-in one-step 3D look
			raised: {
				false: "",
				true: "border-b-secondary-lip bg-linear-to-b from-secondary-hi to-muted shadow-[0_1px_0_var(--secondary-lip)] [background-origin:border-box] in-data-[slot=tooltip-content]:border-b-background/20 in-data-[slot=tooltip-content]:from-background/20 in-data-[slot=tooltip-content]:to-background/10 in-data-[slot=tooltip-content]:shadow-none",
			},
		},
		defaultVariants: { raised: false },
	},
);

function Kbd({
	className,
	raised = false,
	...props
}: React.ComponentProps<"kbd"> & VariantProps<typeof kbdVariants>) {
	return (
		<kbd
			data-slot="kbd"
			className={cn(kbdVariants({ raised }), className)}
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
