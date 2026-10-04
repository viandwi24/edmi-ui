<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-slot="ai-inline-citation-header"
	class={cn("flex items-center gap-0.5 border-b border-border px-2.5 py-2", className)}
	{...restProps}
>
	{@render children?.()}
</div>
