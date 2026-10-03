<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		time,
		children,
		...restProps
	}: Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
		/** ✦ Mono timestamp (or any label) after the line. */
		time?: string | Snippet;
		children?: Snippet;
	} = $props();
</script>

<div
	data-slot="ai-checkpoint"
	class={cn("flex items-center gap-2.5 overflow-hidden text-muted-foreground", className)}
	{...restProps}
>
	{@render children?.()}
	<Separator class="flex-1" />
	{#if time}
		<span class="shrink-0 font-mono text-[11.5px] text-muted-foreground">
			{#if typeof time === "string"}{time}{:else}{@render time()}{/if}
		</span>
	{/if}
</div>
