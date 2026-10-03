<script lang="ts">
	import { Drawer as DrawerPrimitive } from "vaul-svelte";
	import { cn } from "$lib/utils.js";
	import type { WithoutChildrenOrChild } from "$lib/utils.js";
	import DrawerOverlay from "./drawer-overlay.svelte";
	import DrawerPortal from "./drawer-portal.svelte";
	import DrawerSwipeHandle from "./drawer-swipe-handle.svelte";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		showHandle,
		children,
		...restProps
	}: DrawerPrimitive.ContentProps & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof DrawerPortal>>;
		/** Render a DrawerSwipeHandle at the top (default for the bottom drawer). */
		showHandle?: boolean;
	} = $props();
</script>

<DrawerPortal {...portalProps}>
	<DrawerOverlay />
	<DrawerPrimitive.Content
		bind:ref
		data-slot="drawer-content"
		class={cn(
			// Flat: a 1px border on the edge facing the page.
			"group/drawer-content fixed z-50 flex h-auto flex-col gap-4 overflow-y-auto overscroll-contain border-border bg-popover text-sm text-popover-foreground outline-none",
			"data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[85dvh] data-[vaul-drawer-direction=bottom]:rounded-t-2xl data-[vaul-drawer-direction=bottom]:border-t",
			"data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[85dvh] data-[vaul-drawer-direction=top]:rounded-b-2xl data-[vaul-drawer-direction=top]:border-b",
			"data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:max-w-sm data-[vaul-drawer-direction=left]:rounded-r-2xl data-[vaul-drawer-direction=left]:border-r",
			"data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:max-w-sm data-[vaul-drawer-direction=right]:rounded-l-2xl data-[vaul-drawer-direction=right]:border-l",
			className
		)}
		{...restProps}
	>
		{#if showHandle}
			<DrawerSwipeHandle />
		{/if}
		<div
			data-slot="drawer-body"
			class="flex flex-1 flex-col gap-4 p-[22px] pt-0 group-data-[vaul-drawer-direction=left]/drawer-content:pt-[22px] group-data-[vaul-drawer-direction=right]/drawer-content:pt-[22px]"
		>
			{@render children?.()}
		</div>
	</DrawerPrimitive.Content>
</DrawerPortal>
