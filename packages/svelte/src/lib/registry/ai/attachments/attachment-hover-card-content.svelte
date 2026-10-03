<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { HoverCardContent } from "$lib/registry/ui/hover-card/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		align = "start",
		class: className,
		...restProps
	}: ComponentProps<typeof HoverCardContent> = $props();
</script>

<HoverCardContent bind:ref {align} class={cn("w-auto p-2", className)} {...restProps} />
