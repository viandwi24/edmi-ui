<script lang="ts" module>
	import { getContext, setContext } from "svelte";
	import { tv, type VariantProps } from "tailwind-variants";

	// Flat by default: the active tab is `--tab-active` + 1px border (with or without a track).
	// `default` = track, `line` = underline, `pills` ✦ = no track. elevation ✦ raised/floating make ONLY the
	// active tab rise (default/pills; `line` ignores it); the level is passed down to every trigger.
	export const tabsListVariants = tv({
		base: "group/tabs-list text-muted-foreground group-data-[orientation=vertical]/tabs:flex-col",
		variants: {
			variant: {
				default: "inline-flex w-fit items-center justify-center gap-0.5 rounded-lg border border-border bg-muted p-[3px] shadow-[inset_0_1px_2px_rgb(0_0_0/0.04)] group-data-[orientation=vertical]/tabs:h-fit",
				line: "flex gap-[22px] border-border group-data-[orientation=horizontal]/tabs:border-b group-data-[orientation=vertical]/tabs:gap-1 group-data-[orientation=vertical]/tabs:border-l",
				// ✦ no track
				pills: "inline-flex w-fit items-center gap-1",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type TabsListVariant = VariantProps<typeof tabsListVariants>["variant"];

	interface TabsListContext {
		variant: NonNullable<TabsListVariant>;
		raised: boolean;
	}

	export function setTabsListCtx(ctx: TabsListContext) {
		setContext("tabsList", ctx);
	}

	export function getTabsListCtx() {
		return getContext<TabsListContext | undefined>("tabsList");
	}
</script>

<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "#lib/utils.js";
	import { type Elevation, useElevation } from "#lib/components/ui/elevation/index.js";

	let {
		ref = $bindable(null),
		variant = "default",
		elevation = "auto",
		class: className,
		...restProps
	}: TabsPrimitive.ListProps & {
		variant?: TabsListVariant;
		/** ✦ depth: raised +1 / floating +2 make the active trigger rise (default/pills). */
		elevation?: Elevation;
	} = $props();

	const level = useElevation(() => elevation, "control");
	const raised = $derived(level.current === "raised" || level.current === "floating");

	setTabsListCtx({
		get variant() {
			return variant ?? "default";
		},
		get raised() {
			return raised;
		},
	});
</script>

<TabsPrimitive.List
	bind:ref
	data-slot="tabs-list"
	data-variant={variant}
	class={cn(tabsListVariants({ variant }), className)}
	{...restProps}
/>
