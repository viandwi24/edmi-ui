<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="message-avatar"
	class={cn(
		"mt-[5px] flex w-fit min-w-6 shrink-0 items-center justify-center self-start overflow-hidden rounded-full group-has-data-[slot=message-header]/message:mt-[3px]",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
