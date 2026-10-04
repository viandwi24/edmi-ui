<script lang="ts" generics="TData extends RowData">
	import type { RowData, Table } from "@tanstack/svelte-table";
	import CaretDoubleLeftIcon from 'phosphor-svelte/lib/CaretDoubleLeft';
	import CaretLeftIcon from 'phosphor-svelte/lib/CaretLeft';
	import CaretRightIcon from 'phosphor-svelte/lib/CaretRight';
	import CaretDoubleRightIcon from 'phosphor-svelte/lib/CaretDoubleRight';
	import { Button } from "#lib/components/ui/button/index.js";
	import type { Elevation } from "#lib/components/ui/elevation/index.js";
	import * as Select from "#lib/components/ui/select/index.js";
	import type { DataTableFeatures } from "./data-table-features.js";

	let {
		table,
		pageSizes = [10, 20, 30, 40, 50],
		elevation = "auto",
	}: {
		table: Table<DataTableFeatures, TData>;
		pageSizes?: number[];
		/** ✦ depth of the toolbar and pagination controls (the table container stays flat). */
		elevation?: Elevation;
	} = $props();

	const pagination = $derived(table.atoms.pagination.get());
	// The current size (e.g. `pageSize={5}`) must be an option, or the select shows blank.
	const sizes = $derived(
		pageSizes.includes(pagination.pageSize)
			? pageSizes
			: [...pageSizes, pagination.pageSize].sort((a, b) => a - b)
	);
</script>

<div class="flex items-center justify-between gap-4 text-[13px]">
	<div class="flex-1 text-muted-foreground">
		{table.getFilteredSelectedRowModel().rows.length} of
		{table.getFilteredRowModel().rows.length} row(s) selected.
	</div>
	<div class="flex items-center gap-4 lg:gap-6">
		<div class="flex items-center gap-2">
			<span class="text-muted-foreground">Rows per page</span>
			<Select.Root
				type="single"
				value={`${pagination.pageSize}`}
				onValueChange={(value) => table.setPageSize(Number(value))}
			>
				<Select.Trigger size="sm" {elevation} class="w-[72px]">
					{pagination.pageSize}
				</Select.Trigger>
				<Select.Content side="top">
					{#each sizes as size (size)}
						<Select.Item value={`${size}`} label={`${size}`}>{size}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
		<div class="flex min-w-[88px] items-center justify-center font-medium">
			Page {pagination.pageIndex + 1} of {table.getPageCount()}
		</div>
		<div class="flex items-center gap-1">
			<Button
				variant="outline"
				{elevation}
				size="icon-sm"
				class="hidden lg:inline-flex"
				onclick={() => table.setPageIndex(0)}
				disabled={!table.getCanPreviousPage()}
			>
				<span class="sr-only">Go to first page</span>
				<CaretDoubleLeftIcon  />
			</Button>
			<Button
				variant="outline"
				{elevation}
				size="icon-sm"
				onclick={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}
			>
				<span class="sr-only">Go to previous page</span>
				<CaretLeftIcon  />
			</Button>
			<Button
				variant="outline"
				{elevation}
				size="icon-sm"
				onclick={() => table.nextPage()}
				disabled={!table.getCanNextPage()}
			>
				<span class="sr-only">Go to next page</span>
				<CaretRightIcon  />
			</Button>
			<Button
				variant="outline"
				{elevation}
				size="icon-sm"
				class="hidden lg:inline-flex"
				onclick={() => table.setPageIndex(table.getPageCount() - 1)}
				disabled={!table.getCanNextPage()}
			>
				<span class="sr-only">Go to last page</span>
				<CaretDoubleRightIcon  />
			</Button>
		</div>
	</div>
</div>
