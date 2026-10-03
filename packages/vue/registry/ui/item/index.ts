import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Item } from "./Item.vue";
export { default as ItemActions } from "./ItemActions.vue";
export { default as ItemContent } from "./ItemContent.vue";
export { default as ItemDescription } from "./ItemDescription.vue";
export { default as ItemFooter } from "./ItemFooter.vue";
export { default as ItemGroup } from "./ItemGroup.vue";
export { default as ItemHeader } from "./ItemHeader.vue";
export { default as ItemMedia } from "./ItemMedia.vue";
export { default as ItemSeparator } from "./ItemSeparator.vue";
export { default as ItemTitle } from "./ItemTitle.vue";

export const itemVariants = cva(
	"group/item flex w-full flex-wrap items-center rounded-xl border text-sm transition-colors duration-100 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [a]:transition-colors [a]:hover:bg-accent",
	{
		variants: {
			variant: {
				default: "border-transparent",
				outline: "border-border bg-card",
				muted: "border-transparent bg-muted",
			},
			size: {
				default: "gap-3.5 px-4 py-3.5",
				sm: "gap-2.5 px-3 py-2.5",
				xs: "gap-2 px-2.5 py-2 in-data-[slot=dropdown-menu-content]:p-0",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);
export type ItemVariants = VariantProps<typeof itemVariants>;

export const itemMediaVariants = cva(
	"flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				icon: "size-[38px] rounded-[9px] border border-border bg-muted text-foreground group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 group-data-[size=xs]/item:rounded-md [&_svg:not([class*=size-])]:size-4 group-data-[size=xs]/item:[&_svg:not([class*=size-])]:size-3.5",
				image:
					"size-10 overflow-hidden rounded-[9px] group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);
export type ItemMediaVariants = VariantProps<typeof itemMediaVariants>;
