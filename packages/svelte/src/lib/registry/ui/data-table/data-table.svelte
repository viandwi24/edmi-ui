<script lang="ts" module>
	import type { ColumnDef, RowData } from "@tanstack/svelte-table";
	import type { DataTableFeatures } from "./data-table-features.js";

	export type DataTableColumnDef<TData extends RowData> = ColumnDef<
		DataTableFeatures,
		TData,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		any
	>;
</script>

<script lang="ts" generics="TData extends RowData">
	import { createTable, FlexRender } from "@tanstack/svelte-table";
	import { cn } from "$lib/utils.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import type { Elevation } from "$lib/registry/ui/elevation/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import * as Table from "$lib/registry/ui/table/index.js";
	import DataTableFacetedFilter from "./data-table-faceted-filter.svelte";
	import DataTablePagination from "./data-table-pagination.svelte";
	import DataTableViewOptions from "./data-table-view-options.svelte";
	import { features } from "./data-table-features.js";

	let {
		columns,
		data,
		filterColumn,
		filterPlaceholder = "Filter…",
		facetedFilters,
		pageSize = 10,
		elevation = "auto",
		class: className,
	}: {
		columns: DataTableColumnDef<TData>[];
		data: TData[];
		/** Column id the toolbar filter input searches. Omit to hide the input. */
		filterColumn?: string;
		filterPlaceholder?: string;
		/** ✦ Faceted filter buttons; columns need `filterFn: "arrHas"`. */
		facetedFilters?: {
			column: string;
			title: string;
			options?: { label: string; value: string }[];
		}[];
		pageSize?: number;
		/** ✦ depth of the toolbar and pagination controls (the table container stays flat). */
		elevation?: Elevation;
		class?: string;
	} = $props();

	const table = createTable<DataTableFeatures, TData>({
		features,
		get data() {
			return data;
		},
		get columns() {
			return columns;
		},
		// svelte-ignore state_referenced_locally
		initialState: { pagination: { pageIndex: 0, pageSize } },
	});

	const filterInput = $derived(filterColumn ? table.getColumn(filterColumn) : undefined);
</script>

<div data-slot="data-table" class={cn("w-full space-y-3", className)}>
	<div class="flex flex-wrap items-center gap-2">
		{#if filterInput}
			<div class="relative w-full max-w-[260px]">
				<IconPlaceholder
					lucide="SearchIcon"
					tabler="IconSearch"
					hugeicons="SearchIcon"
					phosphor="MagnifyingGlassIcon"
					remixicon="RiSearchLine"
					class="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground"
				/>
				<Input
					placeholder={filterPlaceholder}
					value={(filterInput.getFilterValue() as string) ?? ""}
					oninput={(event) => filterInput.setFilterValue(event.currentTarget.value)}
					{elevation}
					class="h-[34px] pl-8"
				/>
			</div>
		{/if}
		{#each facetedFilters ?? [] as f (f.column)}
			<DataTableFacetedFilter column={table.getColumn(f.column)} title={f.title} options={f.options} {elevation} />
		{/each}
		<DataTableViewOptions {table} {elevation} />
	</div>
	<div class="overflow-hidden rounded-xl border border-border bg-card">
		<Table.Root>
			<Table.Header>
				{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
					<Table.Row class="hover:bg-transparent">
						{#each headerGroup.headers as header (header.id)}
							<Table.Head colspan={header.colSpan}>
								{#if !header.isPlaceholder}
									<FlexRender {header} />
								{/if}
							</Table.Head>
						{/each}
					</Table.Row>
				{/each}
			</Table.Header>
			<Table.Body>
				{#each table.getRowModel().rows as row (row.id)}
					<Table.Row data-state={row.getIsSelected() ? "selected" : undefined}>
						{#each row.getVisibleCells() as cell (cell.id)}
							<Table.Cell>
								<FlexRender {cell} />
							</Table.Cell>
						{/each}
					</Table.Row>
				{:else}
					<Table.Empty colspan={columns.length}>No results.</Table.Empty>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<DataTablePagination {table} {elevation} />
</div>
