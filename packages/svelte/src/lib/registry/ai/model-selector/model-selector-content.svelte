<script lang="ts">
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
		title = "Model Selector",
		value = $bindable(""),
		...restProps
	}: Omit<ComponentProps<typeof DialogContent>, "children" | "showCloseButton"> & {
		title?: string;
		value?: string;
		children?: Snippet;
	} = $props();
</script>

<DialogContent
	data-slot="ai-model-selector-content"
	showCloseButton={false}
	class={cn("top-1/3 translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-md", className)}
	{...restProps}
>
	<DialogTitle class="sr-only">{title}</DialogTitle>
	<DialogDescription class="sr-only">Search and pick a model</DialogDescription>
	<Command bind:value class="rounded-none **:data-[slot=command-input-wrapper]:h-auto">
		{@render children?.()}
	</Command>
</DialogContent>
