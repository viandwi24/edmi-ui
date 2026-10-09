<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLButtonAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		active = false,
		children,
		...restProps
	}: WithElementRef<HTMLButtonAttributes> & { active?: boolean } = $props();
</script>

<button
	bind:this={ref}
	type="button"
	data-slot="chart-stat-well"
	data-active={active ? "" : undefined}
	aria-pressed={active}
	class={cn(
		"flex min-w-36 flex-col justify-center gap-0.5 border-border border-l px-6 py-4 text-left text-muted-foreground text-xs outline-none first:border-l-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring [&_b]:font-semibold [&_b]:text-[26px] [&_b]:text-foreground [&_b]:leading-[1.1] [&_b]:tracking-[-0.6px]",
		active && "bg-sk-bg shadow-sunken",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</button>
