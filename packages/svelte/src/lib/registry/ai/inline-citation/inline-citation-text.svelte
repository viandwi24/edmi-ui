<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span
	data-slot="ai-inline-citation-text"
	class={cn("transition-colors group-hover/citation:bg-accent", className)}
	{...restProps}
>
	{@render children?.()}
</span>
