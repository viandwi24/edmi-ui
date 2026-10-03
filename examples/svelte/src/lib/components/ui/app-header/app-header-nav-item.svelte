<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		active,
		raised = false,
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes, HTMLAnchorElement> & {
		active?: boolean;
		/** ✦ opt-in one-step 3D look for the active pill. */
		raised?: boolean;
	} = $props();
</script>

<!-- Nav pills = `TabsList variant="pills"` look: flat active pill, raised ✦ makes it a 3D secondary button. -->
<a
	bind:this={ref}
	data-slot="app-header-nav-item"
	data-active={active ? "" : undefined}
	aria-current={active ? "page" : undefined}
	class={cn(
		"inline-flex h-8 items-center rounded-[7px] border border-transparent px-[11px] text-[13.5px] font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
		"data-[active]:border-border data-[active]:bg-tab-active data-[active]:text-foreground",
		raised &&
			"data-[active]:border-input data-[active]:border-b-secondary-lip data-[active]:bg-linear-to-b data-[active]:from-secondary-hi data-[active]:to-secondary data-[active]:shadow-btn-secondary data-[active]:[background-origin:border-box]",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</a>
