<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div data-slot="ai-queue-item-actions" class={cn("flex gap-0.5", className)} {...restProps}>
	{@render children?.()}
</div>
