<script lang="ts">
	import { HoverCardTrigger } from "$lib/registry/ui/hover-card/index.js";
	import type { ComponentProps } from "svelte";

	let { ref = $bindable(null), children, ...restProps }: ComponentProps<typeof HoverCardTrigger> = $props();
</script>

<HoverCardTrigger bind:ref {...restProps}>
	{@render children?.()}
</HoverCardTrigger>
