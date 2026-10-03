<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();
</script>

<div data-slot="ai-terminal-actions" class={cn("flex items-center gap-0.5", className)}>
	{@render children?.()}
</div>
