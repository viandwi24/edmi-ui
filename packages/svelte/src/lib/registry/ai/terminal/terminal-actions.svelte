<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();
</script>

<div data-slot="ai-terminal-actions" class={cn("flex items-center gap-0.5", className)}>
	{@render children?.()}
</div>
