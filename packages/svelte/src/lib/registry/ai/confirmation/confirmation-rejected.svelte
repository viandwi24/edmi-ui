<script lang="ts">
	import type { Snippet } from "svelte";
	import { useConfirmation } from "./use-confirmation.svelte.js";

	let { children }: { children?: Snippet } = $props();

	const confirmation = useConfirmation();
	const show = $derived(
		confirmation.approval?.approved === false &&
			(confirmation.state === "approval-responded" ||
				confirmation.state === "output-denied" ||
				confirmation.state === "output-available")
	);
</script>

{#if show}
	<span class="inline-flex items-center gap-2 text-muted-foreground">{@render children?.()}</span>
{/if}
