<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import type { ComponentProps } from "svelte";

	let { class: className, children, ...restProps }: ComponentProps<typeof Badge> = $props();
</script>

<Badge
	data-slot="ai-chain-of-thought-search-result"
	shape="pill"
	variant="secondary"
	class={cn("h-5 gap-1 px-[7px] text-[11.5px] font-normal text-foreground-2", className)}
	{...restProps}
>
	{@render children?.()}
</Badge>
