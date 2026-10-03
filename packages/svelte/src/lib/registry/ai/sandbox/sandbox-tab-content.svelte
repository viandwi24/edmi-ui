<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: ComponentProps<typeof Tabs.Content> = $props();
</script>

<Tabs.Content
	bind:ref
	data-slot="ai-sandbox-tab-content"
	class={cn("px-3 pt-2.5 pb-3 text-sm", className)}
	{...restProps}
/>
