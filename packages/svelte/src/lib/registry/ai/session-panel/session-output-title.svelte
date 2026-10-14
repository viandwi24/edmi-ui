<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		meta,
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
		/** Small line under the title (`Artifact`). */
		meta?: string | Snippet;
	} = $props();
</script>

<div bind:this={ref} data-slot="ai-session-output-title" class={cn("mt-2", className)} {...restProps}>
	<div class="text-sm">{@render children?.()}</div>
	{#if meta}
		<div class="font-mono text-[12.5px] text-muted-foreground">{#if typeof meta === "string"}{meta}{:else}{@render meta()}{/if}</div>
	{/if}
</div>
