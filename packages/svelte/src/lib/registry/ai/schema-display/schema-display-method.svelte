<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type HttpMethod, useSchemaDisplayContext } from "./use-schema-display.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> = $props();

	const schema = useSchemaDisplayContext();

	// Solid soft fills, never /NN opacity (DESIGN §4.16). GET success, POST info, PUT/PATCH warning, DELETE destructive.
	const methodStyles: Record<HttpMethod, string> = {
		DELETE: "bg-destructive-soft text-destructive-text",
		GET: "bg-success-soft text-success-text",
		PATCH: "bg-warning-soft text-warning-text",
		POST: "bg-info-soft text-info-text",
		PUT: "bg-warning-soft text-warning-text",
	};
</script>

<span
	bind:this={ref}
	data-slot="ai-schema-display-method"
	data-method={schema.method}
	class={cn(
		"inline-flex rounded-[5px] px-[7px] py-0.5 font-mono text-[11px] font-semibold",
		methodStyles[schema.method],
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		{schema.method}
	{/if}
</span>
