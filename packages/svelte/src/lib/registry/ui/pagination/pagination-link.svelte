<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";
	import { buttonVariants, type ButtonSize } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import type { Elevation } from "$lib/registry/ui/elevation/index.js";
	import { getPaginationCtx } from "./pagination.svelte";
	let {
		ref = $bindable(null),
		class: className,
		size = "icon",
		isActive,
		page,
		elevation = "auto",
		children,
		...restProps
	}: PaginationPrimitive.PageProps & {
		size?: ButtonSize;
		isActive: boolean;
		/** ✦ overrides the Pagination `elevation` (the active link rises). */
		elevation?: Elevation;
	} = $props();

	const ctx = getPaginationCtx();
	const isRaised = $derived(
		elevation !== "auto" ? elevation === "raised" || elevation === "floating" : (ctx?.raised ?? false)
	);
</script>

{#snippet Fallback()}
	{page.value}
{/snippet}

<PaginationPrimitive.Page
	bind:ref
	{page}
	aria-current={isActive ? "page" : undefined}
	data-slot="pagination-link"
	data-active={isActive}
	data-size={size}
	class={cn(
		buttonVariants({ size, variant: isActive ? "outline" : "ghost" }),
		// paginationActive: flat outline, elevation ✦ raises it
		isActive && "bg-card font-semibold",
		isActive && isRaised && "border-transparent shadow-btn-raised-neutral",
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		{@render Fallback()}
	{/if}
</PaginationPrimitive.Page>
