<script lang="ts">
	import { HoverCardContent } from "$lib/registry/ui/hover-card/index.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		align = "start",
		...restProps
	}: ComponentProps<typeof HoverCardContent> = $props();
</script>

<HoverCardContent bind:ref {align} {...restProps} />
