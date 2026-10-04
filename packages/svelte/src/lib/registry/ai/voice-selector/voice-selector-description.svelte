<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span data-slot="ai-voice-selector-description" class={cn("text-[12.5px] text-muted-foreground", className)} {...restProps}>
	{@render children?.()}
</span>
