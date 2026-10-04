<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	// ✦ Row for the name followed by the attributes.
	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div data-slot="ai-voice-selector-header" class={cn("flex items-center gap-1.5", className)} {...restProps}>
	{@render children?.()}
</div>
