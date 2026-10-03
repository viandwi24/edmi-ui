import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const badgeVariants = cva(
	"group/badge inline-flex h-[22px] w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-md border border-transparent px-2 text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-invalid:border-destructive [&>svg]:pointer-events-none [&_svg]:size-3",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground [a]:hover:bg-[color-mix(in_srgb,var(--primary)_85%,var(--background))]",
				secondary:
					"border-border bg-secondary text-secondary-foreground [a]:hover:bg-accent",
				destructive:
					"border-[color-mix(in_srgb,var(--destructive)_30%,var(--popover))] bg-destructive-soft text-destructive-text",
				outline: "border-input text-foreground [a]:hover:bg-accent",
				ghost: "text-foreground hover:bg-accent",
				link: "text-foreground underline underline-offset-[3px] hover:opacity-80",
				// ✦ Edmi additions: soft fill + tinted border, never solid
				brand:
					"border-[color-mix(in_srgb,var(--brand)_30%,var(--popover))] bg-brand-soft text-brand-text",
				success:
					"border-[color-mix(in_srgb,var(--success)_30%,var(--popover))] bg-success-soft text-success-text",
				warning:
					"border-[color-mix(in_srgb,var(--warning)_30%,var(--popover))] bg-warning-soft text-warning-text",
				info: "border-[color-mix(in_srgb,var(--info)_30%,var(--popover))] bg-info-soft text-info-text",
			},
			// ✦ Edmi addition
			shape: {
				default: "",
				pill: "rounded-full",
				number: "min-w-[22px] justify-center px-1.5 font-mono text-[11px]",
			},
		},
		defaultVariants: {
			variant: "default",
			shape: "default",
		},
	},
);

function Badge({
	className,
	variant = "default",
	shape = "default",
	render,
	...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
	return useRender({
		defaultTagName: "span",
		props: mergeProps<"span">(
			{
				className: cn(badgeVariants({ variant, shape }), className),
			},
			props,
		),
		render,
		state: {
			slot: "badge",
			variant,
		},
	});
}

export { Badge, badgeVariants };
