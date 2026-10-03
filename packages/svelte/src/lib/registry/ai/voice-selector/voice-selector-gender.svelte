<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	// Renders the children, falling back to the value as text.
	let {
		value,
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLSpanElement> & { value?: string } = $props();
</script>

<span
	data-slot="ai-voice-selector-gender"
	class={cn("text-xs text-muted-foreground", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		{value}
	{/if}
</span>
