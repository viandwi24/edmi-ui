<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		title,
		url,
		description,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		title?: string;
		url?: string;
		description?: string;
	} = $props();
</script>

<div data-slot="ai-inline-citation-source" class={cn("space-y-0.5", className)} {...restProps}>
	{#if title}
		<h4 class="truncate text-[13.5px] leading-tight font-semibold">{title}</h4>
	{/if}
	{#if url}
		<p class="truncate font-mono text-[11.5px] text-muted-foreground">{url.replace(/^https?:\/\//, "")}</p>
	{/if}
	{#if description}
		<p class="line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">{description}</p>
	{/if}
	{@render children?.()}
</div>
