<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { useAttachmentContext } from "./use-attachments.svelte.js";

	let {
		label = "Remove",
		class: className,
		children,
		...restProps
	}: Omit<ButtonProps, "onclick" | "href"> & {
		label?: string;
	} = $props();

	const attachment = useAttachmentContext();

	function handleClick(event: MouseEvent) {
		event.stopPropagation();
		attachment.onRemove?.();
	}
</script>

{#if attachment.onRemove}
	<Button
		data-slot="ai-attachment-remove"
		aria-label={label}
		class={cn(
			// solid chip over the tile (DESIGN §4.7): --popover + 1px border, no transparency
			attachment.variant === "grid" &&
				"absolute top-1.5 right-1.5 size-[22px] rounded-md border border-border bg-popover p-0 hover:bg-accent [&>svg]:size-3",
			attachment.variant === "inline" && "size-5 rounded-md p-0 [&>svg]:size-3",
			attachment.variant === "list" && "size-8 shrink-0 rounded-md p-0 [&>svg]:size-4",
			className
		)}
		onclick={handleClick}
		type="button"
		variant="ghost"
		{...restProps}
	>
		{#if children}
			{@render children()}
		{:else}
			<IconPlaceholder
				lucide="XIcon"
				tabler="IconX"
				hugeicons="Cancel01Icon"
				phosphor="XIcon"
				remixicon="RiCloseLine"
			/>
		{/if}
		<span class="sr-only">{label}</span>
	</Button>
{/if}
