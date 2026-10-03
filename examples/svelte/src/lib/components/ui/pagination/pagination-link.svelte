<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";
	import { buttonVariants, type ButtonSize } from "#lib/components/ui/button/index.js";
	import { cn } from "#lib/utils.js";
	import { getPaginationCtx } from "./pagination.svelte";
	let {
		ref = $bindable(null),
		class: className,
		size = "icon",
		isActive,
		page,
		raised,
		children,
		...restProps
	}: PaginationPrimitive.PageProps & {
		size?: ButtonSize;
		isActive: boolean;
		/** ✦ overrides the Pagination `raised` (active link only). */
		raised?: boolean;
	} = $props();

	const ctx = getPaginationCtx();
	const isRaised = $derived(raised ?? ctx?.raised ?? false);
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
		// paginationActive: flat outline, raised ✦ adds the lip
		isActive && "bg-card font-semibold",
		isActive && isRaised && "border-b-lip shadow-btn-outline",
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
