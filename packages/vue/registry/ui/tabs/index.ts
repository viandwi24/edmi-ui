import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Tabs } from "./Tabs.vue";
export { default as TabsContent } from "./TabsContent.vue";
export { default as TabsList } from "./TabsList.vue";
export { default as TabsTrigger } from "./TabsTrigger.vue";

// Flat by default: the active tab is a --tab-active fill + 1px border (with a track for `default`, without for `pills`).
// `line` has no track; it underlines the active tab. `raised` ✦ (on TabsList or a trigger) makes the active
// `default`/`pills` trigger a one-step 3D secondary button; `line` ignores it.
export const tabsListVariants = cva(
	"group/tabs-list text-muted-foreground group-data-[orientation=vertical]/tabs:flex-col",
	{
		variants: {
			variant: {
				default:
					"inline-flex w-fit items-center justify-center gap-0.5 rounded-lg border border-border bg-muted p-[3px] shadow-sunk group-data-[orientation=vertical]/tabs:h-fit",
				// ✦ no track
				pills:
					"inline-flex w-fit items-center gap-1 group-data-[orientation=vertical]/tabs:h-fit",
				line: "flex gap-[22px] border-border group-data-[orientation=horizontal]/tabs:border-b group-data-[orientation=vertical]/tabs:gap-1 group-data-[orientation=vertical]/tabs:border-l",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export type TabsListVariants = VariantProps<typeof tabsListVariants>;
