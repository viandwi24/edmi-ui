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

<span class={cn("flex-1 truncate text-left", className)} {...restProps}>
	{@render children?.()}
</span>
