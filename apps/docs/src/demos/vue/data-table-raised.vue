<script setup lang="ts">
import { createColumnHelper } from "@tanstack/vue-table";
import { h } from "vue";
import { Badge } from "@edmi-vue/ui/badge";
import { Checkbox } from "@edmi-vue/ui/checkbox";
import {
  DataTable,
  DataTableColumnHeader,
  DataTableRowActions,
  type features,
} from "@edmi-vue/ui/data-table";
import { DropdownMenuItem, DropdownMenuSeparator } from "@edmi-vue/ui/dropdown-menu";

type Index = {
  symbol: string;
  name: string;
  creator: string;
  status: "live" | "paused";
  aum: number;
  holders: number;
  day: number;
};

const data: Index[] = [
  { symbol: "MAG4", name: "Magnificent Four", creator: "@dewi", status: "live", aum: 49182, holders: 412, day: 0.53 },
  { symbol: "PREIPO", name: "Pre-IPO Basket", creator: "@noah", status: "live", aum: 31770, holders: 265, day: 4.1 },
  { symbol: "AIDX", name: "AI Infra", creator: "@sarah", status: "paused", aum: 18904, holders: 140, day: -1.2 },
  { symbol: "CHIPS", name: "Semis Core", creator: "@emily", status: "live", aum: 12330, holders: 98, day: 0.21 },
  { symbol: "ENRGY", name: "Energy Transition", creator: "@lucas", status: "paused", aum: 8412, holders: 61, day: -0.44 },
  { symbol: "BANKS", name: "Global Banks", creator: "@dewi", status: "live", aum: 7120, holders: 55, day: 0.12 },
  { symbol: "BIO", name: "Biotech Leaders", creator: "@noah", status: "live", aum: 6410, holders: 47, day: -0.9 },
];

const col = createColumnHelper<typeof features, Index>();

const columns = col.columns([
  col.display({
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        modelValue: table.getIsAllPageRowsSelected()
          ? true
          : table.getIsSomePageRowsSelected()
            ? "indeterminate"
            : false,
        "onUpdate:modelValue": (v: boolean | "indeterminate") =>
          table.toggleAllPageRowsSelected(!!v),
        ariaLabel: "Select all",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": (v: boolean | "indeterminate") => row.toggleSelected(!!v),
        ariaLabel: "Select row",
      }),
    enableSorting: false,
    enableHiding: false,
  }),
  col.accessor("symbol", {
    id: "index",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Index" }),
    cell: ({ row }) =>
      h("div", [
        h("div", { class: "font-semibold" }, row.original.symbol),
        h("div", { class: "text-[11.5px] text-muted-foreground" }, row.original.name),
      ]),
  }),
  col.accessor("creator", {
    filterFn: "arrHas",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Creator" }),
    cell: ({ getValue }) => h("span", { class: "text-muted-foreground" }, getValue()),
  }),
  col.accessor("status", {
    header: "Status",
    filterFn: "arrHas",
    cell: ({ getValue }) => h("span", { class: "capitalize" }, getValue()),
  }),
  col.accessor("aum", {
    meta: { label: "AUM" },
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "AUM", numeric: true }),
    cell: ({ getValue }) =>
      h("div", { class: "text-right font-mono tabular-nums" }, `$${getValue().toLocaleString("en-US")}`),
  }),
  col.accessor("holders", {
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Holders", numeric: true }),
    cell: ({ getValue }) => h("div", { class: "text-right font-mono tabular-nums" }, getValue()),
  }),
  col.accessor("day", {
    id: "24h",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "24h", numeric: true }),
    cell: ({ getValue }) => {
      const v = getValue();
      return h("div", { class: "text-right" }, [
        h(
          Badge,
          { variant: v >= 0 ? "success" : "destructive", class: "font-mono" },
          () => `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(2)}%`,
        ),
      ]);
    },
  }),
  col.display({
    id: "actions",
    enableHiding: false,
    cell: ({ row }) =>
      h("div", { class: "text-right" }, [
        h(DataTableRowActions, null, {
          default: () => [
            h(
              DropdownMenuItem,
              { onClick: () => navigator.clipboard.writeText(row.original.symbol) },
              () => "Copy symbol",
            ),
            h(DropdownMenuSeparator),
            h(DropdownMenuItem, null, () => "View index"),
          ],
        }),
      ]),
  }),
]);

const levels = [
	{ value: "flat", label: "Flat (0)" } as const,
	{ value: "raised", label: "Raised (+1)" } as const,
];
</script>

<template>
	<div class="flex flex-col gap-6">
		<div v-for="l in levels" :key="l.value" class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{{ l.label }}</p>
  <DataTable
    :elevation="l.value"
    :columns="columns"
    :data="data"
    filter-column="index"
    filter-placeholder="Filter indexes…"
    :faceted-filters="[
      { column: 'status', title: 'Status' },
      { column: 'creator', title: 'Creator' },
    ]"
    :page-size="5"
  />
		</div>
	</div>
</template>
