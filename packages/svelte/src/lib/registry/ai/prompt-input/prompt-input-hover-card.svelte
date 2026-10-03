<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { HoverCard } from "$lib/registry/ui/hover-card/index.js";
	import type { ComponentProps } from "svelte";

	let {
		open = $bindable(false),
		openDelay = 0,
		closeDelay = 0,
		...restProps
	}: ComponentProps<typeof HoverCard> = $props();
</script>

<HoverCard bind:open {openDelay} {closeDelay} {...restProps} />
