<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLIframeAttributes } from "svelte/elements";
	import { useWebPreviewContext } from "./use-web-preview.svelte.js";

	let {
		class: className,
		src,
		loading,
		...restProps
	}: HTMLIframeAttributes & {
		/** Rendered over the frame, e.g. a spinner while the preview is generated. */
		loading?: Snippet;
	} = $props();

	const preview = useWebPreviewContext();
	const frameSrc = $derived((src ?? preview.url) || undefined);
</script>

<div data-slot="ai-web-preview-body" class="relative min-h-0 flex-1 bg-background">
	<iframe
		class={cn("size-full", className)}
		sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
		src={frameSrc}
		title="Preview"
		{...restProps}
	></iframe>
	{@render loading?.()}
</div>
