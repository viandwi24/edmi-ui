<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { getQuestionnaireRootContext } from "./use-questionnaire.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: Omit<WithElementRef<HTMLAttributes<HTMLDivElement>>, "children"> & {
		children?: Snippet<[{ current: number; first: boolean; last: boolean; total: number }]>;
	} = $props();

	const root = getQuestionnaireRootContext();
	const label = $derived(root.total ? `Question ${root.current} of ${root.total}` : undefined);
</script>

<div
	bind:this={ref}
	aria-label="Questionnaire progress"
	aria-live="polite"
	data-slot="questionnaire-progress"
	role="progressbar"
	aria-valuemax={root.total || undefined}
	aria-valuemin={root.total ? 1 : undefined}
	aria-valuenow={root.total ? root.current : undefined}
	aria-valuetext={label}
	data-current={root.current}
	data-first={root.first ? "" : undefined}
	data-last={root.last ? "" : undefined}
	data-total={root.total}
	class={cn(
		"min-h-[1lh] w-fit min-w-[14ch] font-mono text-[11.5px] text-muted-foreground tabular-nums",
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children({
			current: root.current,
			first: root.first,
			last: root.last,
			total: root.total,
		})}
	{:else}
		{label}
	{/if}
</div>
