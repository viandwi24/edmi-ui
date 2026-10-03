<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { CardTitle } from "$lib/registry/ui/card/index.js";
	import type { ComponentProps } from "svelte";
	import { Shimmer } from "../shimmer/index.js";
	import { usePlan } from "./use-plan.svelte.js";

	let { class: className, children, ...restProps }: ComponentProps<typeof CardTitle> = $props();

	const plan = usePlan();
</script>

<CardTitle data-slot="ai-plan-title" class={cn("text-[15px]", className)} {...restProps}>
	{#if plan.isStreaming}
		<Shimmer as="span">{@render children?.()}</Shimmer>
	{:else}
		{@render children?.()}
	{/if}
</CardTitle>
