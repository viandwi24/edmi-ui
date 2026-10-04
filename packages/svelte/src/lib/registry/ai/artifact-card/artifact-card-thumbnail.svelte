<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		variant = "paper",
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLSpanElement> & {
		/** `paper`: cropped top of page 1 (always light). `slide`: dark slide. */
		variant?: "paper" | "slide";
	} = $props();

	// Paper is always light (DESIGN 5b rule 5): literal page colors, not themed tokens.
	const PAPER_LINES = [92, 85, 78, 71, 64, 87, 80, 73];
</script>

<span
	data-slot="ai-artifact-card-thumbnail"
	data-variant={variant}
	class={cn(
		"block h-14 w-[52px] shrink-0 overflow-hidden rounded-[calc(var(--radius)*0.9)] border border-border",
		className
	)}
	{...restProps}
>
	<span
		class={cn(
			"box-border block size-full overflow-hidden px-[6px] py-[7px]",
			variant === "paper" ? "bg-white" : "bg-[#14213d]"
		)}
	>
		{#if children}
			{@render children()}
		{:else if variant === "paper"}
			<span class="block h-0.5 w-[40%] rounded-[2px] bg-[#d9d8d2]"></span>
			<span class="mt-[3px] block h-1 w-[88%] rounded-[2px] bg-[#1f1f1d]"></span>
			<span class="mt-[3px] block h-1 w-[63%] rounded-[2px] bg-[#1f1f1d]"></span>
			{#each PAPER_LINES as w (w)}
				<span class="mt-[3px] block h-0.5 rounded-[2px] bg-[#d9d8d2]" style="width: {w}%"></span>
			{/each}
		{:else}
			<span class="block h-0.5 w-[40%] rounded-[2px] bg-[#e39a3c]"></span>
			<span class="mt-3 block h-1 w-[80%] rounded-[2px] bg-white"></span>
			<span class="mt-[3px] block h-1 w-[56%] rounded-[2px] bg-white"></span>
		{/if}
	</span>
</span>
