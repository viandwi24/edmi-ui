<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import {
		useEnvironmentVariableContext,
		useEnvironmentVariablesContext,
	} from "./use-environment-variables.svelte.js";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLSpanElement> & { children?: Snippet } = $props();

	const item = useEnvironmentVariableContext();
	const list = useEnvironmentVariablesContext();

	// Masked values use a fixed length so the real length never leaks.
	const display = $derived(list.showValues ? item.value : "•".repeat(12));
</script>

<span
	class={cn(
		"col-start-3 min-w-0 truncate font-mono text-[12.5px]",
		!list.showValues && "tracking-[2px] text-muted-foreground select-none",
		className
	)}
	{...restProps}
>
	{#if children}{@render children()}{:else}{display}{/if}
</span>
