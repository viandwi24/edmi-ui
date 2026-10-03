<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { getQuestionnaireItemContext } from "./use-questionnaire.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		id: idProp = undefined,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLParagraphElement>> = $props();

	const item = getQuestionnaireItemContext();
	const fallbackId = $props.id();
	const id = $derived(idProp ?? fallbackId);

	$effect(() => item.registerDescription(id));
</script>

<p
	bind:this={ref}
	{id}
	data-slot="questionnaire-description"
	class={cn("text-sm text-pretty text-muted-foreground", className)}
	{...restProps}
>
	{@render children?.()}
</p>
