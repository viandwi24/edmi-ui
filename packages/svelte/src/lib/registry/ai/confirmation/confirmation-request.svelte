<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import type { Snippet } from "svelte";
	import { useConfirmation } from "./use-confirmation.svelte.js";

	let { children }: { children?: Snippet } = $props();

	const confirmation = useConfirmation();
</script>

{#if confirmation.state === "approval-requested"}
	{@render children?.()}
{/if}
