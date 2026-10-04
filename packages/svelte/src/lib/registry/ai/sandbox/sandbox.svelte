<script lang="ts">
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		open = $bindable(true),
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof Collapsible.Root> = $props();
</script>

<Collapsible.Root
	bind:ref
	bind:open
	data-slot="ai-sandbox"
	class={cn(
		"not-prose group/ai-sandbox w-full overflow-hidden rounded-[calc(var(--radius)*1.2)] border border-border bg-card",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</Collapsible.Root>
