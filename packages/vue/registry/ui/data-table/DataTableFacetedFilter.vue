<script setup lang="ts" generic="TData extends RowData, TValue">
import type { Column, RowData } from "@tanstack/vue-table";
import { Plus } from "@lucide/vue";
import { computed } from "vue";
import { Badge } from "@/registry/edmi/ui/badge";
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

/**
 * ✦ Dashed "+ Status" filter button with a checkbox menu. The column must set
 * `filterFn: "arrHas"`.
 */
const props = withDefaults(defineProps<{
	column?: Column<DataTableFeatures, TData, TValue>;
	title: string;
	/** ✦ raised trigger button */
	raised?: boolean;
	/** Defaults to the unique values found in the column. */
	options?: { label: string; value: string }[];
}>(), { raised: false });

const facets = computed(() => props.column?.getFacetedUniqueValues());
const items = computed(
	() =>
		props.options ??
		Array.from(facets.value?.keys() ?? []).map((value) => ({
			label: String(value),
			value: String(value),
		})),
);
const selected = computed(
	() => new Set((props.column?.getFilterValue() as string[] | undefined) ?? []),
);

function toggle(value: string, checked: boolean) {
	const next = new Set(selected.value);
	if (checked) next.add(value);
	else next.delete(value);
	props.column?.setFilterValue(next.size ? Array.from(next) : undefined);
}
</script>

<template>
	<DropdownMenu v-if="column">
		<DropdownMenuTrigger as-child>
			<Button variant="outline" size="sm" :raised="raised" class="border-dashed">
				<Plus />
				{{ title }}
				<Badge v-if="selected.size > 0" variant="brand" shape="number">
					{{ selected.size }}
				</Badge>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="start" class="w-48">
			<DropdownMenuGroup>
				<DropdownMenuLabel>{{ title }}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem
					v-for="option in items"
					:key="option.value"
					class="capitalize"
					:model-value="selected.has(option.value)"
					@update:model-value="(checked: boolean) => toggle(option.value, !!checked)"
				>
					{{ option.label }}
					<span class="ml-auto font-mono text-xs text-muted-foreground">
						{{ facets?.get(option.value) ?? 0 }}
					</span>
				</DropdownMenuCheckboxItem>
			</DropdownMenuGroup>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
