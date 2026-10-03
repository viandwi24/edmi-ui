<script lang="ts">
	import { Card } from "#lib/components/ui/card/index.js";
	import { cn } from "#lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: Omit<ComponentProps<typeof Card>, "size"> = $props();
</script>

<!-- Row of numbers in one card; cells are divided by 1px borders. -->
<Card bind:ref data-slot="stat-strip" class={cn("flex-row gap-0 overflow-x-auto p-0", className)} {...restProps}>
	{@render children?.()}
</Card>
