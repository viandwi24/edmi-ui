<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import type { QuestionnaireShortcutMode } from "./use-questionnaire.svelte.js";
	import { getQuestionnaireItemContext } from "./use-questionnaire.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: Omit<WithElementRef<HTMLAttributes<HTMLDivElement>>, "children"> & {
		children?: Snippet<[{ shortcuts: QuestionnaireShortcutMode | null }]>;
	} = $props();

	const item = getQuestionnaireItemContext();
</script>

<div
	bind:this={ref}
	data-slot="questionnaire-choices"
	data-shortcuts={item.shortcuts ?? undefined}
	class={cn("group/questionnaire-choices grid min-w-0 gap-2", className)}
	{...restProps}
>
	{@render children?.({ shortcuts: item.shortcuts })}
</div>
