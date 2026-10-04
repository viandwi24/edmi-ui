<script lang="ts">
	import { Popover as PopoverPrimitive } from "bits-ui";
	import { cn, type WithoutChildrenOrChild } from "#lib/utils.js";
	import { type Elevation, setSurface, useElevation } from "#lib/components/ui/elevation/index.js";
	import PopoverPortal from "./popover-portal.svelte";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 6,
		align = "center",
		portalProps,
		elevation = "auto",
		...restProps
	}: PopoverPrimitive.ContentProps & {
		/** ✦ depth: flat 0, raised +1 (bevel), floating +2 (bevel + drop). */
		elevation?: Elevation;
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof PopoverPortal>>;
	} = $props();

	// ✦ depth (v4): overlay role. Natural level is floating in layered mode; flat otherwise.
	const overlayElevation = {
		sunken: "",
		flat: "",
		raised: "border-transparent shadow-raised",
		floating: "border-transparent shadow-floating",
	};
	const level = useElevation(() => elevation, "overlay");
	setSurface(() => level.current);
</script>

<PopoverPortal {...portalProps}>
	<PopoverPrimitive.Content
		bind:ref
		data-slot="popover-content"
		{sideOffset}
		{align}
		class={cn(
			// recipes.surface.popover (flat); elevation ✦ adds the bevel / drop.
			"z-50 flex w-72 origin-(--bits-popover-content-transform-origin) flex-col gap-2.5 rounded-xl border border-border bg-popover p-3 text-sm text-popover-foreground outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
			overlayElevation[level.current],
			className
		)}
		{...restProps}
	/>
</PopoverPortal>
