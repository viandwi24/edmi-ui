import { createColumnHelper } from "@tanstack/react-table";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { DataTable } from "@/registry/edmi/blocks/data-table/data-table";
import { DataTableColumnHeader } from "@/registry/edmi/blocks/data-table/data-table-column-header";
import type { features } from "@/registry/edmi/blocks/data-table/data-table-features";
import { DataTableRowActions } from "@/registry/edmi/blocks/data-table/data-table-row-actions";
import { Badge } from "@/registry/edmi/ui/badge";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/registry/edmi/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/registry/edmi/ui/chart";
import { Checkbox } from "@/registry/edmi/ui/checkbox";
import { DropdownMenuItem } from "@/registry/edmi/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/registry/edmi/ui/table";
import { RaisedSection } from "./_raised";

type Row = {
	symbol: string;
	name: string;
	status: "live" | "paused";
	aum: number;
	day: number;
};
const rows: Row[] = [
	{
		symbol: "MAG4",
		status: "live",
		name: "Magnificent Four",
		aum: 49182,
		day: 0.53,
	},
	{
		symbol: "PREIPO",
		status: "live",
		name: "Pre-IPO Basket",
		aum: 31770,
		day: 4.1,
	},
	{ symbol: "AIDX", status: "paused", name: "AI Infra", aum: 18904, day: -1.2 },
	{
		symbol: "CHIPS",
		status: "live",
		name: "Semis Core",
		aum: 12330,
		day: 0.21,
	},
];

const col = createColumnHelper<typeof features, Row>();
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
		enableHiding: false,
		enableSorting: false,
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
	col.accessor("day", {
		id: "24h",
		header: "24h",
		cell: ({ getValue }) => (
			<Badge
				variant={getValue() >= 0 ? "success" : "destructive"}
				className="font-mono"
			>
				{getValue() >= 0 ? "+" : "−"}
				{Math.abs(getValue()).toFixed(2)}%
			</Badge>
		),
	}),
	col.display({
		id: "actions",
		enableHiding: false,
		cell: () => (
			<DataTableRowActions>
				<DropdownMenuItem>View index</DropdownMenuItem>
			</DataTableRowActions>
		),
	}),
]);

const area = [
	{ d: "Sep 1", a: 4, b: 2 },
	{ d: "Sep 7", a: 5.6, b: 2.6 },
	{ d: "Sep 13", a: 6.4, b: 3.4 },
	{ d: "Sep 19", a: 9.8, b: 5.1 },
	{ d: "Sep 25", a: 12.3, b: 7.2 },
	{ d: "Oct 1", a: 14.1, b: 8 },
];
const areaConfig = {
	a: { label: "MAG4" },
	b: { label: "SPYx" },
} satisfies ChartConfig;
const bars = ["M", "T", "W", "T", "F", "S", "S"].map((d, i) => ({
	d,
	joins: 50 + ((i * 37) % 60),
	exits: 30 + ((i * 23) % 35),
}));
const barConfig = {
	joins: { label: "Joins" },
	exits: { label: "Exits" },
} satisfies ChartConfig;

export default function DataPreview() {
	return (
		<div className="flex w-full max-w-[760px] flex-col gap-8">
			<Card className="py-0">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Token</TableHead>
							<TableHead numeric>Price</TableHead>
							<TableHead numeric>24h</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((r) => (
							<TableRow
								key={r.symbol}
								data-state={r.symbol === "AIDX" ? "selected" : undefined}
							>
								<TableCell className="font-medium">{r.symbol}</TableCell>
								<TableCell numeric>${r.aum.toLocaleString("en-US")}</TableCell>
								<TableCell numeric trend={r.day >= 0 ? "up" : "down"}>
									{r.day}%
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell>Total</TableCell>
							<TableCell numeric>$112,186</TableCell>
							<TableCell numeric trend="up">
								+0.53%
							</TableCell>
						</TableRow>
					</TableFooter>
					<TableCaption>Weights as of the last rebalance.</TableCaption>
				</Table>
			</Card>
			<DataTable
				columns={columns}
				data={rows}
				filterColumn="index"
				filterPlaceholder="Filter indexes…"
				facetedFilters={[{ column: "status", title: "Status" }]}
				pageSize={10}
			/>
			<div className="grid gap-5 sm:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>NAV vs benchmark</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartContainer
							config={areaConfig}
							className="aspect-auto h-44 w-full"
						>
							<AreaChart data={area}>
								<CartesianGrid vertical={false} />
								<XAxis dataKey="d" tickLine={false} axisLine={false} />
								<ChartTooltip
									content={<ChartTooltipContent indicator="dashed" />}
								/>
								<ChartLegend content={<ChartLegendContent />} />
								<Area
									dataKey="b"
									stroke="var(--color-b)"
									fill="var(--color-b)"
									fillOpacity={0.12}
									strokeDasharray="5 4"
								/>
								<Area
									dataKey="a"
									stroke="var(--color-a)"
									fill="var(--color-a)"
									fillOpacity={0.2}
								/>
							</AreaChart>
						</ChartContainer>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Joins vs exits</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartContainer
							config={barConfig}
							className="aspect-auto h-44 w-full"
						>
							<BarChart data={bars}>
								<CartesianGrid vertical={false} />
								<XAxis dataKey="d" tickLine={false} axisLine={false} />
								<ChartTooltip
									content={<ChartTooltipContent indicator="line" />}
								/>
								<ChartLegend content={<ChartLegendContent />} />
								<Bar dataKey="joins" fill="var(--color-joins)" radius={4} />
								<Bar dataKey="exits" fill="var(--color-exits)" radius={4} />
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
			<RaisedSection>
				<DataTable
					elevation="raised"
					columns={columns}
					data={rows}
					filterColumn="index"
					filterPlaceholder="Filter indexes…"
					pageSize={3}
				/>
			</RaisedSection>
		</div>
	);
}
