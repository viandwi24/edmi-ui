<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
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
		"min-w-0 flex-1 truncate font-mono text-[12.5px]",
		!list.showValues && "tracking-[2px] text-muted-foreground select-none",
		className
	)}
	{...restProps}
>
	{#if children}{@render children()}{:else}{display}{/if}
</span>
