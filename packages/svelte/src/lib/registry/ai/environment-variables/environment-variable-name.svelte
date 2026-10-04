<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { useEnvironmentVariableContext } from "./use-environment-variables.svelte.js";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLSpanElement> & { children?: Snippet } = $props();

	const item = useEnvironmentVariableContext();
</script>

<span class={cn("col-start-1 w-[190px] shrink-0 truncate font-mono text-[12.5px]", className)} {...restProps}>
	{#if children}{@render children()}{:else}{item.name}{/if}
</span>
