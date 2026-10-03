<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();
</script>

<div data-slot="ai-terminal-title" class={cn("flex items-center gap-2", className)}>
	<IconPlaceholder
		lucide="TerminalSquareIcon"
		tabler="IconTerminal2"
		hugeicons="ComputerTerminalIcon"
		phosphor="TerminalIcon"
		remixicon="RiTerminalBoxLine"
		class="size-3.5"
	/>
	{#if children}{@render children()}{:else}Terminal{/if}
</div>
