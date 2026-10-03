<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { SelectTrigger } from "$lib/registry/ui/select/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	// Ghost trigger (board: a ghost xs button with a chevron).
	let { class: className, children, ...restProps }: ComponentProps<typeof SelectTrigger> = $props();
</script>

<SelectTrigger
	size="sm"
	class={cn(
		"h-6 gap-1 rounded-md border-transparent bg-transparent px-2 text-xs font-normal text-foreground shadow-none hover:bg-accent data-[size=sm]:h-6 data-[size=sm]:rounded-md",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</SelectTrigger>
