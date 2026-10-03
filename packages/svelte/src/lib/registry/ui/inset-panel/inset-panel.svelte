<script lang="ts">
	// ✦ Edmi addition (DESIGN §4.7): the header sits on the shell (--muted); the body is a
	// --card panel running edge to edge with radius on the top corners only; optional bottom
	// fade; the footer is back on the shell with a top border.
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		raised = false,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		/** ✦ opt-in one-step 3D look (hard lip + body highlight). */
		raised?: boolean;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="inset-panel"
	data-raised={raised ? "" : undefined}
	class={cn(
		"group/inset-panel flex flex-col overflow-hidden rounded-2xl border border-border bg-muted",
		raised && "border-b-lip-strong shadow-dialog",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
