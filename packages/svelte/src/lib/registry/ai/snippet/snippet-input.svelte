<script lang="ts">
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import { cn } from "$lib/utils.js";
	import type { HTMLInputAttributes } from "svelte/elements";
	import { useSnippetContext } from "./use-snippet.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: Omit<HTMLInputAttributes, "value" | "readonly" | "type"> & { ref?: HTMLElement | null } = $props();

	const snippet = useSnippetContext();
</script>

<InputGroup.Input
	bind:ref
	class={cn("font-mono text-xs text-ellipsis text-foreground", className)}
	readonly
	value={snippet.code}
	{...(restProps as Record<string, unknown>)}
/>
