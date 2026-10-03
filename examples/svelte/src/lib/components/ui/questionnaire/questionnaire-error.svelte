<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { getQuestionnaireItemContext } from "./use-questionnaire.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		id: idProp = undefined,
		children,
		...restProps
	}: Omit<WithElementRef<HTMLAttributes<HTMLParagraphElement>>, "children"> & {
		children?: Snippet<[{ invalid: boolean }]>;
	} = $props();

	const item = getQuestionnaireItemContext();
	const fallbackId = $props.id();
	const id = $derived(idProp ?? fallbackId);
	const fallback = $derived(
		item.required ? "Choose an answer to continue." : "Choose an answer or skip this question."
	);

	$effect(() => item.registerError(id));
</script>

<p
	bind:this={ref}
	{id}
	data-slot="questionnaire-error"
	data-invalid={item.invalid ? "" : undefined}
	hidden={!item.invalid}
	role={item.invalid ? "alert" : undefined}
	class={cn("text-sm text-destructive-text", className)}
	{...restProps}
>
	{#if children}
		{@render children({ invalid: item.invalid })}
	{:else}
		{fallback}
	{/if}
</p>
