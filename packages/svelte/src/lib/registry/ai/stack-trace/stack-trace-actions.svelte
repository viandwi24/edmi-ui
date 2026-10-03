<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();

	function stop(event: Event) {
		event.stopPropagation();
	}

	function stopKey(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") event.stopPropagation();
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- Stops clicks and Enter/Space here so the actions do not toggle the header. -->
<div
	data-slot="ai-stack-trace-actions"
	role="group"
	class={cn("flex shrink-0 items-center gap-0.5", className)}
	onclick={stop}
	onkeydown={stopKey}
>
	{@render children?.()}
</div>
