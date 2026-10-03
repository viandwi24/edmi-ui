<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<!-- A white page, in light and dark mode alike (DESIGN 5b rule 5). -->
<div
	data-slot="ai-artifact-viewer-paper"
	class={cn(
		"w-full rounded-[calc(var(--radius)*0.6)] border border-border bg-white px-10 py-[34px] text-[#1f1f1d]",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
