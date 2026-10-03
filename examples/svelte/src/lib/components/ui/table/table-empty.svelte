<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLTdAttributes } from "svelte/elements";
	import TableRow from "./table-row.svelte";
	import TableCell from "./table-cell.svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		colspan = 1,
		...restProps
	}: WithElementRef<HTMLTdAttributes> = $props();
</script>

<TableRow class="hover:bg-transparent">
	<TableCell bind:ref {colspan} class={cn("text-foreground", className)} {...restProps}>
		<div class="flex h-24 items-center justify-center text-muted-foreground">
			{@render children?.()}
		</div>
	</TableCell>
</TableRow>
