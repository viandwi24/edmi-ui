<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<caption bind:this={ref} data-slot="table-caption" class={cn("border-t border-border p-2.5 text-center text-[13px] text-muted-foreground", className)} {...restProps}>
	{@render children?.()}
</caption>
