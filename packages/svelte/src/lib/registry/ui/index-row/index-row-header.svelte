<script lang="ts">
	import { TableHead, TableRow } from "$lib/registry/ui/table/index.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		...restProps
	}: Omit<ComponentProps<typeof TableRow>, "children"> = $props();
</script>

<!-- Header row matching the IndexRow columns. Place it in `<TableHeader>`. -->
<TableRow bind:ref {...restProps}>
	<TableHead>Index</TableHead>
	<TableHead>Creator</TableHead>
	<TableHead class="text-right">Price</TableHead>
	<TableHead class="text-right">7d</TableHead>
	<TableHead class="text-right">AUM</TableHead>
	<TableHead class="text-right">Holders</TableHead>
	<TableHead class="text-right">30d</TableHead>
</TableRow>
