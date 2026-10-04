<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { setEnvironmentVariablesContext } from "./use-environment-variables.svelte.js";

	let {
		showValues = $bindable(false),
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { showValues?: boolean; children?: Snippet } = $props();

	setEnvironmentVariablesContext({
		get showValues() {
			return showValues;
		},
		setShowValues(show: boolean) {
			showValues = show;
		},
	});
</script>

<div
	data-slot="ai-environment-variables"
	class={cn(
		"overflow-hidden rounded-xl border border-border bg-card text-card-foreground",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
