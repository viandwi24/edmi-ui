<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import { useStackTraceContext } from "./use-stack-trace.svelte.js";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();

	const stack = useStackTraceContext();
</script>

<span class={cn("mt-0.5 block font-sans text-[13px] break-words text-foreground", className)}>
	{#if children}{@render children()}{:else}{stack.trace.errorMessage}{/if}
</span>
