<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { useSchemaDisplayContext } from "./use-schema-display.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> = $props();

	const schema = useSchemaDisplayContext();

	// `{param}` segments are highlighted; everything else is plain text.
	const parts = $derived(
		schema.path
			.split(/(\{[^}]+\})/g)
			.filter(Boolean)
			.map((text) => ({ text, param: text.startsWith("{") }))
	);
</script>

<span
	bind:this={ref}
	data-slot="ai-schema-display-path"
	class={cn("font-mono text-[13.5px]", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		{#each parts as part, index (`${part.text}-${index}`)}
			{#if part.param}<span class="text-chart-2">{part.text}</span>{:else}{part.text}{/if}
		{/each}
	{/if}
</span>
