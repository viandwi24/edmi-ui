<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		value = $bindable(""),
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof Tabs.Root> = $props();
</script>

<Tabs.Root
	bind:ref
	bind:value
	data-slot="ai-sandbox-tabs"
	class={cn("w-full gap-0", className)}
	{...restProps}
>
	{@render children?.()}
</Tabs.Root>
