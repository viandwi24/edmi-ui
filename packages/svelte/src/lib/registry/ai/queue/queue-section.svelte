<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Collapsible } from "$lib/registry/ui/collapsible/index.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		open = $bindable(true),
		children,
		...restProps
	}: ComponentProps<typeof Collapsible> = $props();
</script>

<!-- A section that follows another gets the divider. -->
<Collapsible
	bind:open
	data-slot="ai-queue-section"
	class={cn("not-first:mt-1.5 not-first:border-t not-first:border-border-2 not-first:pt-1.5", className)}
	{...restProps}
>
	{@render children?.()}
</Collapsible>
