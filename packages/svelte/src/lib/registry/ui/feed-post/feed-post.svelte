<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Card } from "$lib/registry/ui/card/index.js";
	import type { Elevation } from "$lib/registry/ui/elevation/index.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		elevation = "auto",
		children,
		...restProps
	}: ComponentProps<typeof Card> & {
		/** ✦ depth of the card: sunken -1, flat 0, raised +1, floating +2. */
		elevation?: Elevation;
	} = $props();
</script>

<Card bind:ref {elevation} data-slot="feed-post" class={cn("gap-0 px-[18px] py-[18px]", className)} {...restProps}>
	{@render children?.()}
</Card>
