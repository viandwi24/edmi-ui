import type { ReactTable, RowData } from "@tanstack/react-table";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Button } from "@/registry/edmi/ui/button";
import type { Elevation } from "@/registry/edmi/ui/elevation";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/edmi/ui/select";
import type { DataTableFeatures } from "./data-table-features";

interface DataTablePaginationProps<TData extends RowData> {
	table: ReactTable<DataTableFeatures, TData>;
	pageSizes?: number[];
	/** ✦ depth of the toolbar and pagination controls (the table container stays flat). */
	elevation?: Elevation;
}

export function DataTablePagination<TData extends RowData>({
	table,
	pageSizes = [10, 20, 30, 40, 50],
	elevation,
}: DataTablePaginationProps<TData>) {
	const { pageIndex, pageSize } = table.state.pagination;
	// The current size (e.g. `DataTable pageSize={5}`) must be an option, or the trigger renders blank.
	const sizes = pageSizes.includes(pageSize)
		? pageSizes
		: [...pageSizes, pageSize].sort((a, b) => a - b);

	return (
		<div className="flex items-center justify-between gap-4 text-[13px]">
			<div className="flex-1 text-muted-foreground">
				{table.getFilteredSelectedRowModel().rows.length} of{" "}
				{table.getFilteredRowModel().rows.length} row(s) selected.
			</div>
			<div className="flex items-center gap-4 lg:gap-6">
				<div className="flex items-center gap-2">
					<span className="text-muted-foreground">Rows per page</span>
					<Select
						value={`${pageSize}`}
						onValueChange={(value) => table.setPageSize(Number(value))}
					>
						<SelectTrigger size="sm" elevation={elevation} className="w-[72px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent side="top">
							{sizes.map((size) => (
								<SelectItem key={size} value={`${size}`}>
									{size}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex min-w-[88px] items-center justify-center font-medium">
					Page {pageIndex + 1} of {table.getPageCount()}
				</div>
				<div className="flex items-center gap-1">
					<Button
						variant="outline"
						size="icon-sm"
						elevation={elevation}
						className="hidden lg:inline-flex"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to first page</span>
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
						elevation={elevation}
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to previous page</span>
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
						elevation={elevation}
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to next page</span>
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
						elevation={elevation}
						className="hidden lg:inline-flex"
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to last page</span>
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
	);
}
