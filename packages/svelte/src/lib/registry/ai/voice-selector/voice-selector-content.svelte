<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { Command } from "$lib/registry/ui/command/index.js";
	import {
		DialogContent,
		DialogDescription,
		DialogTitle,
	} from "$lib/registry/ui/dialog/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps, Snippet } from "svelte";

	let {
		class: className,
		children,
		title = "Voice Selector",
		...restProps
	}: Omit<ComponentProps<typeof DialogContent>, "children" | "showCloseButton"> & {
		title?: string;
		children?: Snippet;
	} = $props();
</script>

<DialogContent
	data-slot="ai-voice-selector-content"
	showCloseButton={false}
	class={cn("top-1/3 translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-md", className)}
	{...restProps}
>
	<DialogTitle class="sr-only">{title}</DialogTitle>
	<DialogDescription class="sr-only">Select a voice from the list</DialogDescription>
	<Command class="rounded-none **:data-[slot=command-input-wrapper]:h-10">
		{@render children?.()}
	</Command>
</DialogContent>
