<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		completed = false,
		...restProps
	}: HTMLAttributes<HTMLSpanElement> & { completed?: boolean } = $props();
</script>

<span
	data-slot="ai-queue-item-indicator"
	class={cn(
		"mt-0.5 inline-block size-3.5 shrink-0 rounded-full border-[1.5px]",
		completed
			? "border-[color-mix(in_srgb,var(--success)_40%,var(--popover))] bg-success-soft"
			: "border-muted-foreground-2",
		className
	)}
	{...restProps}
></span>
