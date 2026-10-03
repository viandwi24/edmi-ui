<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { HoverCardContent } from "$lib/registry/ui/hover-card/index.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof HoverCardContent> = $props();
</script>

<HoverCardContent class={cn("relative w-80 overflow-hidden p-0", className)} {...restProps}>
	{@render children?.()}
</HoverCardContent>
