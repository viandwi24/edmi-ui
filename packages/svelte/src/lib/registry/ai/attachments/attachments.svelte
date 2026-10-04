<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import type { AttachmentVariant } from "./types.js";
	import { setAttachmentsContext } from "./use-attachments.svelte.js";

	let {
		variant = "grid",
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		variant?: AttachmentVariant;
		children?: Snippet;
	} = $props();

	setAttachmentsContext({
		get variant() {
			return variant;
		},
	});
</script>

<div
	data-slot="ai-attachments"
	data-variant={variant}
	class={cn(
		"flex items-start",
		variant === "list" ? "w-full flex-col gap-2" : "flex-wrap gap-2",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
