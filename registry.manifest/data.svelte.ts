import type { FrameworkEntry } from "./types.ts";

/** `frameworks.svelte` entries for items in ./data.ts, keyed by item name (owned by the svelte worker). */
export const entries: Record<string, FrameworkEntry> = {
	table: {
		files: [
			{ path: "src/lib/registry/ui/table/index.ts" },
			{ path: "src/lib/registry/ui/table/table-body.svelte" },
			{ path: "src/lib/registry/ui/table/table-caption.svelte" },
			{ path: "src/lib/registry/ui/table/table-cell.svelte" },
			{ path: "src/lib/registry/ui/table/table-empty.svelte" },
			{ path: "src/lib/registry/ui/table/table-footer.svelte" },
			{ path: "src/lib/registry/ui/table/table-head.svelte" },
			{ path: "src/lib/registry/ui/table/table-header.svelte" },
			{ path: "src/lib/registry/ui/table/table-row.svelte" },
			{ path: "src/lib/registry/ui/table/table.svelte" },
		],
	},
	chart: {
		files: [
			{ path: "src/lib/registry/ui/chart/chart-container.svelte" },
			{ path: "src/lib/registry/ui/chart/chart-stat-well.svelte" },
			{ path: "src/lib/registry/ui/chart/chart-style.svelte" },
			{ path: "src/lib/registry/ui/chart/chart-tooltip.svelte" },
			{ path: "src/lib/registry/ui/chart/chart-utils.ts" },
			{ path: "src/lib/registry/ui/chart/index.ts" },
		],
	},
	"data-table": {
		files: [
			{
				path: "src/lib/registry/ui/data-table/data-table-column-header.svelte",
			},
			{
				path: "src/lib/registry/ui/data-table/data-table-faceted-filter.svelte",
			},
			{ path: "src/lib/registry/ui/data-table/data-table-features.ts" },
			{ path: "src/lib/registry/ui/data-table/data-table-pagination.svelte" },
			{ path: "src/lib/registry/ui/data-table/data-table-row-actions.svelte" },
			{ path: "src/lib/registry/ui/data-table/data-table-view-options.svelte" },
			{ path: "src/lib/registry/ui/data-table/data-table.svelte" },
			{ path: "src/lib/registry/ui/data-table/index.ts" },
		],
		type: "registry:ui",
	},
};
