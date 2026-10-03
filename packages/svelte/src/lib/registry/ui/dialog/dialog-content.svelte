<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
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
		raised = false,
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof DialogPortal>>;
		children: Snippet;
		showCloseButton?: boolean;
		/** ✦ opt-in one-step 3D look (hard strong lip). */
		raised?: boolean;
	} = $props();
</script>

<DialogPortal {...portalProps}>
	<DialogOverlay />
	<DialogPrimitive.Content
		bind:ref
		data-slot="dialog-content"
		class={cn(
			// recipes.surface.dialog (flat); raised ✦ adds raisedSurface.dialog.
			"fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border border-border bg-popover p-[22px] text-sm text-popover-foreground outline-none duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:max-w-md",
			raised && "border-b-lip-strong shadow-dialog",
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		{#if showCloseButton}
			<DialogPrimitive.Close data-slot="dialog-close">
				{#snippet child({ props })}
					<Button variant="ghost" class="absolute top-3.5 right-3.5" size="icon-xs" {...props}>
						<IconPlaceholder
							lucide="XIcon"
							tabler="IconX"
							hugeicons="Cancel01Icon"
							phosphor="XIcon"
							remixicon="RiCloseLine"
						/>
						<span class="sr-only">Close</span>
					</Button>
				{/snippet}
			</DialogPrimitive.Close>
		{/if}
	</DialogPrimitive.Content>
</DialogPortal>
