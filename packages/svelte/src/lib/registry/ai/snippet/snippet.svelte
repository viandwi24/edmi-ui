<script lang="ts">
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";
	import { setSnippetContext } from "./use-snippet.svelte.js";

	let {
		ref = $bindable(null),
		code,
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof InputGroup.Root> & { code: string } = $props();

	setSnippetContext({
		get code() {
			return code;
		},
	});
</script>

<InputGroup.Root bind:ref data-slot="ai-snippet" class={cn("font-mono", className)} {...restProps}>
	{@render children?.()}
</InputGroup.Root>
