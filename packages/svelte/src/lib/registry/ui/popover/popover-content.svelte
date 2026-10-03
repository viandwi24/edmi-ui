<script lang="ts">
	import { Popover as PopoverPrimitive } from "bits-ui";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import PopoverPortal from "./popover-portal.svelte";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 6,
		align = "center",
		portalProps,
		raised = false,
		...restProps
	}: PopoverPrimitive.ContentProps & {
		/** ✦ opt-in one-step 3D look (hard lip). */
		raised?: boolean;
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof PopoverPortal>>;
	} = $props();
</script>

<PopoverPortal {...portalProps}>
	<PopoverPrimitive.Content
		bind:ref
		data-slot="popover-content"
		{sideOffset}
		{align}
		class={cn(
			// recipes.surface.popover (flat); raised ✦ adds raisedSurface.popover.
			"z-50 flex w-72 origin-(--bits-popover-content-transform-origin) flex-col gap-2.5 rounded-xl border border-border bg-popover p-3 text-sm text-popover-foreground outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
			raised && "border-b-lip shadow-pop",
			className
		)}
		{...restProps}
	/>
</PopoverPortal>
