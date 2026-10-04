<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLParagraphElement> & { children?: Snippet } = $props();
</script>

<p class={cn("mt-1.5 text-xs text-muted-foreground", className)} {...restProps}>
	{@render children?.()}
</p>
