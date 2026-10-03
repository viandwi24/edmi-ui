<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
</script>

<div
	data-slot="ai-attachment-empty"
	class={cn("flex items-center justify-center p-4 text-sm text-muted-foreground", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		No attachments
	{/if}
</div>
