<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span data-slot="ai-voice-selector-name" class={cn("truncate text-left font-medium", className)} {...restProps}>
	{@render children?.()}
</span>
