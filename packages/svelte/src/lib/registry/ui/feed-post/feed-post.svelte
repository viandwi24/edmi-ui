<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Card } from "$lib/registry/ui/card/index.js";
	import type { ComponentProps } from "svelte";

	let { class: className, children, ...restProps }: ComponentProps<typeof Card> = $props();
</script>

<Card data-slot="feed-post" class={cn("gap-0 px-[18px] py-[18px]", className)} {...restProps}>
	{@render children?.()}
</Card>
