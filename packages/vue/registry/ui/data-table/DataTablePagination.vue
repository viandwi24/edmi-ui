<script setup lang="ts" generic="TData extends RowData">
import type { RowData, Table } from "@tanstack/vue-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "@lucide/vue";
import { computed } from "vue";
import { Button } from "@/registry/edmi/ui/button";
import type { Elevation } from "@/registry/edmi/ui/elevation";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/edmi/ui/select";
import type { DataTableFeatures } from "./dataTableFeatures";

const props = withDefaults(
	defineProps<{
		table: Table<DataTableFeatures, TData>;
		pageSizes?: number[];
		/** ✦ depth of the toolbar and pagination controls (the table container stays flat). */
		elevation?: Elevation;
	}>(),
	{ pageSizes: () => [10, 20, 30, 40, 50] },
);

// The current size (e.g. `DataTable :page-size="5"`) must be an option, or the trigger renders blank.
const sizes = computed(() => {
	const current = props.table.atoms.pagination.get().pageSize;
	return props.pageSizes.includes(current)
		? props.pageSizes
		: [...props.pageSizes, current].sort((a, b) => a - b);
});
</script>

<template>
	<div class="flex items-center justify-between gap-4 text-[13px]">
		<div class="flex-1 text-muted-foreground">
			{{ table.getFilteredSelectedRowModel().rows.length }} of
			{{ table.getFilteredRowModel().rows.length }} row(s) selected.
		</div>
		<div class="flex items-center gap-4 lg:gap-6">
			<div class="flex items-center gap-2">
				<span class="text-muted-foreground">Rows per page</span>
				<Select
					:model-value="`${table.atoms.pagination.get().pageSize}`"
					@update:model-value="(value) => table.setPageSize(Number(value))"
				>
					<SelectTrigger size="sm" :elevation="elevation" class="w-[72px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent side="top">
						<SelectItem v-for="size in sizes" :key="size" :value="`${size}`">
							{{ size }}
						</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div class="flex min-w-[88px] items-center justify-center font-medium">
				Page {{ table.atoms.pagination.get().pageIndex + 1 }} of
				{{ table.getPageCount() }}
			</div>
			<div class="flex items-center gap-1">
				<Button
					variant="outline"
					size="icon-sm"
					:elevation="elevation"
					class="hidden lg:inline-flex"
					:disabled="!table.getCanPreviousPage()"
					@click="table.setPageIndex(0)"
				>
					<span class="sr-only">Go to first page</span>
					<ChevronsLeft />
				</Button>
				<Button
					variant="outline"
					size="icon-sm"
					:elevation="elevation"
					:disabled="!table.getCanPreviousPage()"
					@click="table.previousPage()"
				>
					<span class="sr-only">Go to previous page</span>
					<ChevronLeft />
				</Button>
				<Button
					variant="outline"
					size="icon-sm"
					:elevation="elevation"
					:disabled="!table.getCanNextPage()"
					@click="table.nextPage()"
				>
					<span class="sr-only">Go to next page</span>
					<ChevronRight />
				</Button>
				<Button
					variant="outline"
					size="icon-sm"
					:elevation="elevation"
					class="hidden lg:inline-flex"
					:disabled="!table.getCanNextPage()"
					@click="table.setPageIndex(table.getPageCount() - 1)"
				>
					<span class="sr-only">Go to last page</span>
					<ChevronsRight />
				</Button>
			</div>
		</div>
	</div>
</template>
