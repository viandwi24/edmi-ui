<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { Command } from "$lib/registry/ui/command/index.js";
	import { PopoverContent } from "$lib/registry/ui/popover/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps, Snippet } from "svelte";
	import { useMicSelector } from "./use-mic-selector.svelte.js";

	let {
		class: className,
		children,
		popoverOptions,
		...restProps
	}: Omit<ComponentProps<typeof Command>, "children"> & {
		children?: Snippet;
		popoverOptions?: Omit<ComponentProps<typeof PopoverContent>, "children">;
	} = $props();

	const ctx = useMicSelector("MicSelectorContent");
</script>

<PopoverContent
	data-slot="ai-mic-selector-content"
	align="start"
	{...popoverOptions}
	class={cn("w-auto gap-0 overflow-hidden p-0", popoverOptions?.class)}
	style="width: {ctx.width}px; min-width: 320px;"
>
	<Command
		class={cn("rounded-xl **:data-[slot=command-input-wrapper]:h-10", className)}
		{...restProps}
	>
		{@render children?.()}
	</Command>
</PopoverContent>
