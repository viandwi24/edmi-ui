import { DataTable } from "@edmi-react/blocks/data-table/data-table";
import { DataTableColumnHeader } from "@edmi-react/blocks/data-table/data-table-column-header";
import type { features } from "@edmi-react/blocks/data-table/data-table-features";
import { DataTableRowActions } from "@edmi-react/blocks/data-table/data-table-row-actions";
import { Badge } from "@edmi-react/ui/badge";
import { Checkbox } from "@edmi-react/ui/checkbox";
import {
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@edmi-react/ui/dropdown-menu";
import { createColumnHelper } from "@tanstack/react-table";

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
	{
		symbol: "MAG4",
		name: "Magnificent Four",
		creator: "@dewi",
		status: "live",
		aum: 49182,
		holders: 412,
		day: 0.53,
	},
	{
		symbol: "PREIPO",
		name: "Pre-IPO Basket",
		creator: "@noah",
		status: "live",
		aum: 31770,
		holders: 265,
		day: 4.1,
	},
	{
		symbol: "AIDX",
		name: "AI Infra",
		creator: "@sarah",
		status: "paused",
		aum: 18904,
		holders: 140,
		day: -1.2,
	},
	{
		symbol: "CHIPS",
		name: "Semis Core",
		creator: "@emily",
		status: "live",
		aum: 12330,
		holders: 98,
		day: 0.21,
	},
	{
		symbol: "ENRGY",
		name: "Energy Transition",
		creator: "@lucas",
		status: "paused",
		aum: 8412,
		holders: 61,
		day: -0.44,
	},
	{
		symbol: "BANKS",
		name: "Global Banks",
		creator: "@dewi",
		status: "live",
		aum: 7120,
		holders: 55,
		day: 0.12,
	},
	{
		symbol: "BIO",
		name: "Biotech Leaders",
		creator: "@noah",
		status: "live",
		aum: 6410,
		holders: 47,
		day: -0.9,
	},
];

const col = createColumnHelper<typeof features, Index>();

const columns = col.columns([
	col.display({
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				indeterminate={
					table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
				}
				onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(v) => row.toggleSelected(!!v)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	}),
	col.accessor("symbol", {
		id: "index",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Index" />
		),
		cell: ({ row }) => (
			<div>
				<div className="font-semibold">{row.original.symbol}</div>
				<div className="text-[11.5px] text-muted-foreground">
					{row.original.name}
				</div>
			</div>
		),
	}),
	col.accessor("creator", {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Creator" />
		),
		cell: ({ getValue }) => (
			<span className="text-muted-foreground">{getValue()}</span>
		),
	}),
	col.accessor("status", {
		header: "Status",
		filterFn: "arrIncludesSome",
		cell: ({ getValue }) => <span className="capitalize">{getValue()}</span>,
	}),
	col.accessor("aum", {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="AUM" numeric />
		),
		cell: ({ getValue }) => (
			<div className="text-right font-mono tabular-nums">
				${getValue().toLocaleString("en-US")}
			</div>
		),
	}),
	col.accessor("holders", {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Holders" numeric />
		),
		cell: ({ getValue }) => (
			<div className="text-right font-mono tabular-nums">{getValue()}</div>
		),
	}),
	col.accessor("day", {
		id: "24h",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="24h" numeric />
		),
		cell: ({ getValue }) => {
			const v = getValue();
			return (
				<div className="text-right">
					<Badge
						variant={v >= 0 ? "success" : "destructive"}
						className="font-mono"
					>
						{v >= 0 ? "+" : "−"}
						{Math.abs(v).toFixed(2)}%
					</Badge>
				</div>
			);
		},
	}),
	col.display({
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => (
			<div className="text-right">
				<DataTableRowActions>
					<DropdownMenuItem
						onClick={() => navigator.clipboard.writeText(row.original.symbol)}
					>
						Copy symbol
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>View index</DropdownMenuItem>
				</DataTableRowActions>
			</div>
		),
	}),
]);

export default function Demo() {
	return (
		<DataTable
			raised
			columns={columns}
			data={data}
			filterColumn="index"
			filterPlaceholder="Filter indexes…"
			facetedFilters={[
				{ column: "status", title: "Status" },
				{ column: "creator", title: "Creator" },
			]}
			pageSize={5}
		/>
	);
}
