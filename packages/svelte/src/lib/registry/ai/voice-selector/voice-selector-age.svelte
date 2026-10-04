<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span data-slot="ai-voice-selector-age" class={cn("text-xs text-muted-foreground tabular-nums", className)} {...restProps}>
	{@render children?.()}
</span>
