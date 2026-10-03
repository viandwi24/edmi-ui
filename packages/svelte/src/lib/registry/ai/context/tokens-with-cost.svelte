<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { formatCompact } from "./use-context.svelte.js";

	let { tokens, costText }: { tokens?: number; costText?: string } = $props();
</script>

<span class="font-mono">
	{tokens === undefined ? "—" : formatCompact(tokens)}
	{#if costText}
		<span class="ml-2 text-muted-foreground">• {costText}</span>
	{/if}
</span>
