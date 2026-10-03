<script lang="ts" module>
	export type SiteHeaderLink = { label: string; href: string };
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import SiteHeaderBrand from "./site-header-brand.svelte";

	let {
		ref = $bindable(null),
		class: className,
		logo,
		name,
		href,
		lead,
		steps = [],
		links = [],
		action,
		raised = false,
		...restProps
	}: WithElementRef<Omit<HTMLAttributes<HTMLElement>, "children">> & {
		logo?: Snippet;
		name?: string;
		href?: string;
		/** Muted lead-in before the stepped list, e.g. "How to". */
		lead?: string;
		steps?: SiteHeaderLink[];
		links?: SiteHeaderLink[];
		/** Trailing slot, usually a `<Button>`; receives `{ raised }` to forward to the CTA. */
		action?: Snippet<[{ raised: boolean }]>;
		/** ✦ opt-in one-step 3D look (bar, mark; CTA via the `action` snippet argument). */
		raised?: boolean;
	} = $props();
</script>

<!-- Marketing top bar (navbar layout): brand, a muted lead-in with a stepped list, plain links, one CTA. -->
<header
	bind:this={ref}
	data-slot="site-header"
	class={cn(
		"flex w-full items-center justify-between gap-6 rounded-xl border border-border bg-card px-5 py-3.5 text-sm text-card-foreground",
		raised && "border-b-lip shadow-card",
		className
	)}
	{...restProps}
>
	<SiteHeaderBrand {logo} {name} {href} {raised} />
	<nav class="flex items-center gap-1 max-md:hidden" aria-label="Main">
		{#if lead}<span class="text-muted-foreground-2">{lead}</span>{/if}
		{#each steps as s (s.href)}
			<span class="flex items-center">
				<span class="mx-2.5 h-3 w-px bg-border" aria-hidden="true"></span>
				<a href={s.href} class="hover:text-muted-foreground">{s.label}</a>
			</span>
		{/each}
		{#each links as l, i (l.href)}
			<a href={l.href} class={cn("hover:text-muted-foreground", i === 0 ? "ml-7" : "ml-[18px]")}>{l.label}</a>
		{/each}
	</nav>
	{#if action}
		<div class="ml-4 flex items-center">{@render action({ raised })}</div>
	{/if}
</header>
