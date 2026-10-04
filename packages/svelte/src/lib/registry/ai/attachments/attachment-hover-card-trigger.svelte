<script lang="ts">
	import { HoverCardTrigger } from "$lib/registry/ui/hover-card/index.js";
	import type { ComponentProps } from "svelte";

	// Wrap an `Attachment` through the `child` snippet: `{#snippet child({ props })}<Attachment {...props} ... />{/snippet}`.
	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof HoverCardTrigger> = $props();
</script>

<HoverCardTrigger bind:ref {...restProps} />
