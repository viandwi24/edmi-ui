<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		meta,
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		/** Small line under the title (`Artifact`). */
		meta?: string;
	} = $props();
</script>

<div data-slot="ai-session-output-title" class={cn("mt-2", className)} {...restProps}>
	<div class="text-sm">{@render children?.()}</div>
	{#if meta}
		<div class="font-mono text-[12.5px] text-muted-foreground">{meta}</div>
	{/if}
</div>
