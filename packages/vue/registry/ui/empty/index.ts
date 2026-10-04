import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Empty } from "./Empty.vue";
export { default as EmptyContent } from "./EmptyContent.vue";
export { default as EmptyDescription } from "./EmptyDescription.vue";
export { default as EmptyHeader } from "./EmptyHeader.vue";
export { default as EmptyMedia } from "./EmptyMedia.vue";
export { default as EmptyTitle } from "./EmptyTitle.vue";

export const emptyMediaVariants = cva(
	"mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				icon: "size-12 rounded-xl border border-border bg-card text-foreground [&_svg:not([class*=size-])]:size-5",
			},
			// ✦ depth (icon variant only): the media tile rises
			elevation: { flat: "", raised: "", floating: "" },
		},
		compoundVariants: [
			{
				variant: "icon",
				elevation: "raised",
				class: "border-transparent shadow-raised",
			},
			{
				variant: "icon",
				elevation: "floating",
				class: "border-transparent shadow-floating",
			},
		],
		defaultVariants: {
			variant: "default",
			elevation: "flat",
		},
	},
);
export type EmptyMediaVariants = VariantProps<typeof emptyMediaVariants>;
