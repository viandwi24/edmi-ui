import type { Item } from "./types.ts";

export const items: Item[] = [
	{
		name: "table",
		title: "Table",
		description:
			"Plain styled HTML table. Numbers are mono and right-aligned (numeric, trend); the footer holds totals.",
		type: "registry:ui",
		categories: ["Data"],
		docs: "Replaces the stock table: `shadcn add @edmi-ui/table --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/table.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "chart",
		title: "Chart",
		description:
			"Recharts wrapped in ChartContainer that maps series to --chart-1…5, with the floating Edmi tooltip (dot, line, dashed, none), legend, scoped validated dark palette and ✦ ChartStatWell.",
		type: "registry:ui",
		categories: ["Data"],
		docs: "Replaces the stock chart: `shadcn add @edmi-ui/chart --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/chart.tsx" }],
				dependencies: ["cn", "recharts@3.8.0"],
			},
		},
	},
	{
		name: "data-table",
		title: "Data Table",
		description:
			"TanStack Table v9 data table: filter input, faceted filters, sortable column headers, column visibility, row selection, row actions and pagination.",
		type: "registry:block",
		categories: ["Data"],
		registryDependencies: [
			"table",
			"button",
			"input",
			"badge",
			"checkbox",
			"select",
			"dropdown-menu",
			"elevation",
		],
		docs: "Edmi block built on the stock data-table recipe (TanStack Table v9): `shadcn add @edmi-ui/data-table`. Build columns with `createColumnHelper<typeof features, Row>()`.",
		frameworks: {
			react: {
				files: [
					{ path: "registry/blocks/data-table/data-table.tsx" },
					{ path: "registry/blocks/data-table/data-table-features.ts" },
					{ path: "registry/blocks/data-table/data-table-column-header.tsx" },
					{ path: "registry/blocks/data-table/data-table-view-options.tsx" },
					{ path: "registry/blocks/data-table/data-table-pagination.tsx" },
					{ path: "registry/blocks/data-table/data-table-faceted-filter.tsx" },
					{ path: "registry/blocks/data-table/data-table-row-actions.tsx" },
				],
				dependencies: ["@tanstack/react-table", "cn"],
			},
		},
	},
];
