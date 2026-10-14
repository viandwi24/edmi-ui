<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement> = $props();
</script>

<!-- Scroll area on --muted; documents sit on it as paper. -->
<div
	bind:this={ref}
	data-slot="ai-artifact-viewer-content"
	class={cn("min-h-0 flex-1 overflow-auto bg-muted p-4", className)}
	{...restProps}
>
	{@render children?.()}
</div>
