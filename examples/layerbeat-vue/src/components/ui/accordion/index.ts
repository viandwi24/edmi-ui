import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Accordion } from "./Accordion.vue";
export { default as AccordionContent } from "./AccordionContent.vue";
export { default as AccordionItem } from "./AccordionItem.vue";
export { default as AccordionTrigger } from "./AccordionTrigger.vue";

// ✦ `variant="card"`: items live inside a raised card with hairline dividers.
export const accordionVariants = cva("flex w-full flex-col", {
    variants: {
        variant: {
            default: "",
            card: "rounded-xl border border-border bg-card px-4",
        },
    },
    defaultVariants: { variant: "default" },
});

export type AccordionVariants = VariantProps<typeof accordionVariants>;
