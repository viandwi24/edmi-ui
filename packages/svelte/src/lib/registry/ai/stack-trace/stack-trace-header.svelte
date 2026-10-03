<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import { useStackTraceContext } from "./use-stack-trace.svelte.js";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();

	const stack = useStackTraceContext();

	function onkeydown(event: KeyboardEvent) {
		if (event.target !== event.currentTarget) return;
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			stack.open = !stack.open;
		}
	}
</script>

<!-- A div, not a button: the actions inside the header are buttons themselves. -->
<Collapsible.Trigger>
	{#snippet child({ props })}
		<div
			{...props}
			data-slot="ai-stack-trace-header"
			role="button"
			tabindex="0"
			{onkeydown}
			class={cn(
				"flex w-full cursor-pointer items-start gap-2.5 px-3.5 py-2.5 text-left outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
				className
			)}
		>
			{@render children?.()}
		</div>
	{/snippet}
</Collapsible.Trigger>
