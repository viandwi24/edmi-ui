<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import { cn, type WithoutChild, type WithoutChildrenOrChild } from "$lib/utils.js";
	import { type Elevation, setSurface, useElevation } from "$lib/registry/ui/elevation/index.js";
	import AlertDialogOverlay from "./alert-dialog-overlay.svelte";
	import AlertDialogPortal from "./alert-dialog-portal.svelte";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		size = "default",
		portalProps,
		elevation = "auto",
		...restProps
	}: WithoutChild<AlertDialogPrimitive.ContentProps> & {
		size?: "default" | "sm";
		/** ✦ depth: flat 0, raised +1 (bevel), floating +2 (bevel + drop). */
		elevation?: Elevation;
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof AlertDialogPortal>>;
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

<AlertDialogPortal {...portalProps}>
	<AlertDialogOverlay />
	<AlertDialogPrimitive.Content
		bind:ref
		data-slot="alert-dialog-content"
		data-size={size}
		class={cn(
			"group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border border-border bg-popover p-[22px] text-popover-foreground outline-none duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm",
			overlayElevation[level.current],
			className
		)}
		{...restProps}
	/>
</AlertDialogPortal>
