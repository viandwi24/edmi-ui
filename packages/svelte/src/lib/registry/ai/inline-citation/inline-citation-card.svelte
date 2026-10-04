<script lang="ts">
	import { HoverCard } from "$lib/registry/ui/hover-card/index.js";
	import type { ComponentProps } from "svelte";

	let {
		open = $bindable(false),
		openDelay = 0,
		closeDelay = 0,
		children,
		...restProps
	}: ComponentProps<typeof HoverCard> = $props();
</script>

<HoverCard bind:open {openDelay} {closeDelay} {...restProps}>
	{@render children?.()}
</HoverCard>
