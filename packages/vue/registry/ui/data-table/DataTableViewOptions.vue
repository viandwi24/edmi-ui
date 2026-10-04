<script setup lang="ts" generic="TData extends RowData">
import type { RowData, Table } from "@tanstack/vue-table";
import { ChevronDown, PanelLeft } from "@lucide/vue";
import { Button } from "@/registry/edmi/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/registry/edmi/ui/dropdown-menu";
import type { DataTableFeatures } from "./dataTableFeatures";

/** Column menu label: `meta.label`, else a string header, else the column id. */
function columnLabel(column: { id: string; columnDef: { header?: unknown; meta?: unknown } }) {
	const label = (column.columnDef.meta as { label?: string } | undefined)?.label;
	if (label) return label;
	const header = column.columnDef.header;
	return typeof header === "string" ? header : column.id;
}

withDefaults(
	defineProps<{
		table: Table<DataTableFeatures, TData>;
		/** ✦ raised trigger button */
		raised?: boolean;
	}>(),
	{ raised: false },
);
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="outline" size="sm" :elevation="raised ? 'raised' : undefined" class="ml-auto">
				<PanelLeft />
				Columns
				<ChevronDown />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" class="w-44">
			<DropdownMenuGroup>
				<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem
					v-for="column in table
						.getAllColumns()
						.filter((c) => typeof c.accessorFn !== 'undefined' && c.getCanHide())"
					:key="column.id"
					class="capitalize"
					:model-value="column.getIsVisible()"
					@update:model-value="(value: boolean) => column.toggleVisibility(!!value)"
				>
					{{ columnLabel(column) }}
				</DropdownMenuCheckboxItem>
			</DropdownMenuGroup>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
