<script lang="ts" generics="TData extends RowData">
	import type { RowData, Table } from "@tanstack/svelte-table";
	import ColumnsIcon from 'phosphor-svelte/lib/Columns';
	import CaretDownIcon from 'phosphor-svelte/lib/CaretDown';
	import { Button } from "#lib/components/ui/button/index.js";
	import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.js";
	import type { DataTableFeatures } from "./data-table-features.js";

	let { table }: { table: Table<DataTableFeatures, TData> } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline" size="sm" class="ml-auto">
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
					{column.id}
				</DropdownMenu.CheckboxItem>
			{/each}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
