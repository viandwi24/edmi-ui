<script lang="ts">
	import { createColumnHelper } from "@tanstack/svelte-table";
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Checkbox } from "@edmi-svelte/ui/checkbox";
	import {
		DataTable,
		DataTableColumnHeader,
		DataTableRowActions,
		renderComponent,
		renderSnippet,
		type features,
	} from "@edmi-svelte/ui/data-table";
	import * as DropdownMenu from "@edmi-svelte/ui/dropdown-menu";

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
				renderComponent(Checkbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (v: boolean) => table.toggleAllPageRowsSelected(!!v),
					"aria-label": "Select all",
				}),
			cell: ({ row }) =>
				renderComponent(Checkbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (v: boolean) => row.toggleSelected(!!v),
					"aria-label": "Select row",
				}),
			enableSorting: false,
			enableHiding: false,
		}),
		col.accessor("symbol", {
			id: "index",
			header: ({ column }) => renderComponent(DataTableColumnHeader, { column, title: "Index" }),
			cell: ({ row }) => renderSnippet(indexCell, row.original),
		}),
		col.accessor("creator", {
			filterFn: "arrHas",
			header: ({ column }) => renderComponent(DataTableColumnHeader, { column, title: "Creator" }),
			cell: ({ getValue }) => renderSnippet(creatorCell, getValue()),
		}),
		col.accessor("status", {
			header: "Status",
			filterFn: "arrHas",
			cell: ({ getValue }) => renderSnippet(statusCell, getValue()),
		}),
		col.accessor("aum", {
			meta: { label: "AUM" },
			header: ({ column }) =>
				renderComponent(DataTableColumnHeader, { column, title: "AUM", numeric: true }),
			cell: ({ getValue }) => renderSnippet(aumCell, getValue()),
		}),
		col.accessor("holders", {
			header: ({ column }) =>
				renderComponent(DataTableColumnHeader, { column, title: "Holders", numeric: true }),
			cell: ({ getValue }) => renderSnippet(holdersCell, getValue()),
		}),
		col.accessor("day", {
			id: "24h",
			header: ({ column }) =>
				renderComponent(DataTableColumnHeader, { column, title: "24h", numeric: true }),
			cell: ({ getValue }) => renderSnippet(dayCell, getValue()),
		}),
		col.display({
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => renderSnippet(actionsCell, row.original),
		}),
	]);

	const levels = [
		{ value: "flat", label: "Flat (0)" } as const,
		{ value: "raised", label: "Raised (+1)" } as const,
	];
</script>

{#snippet indexCell(row: Index)}
	<div>
		<div class="font-semibold">{row.symbol}</div>
		<div class="text-[11.5px] text-muted-foreground">{row.name}</div>
	</div>
{/snippet}
{#snippet creatorCell(v: string)}
	<span class="text-muted-foreground">{v}</span>
{/snippet}
{#snippet statusCell(v: string)}
	<span class="capitalize">{v}</span>
{/snippet}
{#snippet aumCell(v: number)}
	<div class="text-right font-mono tabular-nums">${v.toLocaleString("en-US")}</div>
{/snippet}
{#snippet holdersCell(v: number)}
	<div class="text-right font-mono tabular-nums">{v}</div>
{/snippet}
{#snippet dayCell(v: number)}
	<div class="text-right">
		<Badge variant={v >= 0 ? "success" : "destructive"} class="font-mono">
			{v >= 0 ? "+" : "−"}{Math.abs(v).toFixed(2)}%
		</Badge>
	</div>
{/snippet}
{#snippet actionsCell(row: Index)}
	<div class="text-right">
		<DataTableRowActions>
			<DropdownMenu.Item onclick={() => navigator.clipboard.writeText(row.symbol)}>
				Copy symbol
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>View index</DropdownMenu.Item>
		</DataTableRowActions>
	</div>
{/snippet}

<div class="flex flex-col gap-6">
	{#each levels as l (l.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{l.label}</p>
<DataTable
	elevation={l.value}
	{columns}
	{data}
	filterColumn="index"
	filterPlaceholder="Filter indexes…"
	facetedFilters={[
		{ column: "status", title: "Status" },
		{ column: "creator", title: "Creator" },
	]}
	pageSize={5}
/>
		</div>
	{/each}
</div>
