<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { CardDescription } from "$lib/registry/ui/card/index.js";
	import type { ComponentProps } from "svelte";
	import { Shimmer } from "../shimmer/index.js";
	import { usePlan } from "./use-plan.svelte.js";

	let { class: className, children, ...restProps }: ComponentProps<typeof CardDescription> = $props();

	const plan = usePlan();
</script>

<CardDescription data-slot="ai-plan-description" class={cn("text-xs text-balance", className)} {...restProps}>
	{#if plan.isStreaming}
		<Shimmer as="span">{@render children?.()}</Shimmer>
	{:else}
		{@render children?.()}
	{/if}
</CardDescription>
