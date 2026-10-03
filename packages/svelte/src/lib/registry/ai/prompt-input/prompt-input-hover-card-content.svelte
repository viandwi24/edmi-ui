<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { HoverCardContent } from "$lib/registry/ui/hover-card/index.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		align = "start",
		...restProps
	}: ComponentProps<typeof HoverCardContent> = $props();
</script>

<HoverCardContent bind:ref {align} {...restProps} />
