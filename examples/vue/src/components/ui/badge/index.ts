import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Badge } from "./Badge.vue";

export const badgeVariants = cva(
    "group/badge inline-flex h-[22px] w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-md border border-transparent px-2 text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-invalid:border-destructive [&>svg]:pointer-events-none [&_svg]:size-3",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground [a]:hover:bg-primary/85",
                secondary:
                    "border-border bg-secondary text-secondary-foreground [a]:hover:bg-accent",
                destructive:
                    "border-destructive/30 bg-destructive-soft text-destructive-text",
                outline: "border-input text-foreground [a]:hover:bg-accent",
                ghost: "text-foreground hover:bg-accent",
                link: "text-foreground underline underline-offset-[3px] hover:opacity-80",
                // ✦ Edmi additions: soft fill + tinted border, never solid
                brand: "border-brand/30 bg-brand-soft text-brand-text",
                success: "border-success/30 bg-success-soft text-success-text",
                warning: "border-warning/30 bg-warning-soft text-warning-text",
                info: "border-info/30 bg-info-soft text-info-text",
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
export type BadgeVariants = VariantProps<typeof badgeVariants>;
