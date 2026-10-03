<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { CollapsibleContent } from "$lib/registry/ui/collapsible/index.js";
	import type { ComponentProps } from "svelte";
	import { Streamdown } from "svelte-streamdown";

	let {
		class: className,
		content,
		...restProps
	}: Omit<ComponentProps<typeof CollapsibleContent>, "children"> & {
		/** Markdown source. */
		content: string;
	} = $props();

	const theme = { paragraph: { base: "my-0" } };
</script>

<CollapsibleContent
	data-slot="ai-reasoning-content"
	class={cn(
		"overflow-hidden outline-none data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
		className
	)}
	{...restProps}
>
	<div
		class="mt-2.5 ml-[7px] border-l-2 border-border pl-[23px] text-[13.5px] leading-[1.6] text-muted-foreground [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
	>
		<Streamdown {content} baseTheme="shadcn" {theme} />
	</div>
</CollapsibleContent>
