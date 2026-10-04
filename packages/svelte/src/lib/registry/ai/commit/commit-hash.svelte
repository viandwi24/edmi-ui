<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLSpanElement> & { children?: Snippet } = $props();
</script>

<span class={cn("inline-flex h-6 shrink-0 items-center gap-1.5 rounded-md border border-input px-2 font-mono text-xs text-foreground", className)} {...restProps}>
	{@render children?.()}
</span>
