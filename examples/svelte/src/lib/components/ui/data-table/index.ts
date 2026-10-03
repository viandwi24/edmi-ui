import Root from "./data-table.svelte";
import ColumnHeader from "./data-table-column-header.svelte";
import FacetedFilter from "./data-table-faceted-filter.svelte";
import Pagination from "./data-table-pagination.svelte";
import RowActions from "./data-table-row-actions.svelte";
import ViewOptions from "./data-table-view-options.svelte";

export {
	FlexRender,
	renderComponent,
	renderSnippet,
} from "@tanstack/svelte-table";
export type { DataTableColumnDef } from "./data-table.svelte";
export { type DataTableFeatures, features } from "./data-table-features.js";

export {
	ColumnHeader,
	ColumnHeader as DataTableColumnHeader,
	FacetedFilter,
	FacetedFilter as DataTableFacetedFilter,
	Pagination,
	Pagination as DataTablePagination,
	Root,
	//
	Root as DataTable,
	RowActions,
	RowActions as DataTableRowActions,
	ViewOptions,
	ViewOptions as DataTableViewOptions,
};
