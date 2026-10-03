<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-slot="ai-artifact-viewer-header"
	class={cn(
		"flex h-[46px] shrink-0 items-center gap-1 border-b border-border pr-2 pl-4",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
