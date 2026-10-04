<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { cn } from "$lib/utils.js";
	import { CardDescription } from "$lib/registry/ui/card/index.js";

	let { class: className, children, ...restProps }: ComponentProps<typeof CardDescription> = $props();
</script>

<CardDescription {...restProps} data-slot="ai-node-description" class={cn("text-xs", className)}>
	{@render children?.()}
</CardDescription>
