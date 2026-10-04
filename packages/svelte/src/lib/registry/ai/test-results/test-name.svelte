<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import { useTestContext } from "./use-test-results.svelte.js";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();

	const test = useTestContext();
</script>

<span class={cn("flex-1", className)}>
	{#if children}{@render children()}{:else}{test.name}{/if}
</span>
