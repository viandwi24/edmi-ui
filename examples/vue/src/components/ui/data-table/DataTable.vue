<script lang="ts">
import type { ColumnDef, RowData } from "@tanstack/vue-table";
import type { DataTableFeatures } from "./dataTableFeatures";

export type DataTableColumnDef<TData extends RowData> = ColumnDef<
    DataTableFeatures,
    TData,
    // biome-ignore lint/suspicious/noExplicitAny: column value types differ per column
    any
>;
</script>

<script setup lang="ts" generic="TData extends RowData">
import type { HTMLAttributes } from "vue";
import { FlexRender, useTable } from "@tanstack/vue-table";
import { PhMagnifyingGlass } from '@phosphor-icons/vue';
import { computed } from "vue";
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import type { Elevation } from '@/components/ui/elevation';
import {
    Table,
    TableBody,
    TableCell,
    TableEmpty,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import DataTableFacetedFilter from "./DataTableFacetedFilter.vue";
import DataTablePagination from "./DataTablePagination.vue";
import DataTableViewOptions from "./DataTableViewOptions.vue";
import { features } from "./dataTableFeatures";

const props = withDefaults(
    defineProps<{
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
        class?: HTMLAttributes["class"];
    }>(),
    { filterPlaceholder: "Filter…", pageSize: 10 },
);

const table = useTable({
    features,
    get data() {
        return props.data;
    },
    get columns() {
        return props.columns;
    },
    initialState: { pagination: { pageIndex: 0, pageSize: props.pageSize } },
});

const filterInput = computed(() =>
    props.filterColumn ? table.getColumn(props.filterColumn) : undefined,
);
</script>

<template>
	<div data-slot="data-table" :class="cn('w-full space-y-3', props.class)">
		<div class="flex flex-wrap items-center gap-2">
			<div v-if="filterInput" class="relative w-full max-w-[260px]">
				<PhMagnifyingGlass class="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
				<Input
					:placeholder="filterPlaceholder"
					:model-value="(filterInput.getFilterValue() as string) ?? ''"
					class="h-9 pl-8"
					@update:model-value="(value) => filterInput?.setFilterValue(value)"
				/>
			</div>
			<DataTableFacetedFilter
				v-for="f in facetedFilters"
				:key="f.column"
				:column="table.getColumn(f.column)"
				:title="f.title"
				:options="f.options"
				:elevation="elevation"
			/>
			<DataTableViewOptions :table="table" :elevation="elevation" />
		</div>
		<div class="overflow-hidden rounded-xl border border-border bg-card">
			<Table>
				<TableHeader>
					<TableRow
						v-for="headerGroup in table.getHeaderGroups()"
						:key="headerGroup.id"
						class="hover:bg-transparent"
					>
						<TableHead v-for="header in headerGroup.headers" :key="header.id" :colspan="header.colSpan">
							<FlexRender v-if="!header.isPlaceholder" :header="header" />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<template v-if="table.getRowModel().rows.length">
						<TableRow
							v-for="row in table.getRowModel().rows"
							:key="row.id"
							:data-state="row.getIsSelected() ? 'selected' : undefined"
						>
							<TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
								<FlexRender :cell="cell" />
							</TableCell>
						</TableRow>
					</template>
					<TableEmpty v-else :colspan="columns.length">No results.</TableEmpty>
				</TableBody>
			</Table>
		</div>
		<DataTablePagination :table="table" :elevation="elevation" />
	</div>
</template>
