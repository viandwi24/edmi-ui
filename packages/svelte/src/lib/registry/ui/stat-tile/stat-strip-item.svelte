<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		value,
		label,
		...restProps
	}: WithElementRef<Omit<HTMLAttributes<HTMLDivElement>, "children">> & {
		value: string | number | Snippet;
		label: string | Snippet;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="stat-strip-item"
	class={cn("min-w-[140px] flex-1 border-border px-[22px] py-4 not-first:border-l", className)}
	{...restProps}
>
	<div class="font-mono text-2xl">
		{#if typeof value === "function"}{@render value()}{:else}{value}{/if}
	</div>
	<div class="mt-1 text-xs text-muted-foreground">
		{#if typeof label === "function"}{@render label()}{:else}{label}{/if}
	</div>
</div>
