import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Toggle } from "./Toggle.vue";

const raisedActive =
    "data-[state=on]:[background-image:var(--r1-s-face)] data-[state=on]:[background-origin:border-box] data-[state=on]:border-transparent data-[state=on]:shadow-btn-raised-neutral";

export const toggleVariants = cva(
    "group/toggle inline-flex items-center justify-center gap-1.5 rounded-md border border-transparent text-[13.5px] font-medium whitespace-nowrap text-muted-foreground transition-[background-color,box-shadow,transform] outline-none hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-invalid:border-destructive data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                default: "bg-transparent",
                outline: "border-input bg-transparent text-foreground hover:bg-accent",
                // ✦ Edmi addition: flat item for a ToggleGroup track (DESIGN §4.5)
                segmented: "bg-transparent",
            },
            // ✦ depth (v4): default toggles show depth only when ON, outline toggles rise as a whole
            elevation: {
                flat: "",
                sunken: "",
                raised: "data-[state=on]:shadow-pressed",
                floating: "data-[state=on]:shadow-pressed",
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
                elevation: "raised",
                class:
                    "border-transparent [background-image:var(--r1-s-face)] [background-origin:border-box] shadow-btn-raised-neutral data-[state=on]:bg-none data-[state=on]:bg-accent data-[state=on]:shadow-pressed",
            },
            {
                variant: "outline",
                elevation: "floating",
                class:
                    "border-transparent [background-image:var(--fl-s-face)] [background-origin:border-box] shadow-btn-float-neutral data-[state=on]:bg-none data-[state=on]:bg-accent data-[state=on]:shadow-pressed-float",
            },
            {
                variant: "segmented",
                class:
                    "h-[30px] min-w-[30px] rounded-[7px] px-3 hover:bg-transparent data-[state=on]:translate-y-0 data-[state=on]:border-border data-[state=on]:bg-tab-active data-[state=on]:text-foreground",
            },
            {
                variant: "segmented",
                elevation: ["raised", "floating"],
                class: raisedActive,
            },
        ],
        defaultVariants: {
            variant: "default",
            size: "default",
            elevation: "flat",
        },
    },
);

export type ToggleVariants = VariantProps<typeof toggleVariants>;
