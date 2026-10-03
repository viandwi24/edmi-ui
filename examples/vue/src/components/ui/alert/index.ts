import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Alert } from "./Alert.vue";
export { default as AlertAction } from "./AlertAction.vue";
export { default as AlertDescription } from "./AlertDescription.vue";
export { default as AlertTitle } from "./AlertTitle.vue";

// Soft fill + tinted 30-40% border for coloured variants, never solid (DESIGN 4.12).
export const alertVariants = cva(
    "group/alert relative grid w-full grid-cols-[1fr_auto] items-start gap-x-3 gap-y-0.5 rounded-xl border px-4 py-3.5 text-left text-sm has-[>svg]:grid-cols-[20px_1fr_auto] *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                default: "border-border bg-card text-card-foreground",
                destructive:
                    "border-destructive/40 bg-destructive-soft text-destructive-text",
                brand: "border-brand/40 bg-brand-soft text-brand-text", // ✦
                warning: "border-warning/40 bg-warning-soft text-warning-text", // ✦
                info: "border-info/40 bg-info-soft text-info-text", // ✦
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

export type AlertVariants = VariantProps<typeof alertVariants>;
