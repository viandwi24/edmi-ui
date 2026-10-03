<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();
</script>

<div
	data-slot="ai-stack-trace-error"
	class={cn("flex flex-1 items-start gap-2.5 overflow-hidden", className)}
>
	<svg
		aria-hidden="true"
		class="mt-px size-[15px] shrink-0 text-destructive-text"
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="1.7"
		viewBox="0 0 24 24"
	>
		<rect height="13" rx="5" width="10" x="7" y="7" />
		<path d="M12 7V4M7 12H3M21 12h-4M7 17l-3 2M17 17l3 2M7 9 4 6M17 9l3-3" />
	</svg>
	<div class="min-w-0 flex-1">
		{@render children?.()}
	</div>
</div>
