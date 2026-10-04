<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { useAttachmentContext } from "./use-attachments.svelte.js";

	let {
		fallbackIcon,
		class: className,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		fallbackIcon?: Snippet;
	} = $props();

	const attachment = useAttachmentContext();
	const data = $derived(attachment.data);
	const category = $derived(attachment.mediaCategory);
	const variant = $derived(attachment.variant);
	const fileUrl = $derived(data.type === "file" ? data.url : undefined);
	const filename = $derived(data.type === "file" ? data.filename : undefined);
</script>

<div
	data-slot="ai-attachment-preview"
	class={cn(
		"flex shrink-0 items-center justify-center overflow-hidden text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
		variant === "grid" &&
			"h-20 w-full rounded-xl border border-border bg-muted [&_svg:not([class*='size-'])]:size-5",
		variant === "inline" && "size-4 [&_svg:not([class*='size-'])]:size-3.5",
		variant === "list" && "size-9 rounded-lg border border-border bg-muted text-foreground",
		className
	)}
	{...restProps}
>
	{#if category === "image" && fileUrl}
		<img
			alt={filename || "Image"}
			class={cn("size-full object-cover", variant !== "grid" && "rounded-[5px]")}
			src={fileUrl}
		/>
	{:else if category === "video" && fileUrl}
		<!-- svelte-ignore a11y_media_has_caption -->
		<video class="size-full object-cover" muted src={fileUrl}></video>
	{:else if fallbackIcon}
		{@render fallbackIcon()}
	{:else if category === "audio"}
		<IconPlaceholder
			lucide="Music2Icon"
			tabler="IconMusic"
			hugeicons="MusicNote01Icon"
			phosphor="MusicNoteIcon"
			remixicon="RiMusic2Line"
		/>
	{:else if category === "document"}
		<IconPlaceholder
			lucide="FileTextIcon"
			tabler="IconFileDescription"
			hugeicons="File01Icon"
			phosphor="FileTextIcon"
			remixicon="RiFileTextLine"
		/>
	{:else if category === "image"}
		<IconPlaceholder
			lucide="ImageIcon"
			tabler="IconPhoto"
			hugeicons="Image01Icon"
			phosphor="ImageIcon"
			remixicon="RiImageLine"
		/>
	{:else if category === "source"}
		<IconPlaceholder
			lucide="GlobeIcon"
			tabler="IconWorld"
			hugeicons="Globe02Icon"
			phosphor="GlobeIcon"
			remixicon="RiGlobalLine"
		/>
	{:else if category === "video"}
		<IconPlaceholder
			lucide="VideoIcon"
			tabler="IconVideoPlus"
			hugeicons="RecordIcon"
			phosphor="VideoIcon"
			remixicon="RiVideoLine"
		/>
	{:else}
		<IconPlaceholder
			lucide="PaperclipIcon"
			tabler="IconPaperclip"
			hugeicons="AttachmentIcon"
			phosphor="PaperclipIcon"
			remixicon="RiAttachmentLine"
		/>
	{/if}
</div>
