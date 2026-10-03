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

<div data-slot="ai-artifact-header"
	class={cn("flex items-center justify-between gap-2.5 border-b border-border px-3.5 py-3", className)} {...restProps}>
	{@render children?.()}
</div>
