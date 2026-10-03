<script lang="ts">
	import * as ResizablePrimitive from "paneforge";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		withHandle = false,
		...restProps
	}: WithoutChildrenOrChild<ResizablePrimitive.PaneResizerProps> & {
		withHandle?: boolean;
	} = $props();
</script>

<!-- 1px --border line; `withHandle` adds the 12x22 grip chip (kit.css .grip). paneforge's data-direction is the group direction. -->
<ResizablePrimitive.PaneResizer
	bind:ref
	data-slot="resizable-handle"
	class={cn(
		"relative flex w-px items-center justify-center bg-border outline-none after:absolute after:inset-y-0 after:left-1/2 after:w-2 after:-translate-x-1/2 focus-visible:bg-ring data-[direction=vertical]:h-px data-[direction=vertical]:w-full data-[direction=vertical]:after:left-0 data-[direction=vertical]:after:h-2 data-[direction=vertical]:after:w-full data-[direction=vertical]:after:-translate-y-1/2 data-[direction=vertical]:after:translate-x-0 [&[data-direction=vertical]>div]:rotate-90",
		className
	)}
	{...restProps}
>
	{#if withHandle}
		<div
			class="z-10 flex h-[22px] w-3 shrink-0 items-center justify-center rounded-[4px] border border-border bg-card text-muted-foreground"
		>
			<IconPlaceholder
				lucide="GripVerticalIcon"
				tabler="IconGripVertical"
				hugeicons="DragDropVerticalIcon"
				phosphor="DotsSixVerticalIcon"
				remixicon="RiDraggable"
				class="size-2.5"
			/>
		</div>
	{/if}
</ResizablePrimitive.PaneResizer>
