<script lang="ts">
	import { HoverCardContent } from "$lib/registry/ui/hover-card/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof HoverCardContent> = $props();
</script>

<HoverCardContent
	bind:ref
	class={cn("min-w-60 divide-y divide-border overflow-hidden p-0", className)}
	{...restProps}
>
	{@render children?.()}
</HoverCardContent>
