<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import type { Elevation } from "#lib/components/ui/elevation/index.js";
	import SiteHeaderMark from "./site-header-mark.svelte";

	let {
		ref = $bindable(null),
		class: className,
		logo,
		name,
		href = "/",
		elevation = "auto",
		...restProps
	}: WithElementRef<Omit<HTMLAnchorAttributes, "children">, HTMLAnchorElement> & {
		/** Replaces the default mark. */
		logo?: Snippet;
		/** Brand text or a snippet. */
		name?: string | Snippet;
		/** ✦ depth of the default mark. */
		elevation?: Elevation;
	} = $props();
</script>

<a
	bind:this={ref}
	data-slot="site-header-brand"
	{href}
	class={cn("flex items-center gap-2.5 whitespace-nowrap", className)}
	{...restProps}
>
	{#if logo}{@render logo()}{:else}<SiteHeaderMark {elevation} />{/if}
	{#if name}
		<span class="font-brand text-xl font-semibold tracking-[-0.4px]">
			{#if typeof name === "string"}{name}{:else}{@render name()}{/if}
		</span>
	{/if}
</a>
