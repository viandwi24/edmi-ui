<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import SiteHeaderMark from "./site-header-mark.svelte";

	let {
		ref = $bindable(null),
		class: className,
		logo,
		name = "Stockbreak",
		href = "/",
		raised = false,
		...restProps
	}: WithElementRef<Omit<HTMLAnchorAttributes, "children">, HTMLAnchorElement> & {
		/** Replaces the default mark. */
		logo?: Snippet;
		name?: string;
		/** ✦ forwarded to the default mark. */
		raised?: boolean;
	} = $props();
</script>

<a
	bind:this={ref}
	data-slot="site-header-brand"
	{href}
	class={cn("flex items-center gap-2.5 whitespace-nowrap", className)}
	{...restProps}
>
	{#if logo}{@render logo()}{:else}<SiteHeaderMark {raised} />{/if}
	<span class="font-brand text-xl font-semibold tracking-[-0.4px]">{name}</span>
</a>
