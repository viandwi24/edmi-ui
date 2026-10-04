<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		name,
		version,
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { name: string; version?: string; children?: Snippet } =
		$props();
</script>

<div class={cn("flex items-center justify-between text-sm", className)} {...restProps}>
	{#if children}
		{@render children()}
	{:else}
		<span class="font-mono text-[12.5px] text-muted-foreground">{name}</span>
		{#if version}<span class="font-mono text-xs">{version}</span>{/if}
	{/if}
</div>
