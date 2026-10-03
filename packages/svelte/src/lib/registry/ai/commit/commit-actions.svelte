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
	role="group"
	class={cn("flex items-center gap-1", className)}
	onclick={(e) => e.stopPropagation()}
	onkeydown={(e) => e.stopPropagation()}
	{...restProps}
>
	{@render children?.()}
</div>
