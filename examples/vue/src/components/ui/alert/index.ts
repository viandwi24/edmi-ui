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
                    "border-[color-mix(in_srgb,var(--destructive)_40%,var(--popover))] bg-destructive-soft text-destructive-text",
                brand:
                    "border-[color-mix(in_srgb,var(--brand)_40%,var(--popover))] bg-brand-soft text-brand-text", // ✦
                success:
                    "border-[color-mix(in_srgb,var(--success)_40%,var(--popover))] bg-success-soft text-success-text", // ✦
                warning:
                    "border-[color-mix(in_srgb,var(--warning)_40%,var(--popover))] bg-warning-soft text-warning-text", // ✦
                info: "border-[color-mix(in_srgb,var(--info)_40%,var(--popover))] bg-info-soft text-info-text", // ✦
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

export type AlertVariants = VariantProps<typeof alertVariants>;
