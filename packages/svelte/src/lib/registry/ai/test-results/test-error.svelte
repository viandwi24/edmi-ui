<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="ai-test-error"
	class={cn(
		"mt-1 mb-1.5 ml-[22px] basis-full rounded-md bg-destructive-soft px-3 py-2.5 font-mono text-xs leading-[1.6] text-destructive-text",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
