<script lang="ts" generics="TData extends RowData">
	import type { RowData, Table } from "@tanstack/svelte-table";
	import ColumnsIcon from 'phosphor-svelte/lib/Columns';
	import CaretDownIcon from 'phosphor-svelte/lib/CaretDown';
	import { Button } from "#lib/components/ui/button/index.js";
	import type { Elevation } from "#lib/components/ui/elevation/index.js";
	import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.js";
	import type { DataTableFeatures } from "./data-table-features.js";

	let {
		table,
		elevation = "auto",
	}: {
		table: Table<DataTableFeatures, TData>;
		/** ✦ depth of the toolbar and pagination controls (the table container stays flat). */
		elevation?: Elevation;
	} = $props();

	/** Column menu label: `meta.label`, else a string header, else the column id. */
	function columnLabel(column: { id: string; columnDef: { header?: unknown; meta?: unknown } }) {
		const label = (column.columnDef.meta as { label?: string } | undefined)?.label;
		if (label) return label;
		const header = column.columnDef.header;
		return typeof header === "string" ? header : column.id;
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline" size="sm" {elevation} class="ml-auto">
				<ColumnsIcon  />
				Columns
				<CaretDownIcon  />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end" class="w-44">
		<DropdownMenu.Group>
			<DropdownMenu.Label>Toggle columns</DropdownMenu.Label>
			<DropdownMenu.Separator />
			{#each table
				.getAllColumns()
				.filter((c) => typeof c.accessorFn !== "undefined" && c.getCanHide()) as column (column.id)}
				<DropdownMenu.CheckboxItem
					class="capitalize"
					checked={column.getIsVisible()}
					onCheckedChange={(value) => column.toggleVisibility(!!value)}
				>
					{columnLabel(column)}
				</DropdownMenu.CheckboxItem>
			{/each}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
