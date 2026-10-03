<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";

	// Renders a `<div>`; pass `href` for an `<a>` or `as="button"` for a `<button>`.
	let {
		ref = $bindable(null),
		class: className,
		as = "div",
		href = undefined,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> &
		WithElementRef<HTMLAnchorAttributes> &
		WithElementRef<HTMLButtonAttributes> & { as?: "div" | "button" | "a" } = $props();

	const classes = $derived(
		cn(
			"w-fit max-w-full min-w-0 overflow-hidden rounded-2xl border border-transparent px-[13px] py-[9px] text-sm leading-normal wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-left [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:outline-2 [button,a]:focus-visible:outline-offset-2 [button,a]:focus-visible:outline-ring",
			className
		)
	);
</script>

{#if href || as === "a"}
	<a bind:this={ref} data-slot="bubble-content" class={classes} {href} {...restProps}>
		{@render children?.()}
	</a>
{:else if as === "button"}
	<button bind:this={ref} data-slot="bubble-content" class={classes} type="button" {...restProps}>
		{@render children?.()}
	</button>
{:else}
	<div bind:this={ref} data-slot="bubble-content" class={classes} {...restProps}>
		{@render children?.()}
	</div>
{/if}
