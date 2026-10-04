<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { useAttachmentContext } from "./use-attachments.svelte.js";
	import { formatSize, getAttachmentLabel } from "./utils.js";

	let {
		showMediaType = false,
		class: className,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		showMediaType?: boolean;
	} = $props();

	const attachment = useAttachmentContext();
	const label = $derived(getAttachmentLabel(attachment.data));
	const meta = $derived(
		[attachment.data.mediaType, formatSize(attachment.data.size)].filter(Boolean).join(" · ")
	);
	const variant = $derived(attachment.variant);
</script>

<div
	data-slot="ai-attachment-info"
	class={cn("min-w-0", variant === "grid" ? "mt-1.5 w-full" : "flex-1", className)}
	{...restProps}
>
	<span
		class={cn(
			"block truncate",
			variant === "inline" && "font-medium",
			variant === "list" && "text-[13.5px] font-medium",
			variant === "grid" && "text-xs text-foreground"
		)}
	>
		{label}
	</span>
	{#if showMediaType && meta}
		<span class="block truncate text-xs text-muted-foreground">{meta}</span>
	{/if}
</div>
