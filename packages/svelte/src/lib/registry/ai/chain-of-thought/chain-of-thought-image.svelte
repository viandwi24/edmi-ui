<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		caption,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { caption?: string } = $props();
</script>

<div data-slot="ai-chain-of-thought-image" class={cn("w-fit max-w-full space-y-1", className)} {...restProps}>
	<div
		class="relative flex max-h-[22rem] items-center justify-center overflow-hidden rounded-[10px] border border-border bg-muted"
	>
		{@render children?.()}
	</div>
	{#if caption}
		<p class="text-xs text-muted-foreground">{caption}</p>
	{/if}
</div>
