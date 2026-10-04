<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { CardHeader } from "$lib/registry/ui/card/index.js";
	import type { ComponentProps } from "svelte";

	let { class: className, children, ...restProps }: ComponentProps<typeof CardHeader> = $props();
</script>

<CardHeader
	data-slot="ai-plan-header"
	class={cn("flex items-start justify-between gap-2.5 py-3.5", className)}
	{...restProps}
>
	{@render children?.()}
</CardHeader>
