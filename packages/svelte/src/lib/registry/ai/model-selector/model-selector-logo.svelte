<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLImgAttributes } from "svelte/elements";

	let {
		provider,
		class: className,
		...restProps
	}: Omit<HTMLImgAttributes, "src" | "alt"> & {
		/** A models.dev provider id (`anthropic`, `openai`, `google`, ...); any string works. */
		provider: string;
	} = $props();
</script>

<img
	{...restProps}
	alt="{provider} logo"
	class={cn("size-3.5 dark:invert", className)}
	height="14"
	src="https://models.dev/logos/{provider}.svg"
	width="14"
/>
