<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
</script>

<div
	data-slot="ai-code-block-header"
	class={cn(
		"flex h-[38px] items-center justify-between gap-2 border-b border-border bg-muted pr-1.5 pl-3 text-[12.5px] text-muted-foreground",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
