<script lang="ts">
	import { Attachment as UiAttachment } from "$lib/registry/ui/attachment/index.js";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import type { AttachmentData } from "./types.js";
	import { setAttachmentContext, useAttachmentsContext } from "./use-attachments.svelte.js";
	import { getMediaCategory } from "./utils.js";

	// Thin layer on ui/attachment (DESIGN §5b): three layouts around the ui item (grid tiles, inline pills, list rows).

	let {
		data,
		onRemove,
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		data: AttachmentData;
		onRemove?: () => void;
		children?: Snippet;
	} = $props();

	const attachments = useAttachmentsContext();

	setAttachmentContext({
		get data() {
			return data;
		},
		get mediaCategory() {
			return getMediaCategory(data);
		},
		get onRemove() {
			return onRemove;
		},
		get variant() {
			return attachments.variant;
		},
	});
</script>

{#if attachments.variant === "grid"}
	<div
		data-slot="ai-attachment"
		data-variant="grid"
		class={cn("group/ai-attachment relative w-[110px]", className)}
		{...restProps}
	>
		{@render children?.()}
	</div>
{:else}
	<UiAttachment
		data-slot="ai-attachment"
		data-variant={attachments.variant}
		size={attachments.variant === "inline" ? "xs" : "default"}
		class={cn(
			"group/ai-attachment items-center",
			attachments.variant === "inline" &&
				"h-8 w-fit min-w-0 cursor-pointer rounded-lg px-2 py-0 text-[13px]",
			attachments.variant === "list" && "w-full gap-3 rounded-xl p-2.5",
			className
		)}
		{...restProps}
	>
		{@render children?.()}
	</UiAttachment>
{/if}
