<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLPreElement>, HTMLPreElement> = $props();
</script>

<pre
	bind:this={ref}
	data-slot="ai-schema-display-example"
	class={cn(
		"mx-4 mb-3.5 overflow-auto rounded-md bg-muted px-3 py-2.5 font-mono text-xs leading-[1.6]",
		className
	)}
	{...restProps}>{@render children?.()}</pre>
