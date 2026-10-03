<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<!-- Scroll area on --muted; documents sit on it as paper. -->
<div
	data-slot="ai-artifact-viewer-content"
	class={cn("min-h-0 flex-1 overflow-auto bg-muted p-4", className)}
	{...restProps}
>
	{@render children?.()}
</div>
