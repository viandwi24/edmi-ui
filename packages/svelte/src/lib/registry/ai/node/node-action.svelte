<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import type { ComponentProps } from "svelte";
	import { CardAction } from "$lib/registry/ui/card/index.js";

	let { class: className, children, ...restProps }: ComponentProps<typeof CardAction> = $props();
</script>

<CardAction {...restProps} data-slot="ai-node-action" class={className}>
	{@render children?.()}
</CardAction>
