import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import * as React from "react";

function Tabs({
	className,
	orientation = "horizontal",
	...props
}: TabsPrimitive.Root.Props) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			data-orientation={orientation}
			className={cn(
				"group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
				className,
			)}
			{...props}
		/>
	);
}

// Flat by default: the active tab is a --tab-active fill + 1px border, with or without a track.
// ✦ `raised` (on TabsList, flows to the triggers) makes the active tab a one-step 3D secondary button.
// The `line` variant has no track; it underlines the active tab and ignores `raised`.
const tabsListVariants = cva(
	"group/tabs-list text-muted-foreground group-data-[orientation=vertical]/tabs:flex-col",
	{
		variants: {
			variant: {
				default:
					"inline-flex w-fit items-center justify-center gap-0.5 rounded-lg border border-border bg-muted p-[3px] shadow-sunk group-data-[orientation=vertical]/tabs:h-fit",
				line: "flex gap-[22px] border-border group-data-[orientation=horizontal]/tabs:border-b group-data-[orientation=vertical]/tabs:gap-1 group-data-[orientation=vertical]/tabs:border-l",
				// ✦ no track
				pills:
					"inline-flex w-fit items-center gap-1 group-data-[orientation=vertical]/tabs:h-fit",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const raisedActive =
	"data-[active]:border-input data-[active]:border-b-secondary-lip data-[active]:bg-linear-to-b data-[active]:from-secondary-hi data-[active]:to-secondary data-[active]:shadow-btn-secondary data-[active]:[background-origin:border-box]";

const tabsTriggerVariants = cva(
	"relative inline-flex items-center justify-center gap-1.5 text-[13.5px] font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default:
					"h-[30px] flex-1 rounded-[7px] border border-transparent px-3.5 data-[active]:border-border data-[active]:bg-tab-active data-[active]:text-foreground",
				line: "-mb-px border-b-2 border-transparent px-0.5 pb-[11px] data-[active]:border-foreground data-[active]:text-foreground group-data-[orientation=vertical]/tabs:mb-0 group-data-[orientation=vertical]/tabs:-ml-px group-data-[orientation=vertical]/tabs:border-b-0 group-data-[orientation=vertical]/tabs:border-l-2 group-data-[orientation=vertical]/tabs:py-1 group-data-[orientation=vertical]/tabs:pr-0 group-data-[orientation=vertical]/tabs:pl-3",
				pills:
					"h-8 rounded-[7px] border border-transparent px-3 data-[active]:border-border data-[active]:bg-tab-active data-[active]:text-foreground",
			},
			// ✦ the TabsList `raised` prop, passed down to each trigger
			raised: { false: "", true: "" },
		},
		compoundVariants: [
			{ variant: "default", raised: true, class: raisedActive },
			{ variant: "pills", raised: true, class: raisedActive },
		],
		defaultVariants: { variant: "default", raised: false },
	},
);

const TabsListContext = React.createContext<{
	variant: "default" | "line" | "pills";
	raised: boolean;
}>({ variant: "default", raised: false });

function TabsList({
	className,
	variant = "default",
	raised = false,
	activateOnFocus = true,
	...props
}: TabsPrimitive.List.Props &
	VariantProps<typeof tabsListVariants> & {
		/** ✦ one-step 3D look for the active tab (ignored by `line`). */
		raised?: boolean;
	}) {
	return (
		<TabsListContext.Provider value={{ variant: variant ?? "default", raised }}>
			<TabsPrimitive.List
				data-slot="tabs-list"
				data-variant={variant}
				activateOnFocus={activateOnFocus}
				className={cn(tabsListVariants({ variant }), className)}
				{...props}
			/>
		</TabsListContext.Provider>
	);
}

function TabsTrigger({
	className,
	raised,
	...props
}: TabsPrimitive.Tab.Props & { raised?: boolean }) {
	const context = React.useContext(TabsListContext);
	return (
		<TabsPrimitive.Tab
			data-slot="tabs-trigger"
			className={cn(
				tabsTriggerVariants({
					variant: context.variant,
					raised: raised ?? context.raised,
				}),
				className,
			)}
			{...props}
		/>
	);
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
	return (
		<TabsPrimitive.Panel
			data-slot="tabs-content"
			className={cn("flex-1 text-sm outline-none", className)}
			{...props}
		/>
	);
}

export {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	tabsListVariants,
	tabsTriggerVariants,
};
