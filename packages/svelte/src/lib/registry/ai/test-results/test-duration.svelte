<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import { useTestContext } from "./use-test-results.svelte.js";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();

	const test = useTestContext();
</script>

{#if test.duration !== undefined}
	<span class={cn("ml-auto font-mono text-xs text-muted-foreground", className)}>
		{#if children}{@render children()}{:else}{test.duration}ms{/if}
	</span>
{/if}
