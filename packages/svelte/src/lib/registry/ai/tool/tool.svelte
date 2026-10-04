<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Collapsible } from "$lib/registry/ui/collapsible/index.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		raised = false,
		open = $bindable(false),
		children,
		...restProps
	}: ComponentProps<typeof Collapsible> & {
		/** ✦ one-step 3D look on the card. */
		raised?: boolean;
	} = $props();
</script>

<Collapsible
	bind:open
	data-slot="ai-tool"
	class={cn(
		"group/tool not-prose w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground",
		raised && "border-b-lip shadow-card",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</Collapsible>
