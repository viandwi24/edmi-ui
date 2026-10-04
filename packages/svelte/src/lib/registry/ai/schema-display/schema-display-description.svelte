<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { useSchemaDisplayContext } from "./use-schema-display.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> = $props();

	const schema = useSchemaDisplayContext();
</script>

<p
	bind:this={ref}
	data-slot="ai-schema-display-description"
	class={cn("-mt-2 px-4 pb-3.5 text-xs text-muted-foreground", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		{schema.description}
	{/if}
</p>
