<script lang="ts">
	import { Card } from "#lib/components/ui/card/index.js";
	import { cn } from "#lib/utils.js";
	import type { Elevation } from "#lib/components/ui/elevation/index.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		elevation = "auto",
		children,
		...restProps
	}: Omit<ComponentProps<typeof Card>, "size"> & {
		/** ✦ depth of the strip (forwarded to Card). */
		elevation?: Elevation;
	} = $props();
</script>

<!-- Row of numbers in one card; cells are divided by 1px borders. -->
<Card bind:ref data-slot="stat-strip" {elevation} class={cn("flex-row gap-0 overflow-x-auto p-0", className)} {...restProps}>
	{@render children?.()}
</Card>
