<script lang="ts">
	// Edmi ✦ port: renders the parsed tree (see jsx-preview-nodes).
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import JsxPreviewNodes from "./jsx-preview-nodes.svelte";
	import { useJSXPreview } from "./use-jsx-preview.svelte.js";

	let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();

	const preview = useJSXPreview();
</script>

<div
	data-slot="ai-jsx-preview-content"
	class={cn("jsx-preview-content", className)}
	{...restProps}
>
	<JsxPreviewNodes
		nodes={preview.nodes}
		components={preview.components}
		bindings={preview.bindings}
	/>
</div>
