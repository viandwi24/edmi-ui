<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { type Elevation, useElevation } from "$lib/registry/ui/elevation/index.js";

	let {
		ref = $bindable(null),
		class: className,
		active,
		elevation = "auto",
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes, HTMLAnchorElement> & {
		active?: boolean;
		/** ✦ raised +1 / floating +2 raise the active pill. */
		elevation?: Elevation;
	} = $props();

	const level = useElevation(() => elevation, "control");
	const raised = $derived(level.current === "raised" || level.current === "floating");
</script>

<!-- Nav pills = `TabsList variant="pills"` look: flat active pill, `elevation` raises the active pill. -->
<a
	bind:this={ref}
	data-slot="app-header-nav-item"
	data-active={active ? "" : undefined}
	aria-current={active ? "page" : undefined}
	class={cn(
		"inline-flex h-8 items-center rounded-[7px] border border-transparent px-[11px] text-[13.5px] font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
		"data-[active]:border-border data-[active]:bg-tab-active data-[active]:text-foreground",
		raised &&
			"data-[active]:border-transparent data-[active]:[background-image:var(--r1-s-face)] data-[active]:shadow-btn-raised-neutral data-[active]:[background-origin:border-box]",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</a>
