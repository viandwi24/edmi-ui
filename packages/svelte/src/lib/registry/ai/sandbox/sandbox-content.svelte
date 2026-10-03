<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof Collapsible.Content> = $props();
</script>

<Collapsible.Content
	bind:ref
	data-slot="ai-sandbox-content"
	class={cn("overflow-hidden border-t border-border outline-none", className)}
	{...restProps}
>
	{@render children?.()}
</Collapsible.Content>
