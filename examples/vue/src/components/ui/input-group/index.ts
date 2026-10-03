import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as InputGroup } from "./InputGroup.vue";
export { default as InputGroupAddon } from "./InputGroupAddon.vue";
export { default as InputGroupButton } from "./InputGroupButton.vue";
export { default as InputGroupInput } from "./InputGroupInput.vue";
export { default as InputGroupText } from "./InputGroupText.vue";
export { default as InputGroupTextarea } from "./InputGroupTextarea.vue";

export const inputGroupAddonVariants = cva(
    "flex h-auto cursor-text items-center justify-center gap-2 text-[13px] font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 has-[>[data-slot=input-group-text]]:bg-muted has-[>[data-slot=input-group-text]]:px-0 [&>kbd]:rounded-[5px] [&>svg:not([class*='size-'])]:size-4",
    {
        variants: {
            align: {
                "inline-start":
                    "order-first pl-3 has-[>[data-slot=input-group-text]]:border-r has-[>[data-slot=input-group-text]]:border-input has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
                "inline-end":
                    "order-last pr-2.5 has-[>[data-slot=input-group-text]]:border-l has-[>[data-slot=input-group-text]]:border-input has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]",
                "block-start":
                    "order-first w-full justify-start px-3 pt-2.5 group-has-[>input]/input-group:pt-2.5 [.border-b]:pb-2.5",
                "block-end":
                    "order-last w-full justify-start px-3 pb-2.5 group-has-[>input]/input-group:pb-2.5 [.border-t]:pt-2.5",
            },
        },
        defaultVariants: {
            align: "inline-start",
        },
    },
);

export type InputGroupVariants = VariantProps<typeof inputGroupAddonVariants>;

export const inputGroupButtonVariants = cva(
    "flex items-center gap-2 text-[13px] shadow-none",
    {
        variants: {
            size: {
                xs: "h-6 gap-1 rounded-md px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
                sm: "",
                "icon-xs": "size-6 rounded-md p-0 has-[>svg]:p-0",
                "icon-sm": "size-8 p-0 has-[>svg]:p-0",
            },
        },
        defaultVariants: {
            size: "xs",
        },
    },
);

export type InputGroupButtonVariants = VariantProps<
    typeof inputGroupButtonVariants
>;
