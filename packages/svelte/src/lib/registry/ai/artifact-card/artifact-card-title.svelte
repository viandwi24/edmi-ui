<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { Shimmer } from "../shimmer/index.js";
	import { getArtifactCardState } from "./use-artifact-card.svelte.js";

	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement> = $props();

	const card = getArtifactCardState();
</script>

<div
	bind:this={ref}
	data-slot="ai-artifact-card-title"
	class={cn("truncate text-[14.5px] font-medium", className)}
	{...restProps}
>
	{#if card.state === "generating"}
		<Shimmer as="span">{#if children}{@render children()}{/if}</Shimmer>
	{:else}
		{@render children?.()}
	{/if}
</div>
