import type { FrameworkEntry } from "./types.ts";

/** `frameworks.vue` entries for items in ./data.ts, keyed by item name (owned by the vue worker). */
export const entries: Record<string, FrameworkEntry> = {
	table: {
		files: [
			{ path: "registry/ui/table/Table.vue" },
			{ path: "registry/ui/table/TableBody.vue" },
			{ path: "registry/ui/table/TableCaption.vue" },
			{ path: "registry/ui/table/TableCell.vue" },
			{ path: "registry/ui/table/TableEmpty.vue" },
			{ path: "registry/ui/table/TableFooter.vue" },
			{ path: "registry/ui/table/TableHead.vue" },
			{ path: "registry/ui/table/TableHeader.vue" },
			{ path: "registry/ui/table/TableRow.vue" },
			{ path: "registry/ui/table/index.ts" },
		],
		dependencies: [],
	},
	chart: {
		files: [
			{ path: "registry/ui/chart/ChartContainer.vue" },
			{ path: "registry/ui/chart/ChartLegendContent.vue" },
			{ path: "registry/ui/chart/ChartStatWell.vue" },
			{ path: "registry/ui/chart/ChartStyle.vue" },
			{ path: "registry/ui/chart/ChartTooltipContent.vue" },
			{ path: "registry/ui/chart/index.ts" },
			{ path: "registry/ui/chart/utils.ts" },
		],
		dependencies: ["reka-ui", "@vueuse/core", "@unovis/ts", "@unovis/vue"],
	},
	"data-table": {
		files: [
			{ path: "registry/ui/data-table/DataTable.vue" },
			{ path: "registry/ui/data-table/DataTableColumnHeader.vue" },
			{ path: "registry/ui/data-table/DataTableFacetedFilter.vue" },
			{ path: "registry/ui/data-table/DataTablePagination.vue" },
			{ path: "registry/ui/data-table/DataTableRowActions.vue" },
			{ path: "registry/ui/data-table/DataTableViewOptions.vue" },
			{ path: "registry/ui/data-table/dataTableFeatures.ts" },
			{ path: "registry/ui/data-table/index.ts" },
		],
		type: "registry:ui",
		dependencies: ["@tanstack/vue-table"],
	},
};
