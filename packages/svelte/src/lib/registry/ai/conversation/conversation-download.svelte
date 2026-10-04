<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import type { UIMessage } from "ai";
	import { defaultFormatMessage, messagesToMarkdown } from "./utils.js";

	let {
		messages,
		filename = "conversation.md",
		formatMessage = defaultFormatMessage,
		class: className,
		children,
		...restProps
	}: Omit<ButtonProps, "onclick" | "href"> & {
		messages: UIMessage[];
		filename?: string;
		formatMessage?: (message: UIMessage, index: number) => string;
	} = $props();

	function handleDownload() {
		const markdown = messagesToMarkdown(messages, formatMessage);
		const blob = new Blob([markdown], { type: "text/markdown" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		document.body.append(link);
		link.click();
		link.remove();
		URL.revokeObjectURL(url);
	}
</script>

<Button
	data-slot="ai-conversation-download"
	aria-label="Download conversation"
	class={cn("absolute top-4 right-4 rounded-full", className)}
	onclick={handleDownload}
	size="icon"
	type="button"
	variant="outline"
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<IconPlaceholder
			lucide="DownloadIcon"
			tabler="IconDownload"
			hugeicons="DownloadIcon"
			phosphor="DownloadIcon"
			remixicon="RiDownloadLine"
			class="size-4"
		/>
	{/if}
</Button>
