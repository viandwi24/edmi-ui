<script lang="ts">
	import { Tooltip as TooltipPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import type { WithoutChildrenOrChild } from "$lib/utils.js";
	import TooltipPortal from "./tooltip-portal.svelte";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 6,
		side = "top",
		children,
		arrowClasses,
		portalProps,
		...restProps
	}: TooltipPrimitive.ContentProps & {
		arrowClasses?: string;
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof TooltipPortal>>;
	} = $props();
</script>

<TooltipPortal {...portalProps}>
	<TooltipPrimitive.Content
		bind:ref
		data-slot="tooltip-content"
		{sideOffset}
		{side}
		class={cn(
			// recipes.tooltip: solid primary, 7px radius.
			"z-50 inline-flex w-fit max-w-xs origin-(--bits-tooltip-content-transform-origin) items-center gap-1.5 rounded-[7px] bg-primary px-2.5 py-1.5 text-[12.5px] text-balance text-primary-foreground has-data-[slot=kbd]:pr-1.5 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-[state=instant-open]:animate-in data-[state=instant-open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:rounded-sm",
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		<TooltipPrimitive.Arrow>
			{#snippet child({ props })}
				<div
					class={cn(
						"z-50 size-2 translate-y-[calc(-50%-2px)] rotate-45 rounded-[1px] bg-primary fill-primary data-[side=bottom]:-translate-x-1/2 data-[side=bottom]:-translate-y-[calc(-50%+1px)] data-[side=left]:-translate-y-[calc(50%-3px)] data-[side=right]:translate-x-[calc(50%+2px)] data-[side=right]:translate-y-1/2 data-[side=top]:translate-x-1/2 data-[side=top]:translate-y-[calc(-50%+2px)]",
						arrowClasses
					)}
					{...props}
				></div>
			{/snippet}
		</TooltipPrimitive.Arrow>
	</TooltipPrimitive.Content>
</TooltipPortal>
