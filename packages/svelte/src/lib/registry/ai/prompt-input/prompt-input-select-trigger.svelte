<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { SelectTrigger } from "$lib/registry/ui/select/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof SelectTrigger> = $props();
</script>

<SelectTrigger
	bind:ref
	class={cn(
		"h-8 border-none bg-transparent px-2.5 text-[13px] font-medium text-foreground shadow-none transition-colors data-[size=default]:h-8",
		"hover:bg-accent data-[state=open]:bg-accent data-[state=open]:shadow-none",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</SelectTrigger>
