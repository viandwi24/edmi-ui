import { type ColumnDef, type RowData, useTable } from "@tanstack/react-table";
import { cn } from "cn";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import type { Elevation } from "@/registry/edmi/ui/elevation";
import { Input } from "@/registry/edmi/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/registry/edmi/ui/table";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { type DataTableFeatures, features } from "./data-table-features";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableViewOptions } from "./data-table-view-options";

export type DataTableColumnDef<TData extends RowData> = ColumnDef<
	DataTableFeatures,
	TData,
	// biome-ignore lint/suspicious/noExplicitAny: column value types differ per column
	any
>;

interface DataTableProps<TData extends RowData> {
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
	className?: string;
	/** ✦ depth of the toolbar and pagination controls (the table container stays flat). */
	elevation?: Elevation;
}

function DataTable<TData extends RowData>({
	columns,
	data,
	filterColumn,
	filterPlaceholder = "Filter…",
	facetedFilters,
	pageSize = 10,
	className,
	elevation,
}: DataTableProps<TData>) {
	const table = useTable({
		features,
		data,
		columns,
		initialState: { pagination: { pageIndex: 0, pageSize } },
	});

	const filterInput = filterColumn ? table.getColumn(filterColumn) : undefined;

	return (
		<div data-slot="data-table" className={cn("w-full space-y-3", className)}>
			<div className="flex flex-wrap items-center gap-2">
				{filterInput && (
					<div className="relative w-full max-w-[260px]">
						<IconPlaceholder
							lucide="SearchIcon"
							tabler="IconSearch"
							hugeicons="SearchIcon"
							phosphor="MagnifyingGlassIcon"
							remixicon="RiSearchLine"
							className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground"
						/>
						<Input
							placeholder={filterPlaceholder}
							value={(filterInput.getFilterValue() as string) ?? ""}
							onChange={(event) =>
								filterInput.setFilterValue(event.target.value)
							}
							className="pl-8"
						/>
					</div>
				)}
				{facetedFilters?.map((f) => (
					<DataTableFacetedFilter
						key={f.column}
						column={table.getColumn(f.column)}
						title={f.title}
						options={f.options}
						elevation={elevation}
					/>
				))}
				<DataTableViewOptions table={table} elevation={elevation} />
			</div>
			<div className="overflow-hidden rounded-xl border border-border bg-card">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className="hover:bg-transparent">
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id} colSpan={header.colSpan}>
										{header.isPlaceholder ? null : (
											<table.FlexRender header={header} />
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() ? "selected" : undefined}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											<table.FlexRender cell={cell} />
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center text-muted-foreground"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination table={table} elevation={elevation} />
		</div>
	);
}

export { DataTable };
