<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
</script>

<div class={cn("grid grid-cols-[190px_auto_minmax(0,1fr)_auto] gap-x-2.5", className)} {...restProps}>
	{@render children?.()}
</div>
