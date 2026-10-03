<script lang="ts" module>
	import { tv } from "tailwind-variants";

	// tabs.trigger raised: the active trigger becomes a 3D secondary button.
	const raisedActive =
		"data-[state=active]:bg-linear-to-b data-[state=active]:[background-origin:border-box] data-[state=active]:from-secondary-hi data-[state=active]:to-secondary data-[state=active]:border-input data-[state=active]:border-b-secondary-lip data-[state=active]:shadow-btn-secondary";

	export const tabsTriggerVariants = tv({
		base: "relative inline-flex items-center justify-center gap-1.5 text-[13.5px] font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		variants: {
			variant: {
				default: "h-[30px] flex-1 rounded-[7px] border border-transparent px-3.5 data-[state=active]:border-border data-[state=active]:bg-tab-active data-[state=active]:text-foreground",
				line: "-mb-px border-b-2 border-transparent px-0.5 pb-[11px] data-[state=active]:border-foreground data-[state=active]:text-foreground group-data-[orientation=vertical]/tabs:mb-0 group-data-[orientation=vertical]/tabs:-ml-px group-data-[orientation=vertical]/tabs:border-b-0 group-data-[orientation=vertical]/tabs:border-l-2 group-data-[orientation=vertical]/tabs:py-1 group-data-[orientation=vertical]/tabs:pr-0 group-data-[orientation=vertical]/tabs:pl-3",
				// ✦ no track
				pills: "h-8 rounded-[7px] border border-transparent px-3 data-[state=active]:border-border data-[state=active]:bg-tab-active data-[state=active]:text-foreground",
			},
			raised: { false: "", true: "" },
		},
		compoundVariants: [
			{ variant: "default", raised: true, class: raisedActive },
			{ variant: "pills", raised: true, class: raisedActive },
		],
		defaultVariants: { variant: "default", raised: false },
	});
</script>

<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { getTabsListCtx } from "./tabs-list.svelte";

	let {
		ref = $bindable(null),
		class: className,
		raised,
		...restProps
	}: TabsPrimitive.TriggerProps & {
		/** ✦ overrides the TabsList `raised`. */
		raised?: boolean;
	} = $props();

	const ctx = getTabsListCtx();
</script>

<TabsPrimitive.Trigger
	bind:ref
	data-slot="tabs-trigger"
	class={cn(
		tabsTriggerVariants({ variant: ctx?.variant ?? "default", raised: raised ?? ctx?.raised ?? false }),
		className
	)}
	{...restProps}
/>
