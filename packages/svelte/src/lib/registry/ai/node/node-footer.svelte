<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { cn } from "$lib/utils.js";
	import { CardFooter } from "$lib/registry/ui/card/index.js";

	let { class: className, children, ...restProps }: ComponentProps<typeof CardFooter> = $props();
</script>

<CardFooter {...restProps} data-slot="ai-node-footer" class={cn("rounded-b-[inherit] border-t border-border-2 bg-transparent px-3 py-2 text-[11.5px] text-muted-foreground", className)}>
	{@render children?.()}
</CardFooter>
