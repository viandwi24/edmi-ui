<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { cn } from "$lib/utils.js";
	import { CardHeader } from "$lib/registry/ui/card/index.js";

	let { class: className, children, ...restProps }: ComponentProps<typeof CardHeader> = $props();
</script>

<CardHeader {...restProps} data-slot="ai-node-header" class={cn("gap-0.5 rounded-t-[inherit] border-b border-border-2 px-3 py-2.5 [.border-b]:pb-2.5", className)}>
	{@render children?.()}
</CardHeader>
