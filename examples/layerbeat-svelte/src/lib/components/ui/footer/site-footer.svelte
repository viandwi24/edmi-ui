<script lang="ts" module>
	export type FooterLink = { label: string; href: string };
	export type FooterColumn = { title: string; links: FooterLink[] };
</script>

<script lang="ts">
	import { cn } from "#lib/utils.js";
	import { Card } from "#lib/components/ui/card/index.js";
	import { Separator } from "#lib/components/ui/separator/index.js";
	import type { ComponentProps, Snippet } from "svelte";

	let {
		class: className,
		brand,
		description,
		socials,
		columns,
		legal,
		note,
		...restProps
	}: Omit<ComponentProps<typeof Card>, "title" | "children"> & {
		/** Brand lockup (logo + wordmark). */
		brand?: Snippet;
		description?: string;
		/** Social icon buttons slot. */
		socials?: Snippet;
		columns?: FooterColumn[];
		/** Bottom-left legal line. */
		legal?: string | Snippet;
		/** Bottom-right note. */
		note?: string | Snippet;
	} = $props();
</script>

{#snippet text(v: string | Snippet | undefined)}
	{#if typeof v === "function"}{@render v()}{:else}{v}{/if}
{/snippet}

<Card data-slot="site-footer" class={cn("gap-0 px-8 py-7", className)} {...restProps}>
	<div class="flex flex-wrap justify-between gap-8">
		<div class="flex flex-col gap-3">
			{@render brand?.()}
			{#if description}
				<span class="max-w-[260px] text-[12.5px] text-muted-foreground">{description}</span>
			{/if}
			{#if socials}
				<div class="flex items-center gap-2">{@render socials()}</div>
			{/if}
		</div>
		{#each columns ?? [] as col, i (i)}
			<nav class="flex flex-col gap-2 text-[13.5px]">
				<span class="text-xs text-muted-foreground">{col.title}</span>
				{#each col.links as l (l.href + l.label)}
					<a href={l.href} class="w-fit hover:text-foreground-2">{l.label}</a>
				{/each}
			</nav>
		{/each}
	</div>
	{#if legal || note}
		<Separator class="mt-[22px] mb-3.5" />
		<div class="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
			<span>{@render text(legal)}</span>
			<span>{@render text(note)}</span>
		</div>
	{/if}
</Card>
