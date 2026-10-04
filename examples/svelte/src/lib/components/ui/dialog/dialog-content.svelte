<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import XIcon from 'phosphor-svelte/lib/X';
	import { Button } from "#lib/components/ui/button/index.js";
	import { cn, type WithoutChildrenOrChild } from "#lib/utils.js";
	import { type Elevation, setSurface, useElevation } from "#lib/components/ui/elevation/index.js";
	import DialogOverlay from "./dialog-overlay.svelte";
	import DialogPortal from "./dialog-portal.svelte";
	import type { Snippet } from "svelte";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		children,
		showCloseButton = true,
		elevation = "auto",
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof DialogPortal>>;
		children: Snippet;
		showCloseButton?: boolean;
		/** ✦ depth: flat 0, raised +1 (bevel), floating +2 (bevel + drop). */
		elevation?: Elevation;
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

<DialogPortal {...portalProps}>
	<DialogOverlay />
	<DialogPrimitive.Content
		bind:ref
		data-slot="dialog-content"
		class={cn(
			// recipes.surface.dialog (flat); elevation ✦ adds the bevel / drop.
			"fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border border-border bg-popover p-[22px] text-sm text-popover-foreground outline-none duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:max-w-md",
			overlayElevation[level.current],
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		{#if showCloseButton}
			<DialogPrimitive.Close data-slot="dialog-close">
				{#snippet child({ props })}
					<Button variant="ghost" class="absolute top-3.5 right-3.5" size="icon-xs" {...props}>
						<XIcon  />
						<span class="sr-only">Close</span>
					</Button>
				{/snippet}
			</DialogPrimitive.Close>
		{/if}
	</DialogPrimitive.Content>
</DialogPortal>
