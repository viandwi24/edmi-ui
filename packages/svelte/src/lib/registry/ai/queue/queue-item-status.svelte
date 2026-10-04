<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span data-slot="ai-queue-item-status" class={cn("flex shrink-0 items-center gap-2 text-xs text-muted-foreground", className)} {...restProps}>
	{@render children?.()}
</span>
