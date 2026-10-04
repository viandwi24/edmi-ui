<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import type { WithElementRef } from "$lib/utils.js";
	import {
		type ElevationLevel,
		type ElevationMode,
		getElevationScope,
		setElevationScope,
	} from "./context.js";

	let {
		ref = $bindable(null),
		class: className,
		style,
		mode,
		level,
		child,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		/** "layered": every role takes its default level; "flat" (default). Inherits the parent scope when omitted. */
		mode?: ElevationMode;
		/** Force one level for the whole subtree (wins over `mode`). */
		level?: ElevationLevel;
		/** Render your own element: `{#snippet child({ props })}<section {...props}>…</section>{/snippet}` */
		child?: Snippet<[{ props: Record<string, unknown> }]>;
	} = $props();

	const parent = getElevationScope();
	const scope = $derived(level ?? mode ?? parent.current);
	setElevationScope(() => scope);

	// Layout-neutral (display: contents) unless a class or style is passed.
	const mergedProps = $derived({
		...restProps,
		"data-slot": "elevation-provider",
		"data-elevation": scope,
		class: className,
		style: className || style ? style : "display: contents",
	});
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<div bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</div>
{/if}
