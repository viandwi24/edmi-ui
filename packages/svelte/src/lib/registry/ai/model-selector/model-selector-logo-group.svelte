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

<!-- Overlapping logos, each on a solid --card disc with a 1px --border ring. -->
<div
	class={cn(
		"flex shrink-0 items-center -space-x-1 [&>img]:rounded-full [&>img]:border [&>img]:border-border [&>img]:bg-card [&>img]:p-px",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
