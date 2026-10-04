<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLImgAttributes } from "svelte/elements";

	let { class: className, alt = "", ...restProps }: HTMLImgAttributes = $props();
</script>

<img
	data-slot="ai-queue-item-image"
	{alt}
	width="32"
	height="32"
	class={cn("size-8 rounded-md border border-border object-cover", className)}
	{...restProps}
/>
