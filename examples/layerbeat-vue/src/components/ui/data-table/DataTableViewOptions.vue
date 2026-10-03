<script setup lang="ts" generic="TData extends RowData">
import type { RowData, Table } from "@tanstack/vue-table";
import { PhCaretDown, PhSidebarSimple } from '@phosphor-icons/vue';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { DataTableFeatures } from "./dataTableFeatures";

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
			<Button variant="outline" size="sm" :raised="raised" class="ml-auto">
				<PhSidebarSimple />
				Columns
				<PhCaretDown />
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
					{{ column.id }}
				</DropdownMenuCheckboxItem>
			</DropdownMenuGroup>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
