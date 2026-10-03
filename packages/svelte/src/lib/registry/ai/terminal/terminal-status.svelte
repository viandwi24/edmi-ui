<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import { useTerminalContext } from "./use-terminal.svelte.js";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();

	const terminal = useTerminalContext();
</script>

{#if terminal.isStreaming}
	<div data-slot="ai-terminal-status" class={cn("ml-1.5 flex items-center gap-1.5", className)}>
		{#if children}
			{@render children()}
		{:else}
			<span class="size-1.5 rounded-full bg-[oklch(0.78_0.15_155)]"></span>
			running
		{/if}
	</div>
{/if}
