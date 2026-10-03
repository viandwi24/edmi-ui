<script lang="ts" generics="TData extends RowData">
	import type { RowData, Table } from "@tanstack/svelte-table";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import type { DataTableFeatures } from "./data-table-features.js";

	let {
		table,
		pageSizes = [10, 20, 30, 40, 50],
	}: { table: Table<DataTableFeatures, TData>; pageSizes?: number[] } = $props();

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
				<Select.Trigger size="sm" class="w-[72px]">
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
				size="icon-sm"
				class="hidden lg:inline-flex"
				onclick={() => table.setPageIndex(0)}
				disabled={!table.getCanPreviousPage()}
			>
				<span class="sr-only">Go to first page</span>
				<IconPlaceholder
					lucide="ChevronsLeftIcon"
					tabler="IconChevronsLeft"
					hugeicons="ArrowLeftDoubleIcon"
					phosphor="CaretDoubleLeftIcon"
					remixicon="RiSkipLeftLine"
				/>
			</Button>
			<Button
				variant="outline"
				size="icon-sm"
				onclick={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}
			>
				<span class="sr-only">Go to previous page</span>
				<IconPlaceholder
					lucide="ChevronLeftIcon"
					tabler="IconChevronLeft"
					hugeicons="ArrowLeft01Icon"
					phosphor="CaretLeftIcon"
					remixicon="RiArrowLeftSLine"
				/>
			</Button>
			<Button
				variant="outline"
				size="icon-sm"
				onclick={() => table.nextPage()}
				disabled={!table.getCanNextPage()}
			>
				<span class="sr-only">Go to next page</span>
				<IconPlaceholder
					lucide="ChevronRightIcon"
					tabler="IconChevronRight"
					hugeicons="ArrowRight01Icon"
					phosphor="CaretRightIcon"
					remixicon="RiArrowRightSLine"
				/>
			</Button>
			<Button
				variant="outline"
				size="icon-sm"
				class="hidden lg:inline-flex"
				onclick={() => table.setPageIndex(table.getPageCount() - 1)}
				disabled={!table.getCanNextPage()}
			>
				<span class="sr-only">Go to last page</span>
				<IconPlaceholder
					lucide="ChevronsRightIcon"
					tabler="IconChevronsRight"
					hugeicons="ArrowRightDoubleIcon"
					phosphor="CaretDoubleRightIcon"
					remixicon="RiSkipRightLine"
				/>
			</Button>
		</div>
	</div>
</div>
