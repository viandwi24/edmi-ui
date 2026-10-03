<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span
	data-slot="ai-queue-item-file"
	class={cn(
		"flex items-center gap-1 rounded-md border border-border bg-secondary px-2 py-1 text-xs",
		className
	)}
	{...restProps}
>
	<IconPlaceholder
		lucide="PaperclipIcon"
		tabler="IconPaperclip"
		hugeicons="AttachmentIcon"
		phosphor="PaperclipIcon"
		remixicon="RiAttachmentLine"
		class="size-3"
	/>
	<span class="max-w-[100px] truncate">{@render children?.()}</span>
</span>
