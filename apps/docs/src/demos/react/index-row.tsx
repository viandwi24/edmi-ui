import {
	IndexRow,
	type IndexRowData,
	IndexRowHeader,
} from "@edmi-react/blocks/index-row/index-row";
import { Card } from "@edmi-react/ui/card";
import { Table, TableBody, TableHeader } from "@edmi-react/ui/table";

const avatars = [{ label: "A" }, { label: "N" }, { label: "T" }];

const rows: IndexRowData[] = [
	{
		name: "Mag Four Tilt",
		symbol: "MAGT",
		avatars,
		tags: ["Pre-IPO", "Clone"],
		owner: "GbFK…ZUWS",
		price: "$1.00",
		change: "+1.12%",
		value: "$120.1K",
		count: 2,
		spark: [4, 5, 4.6, 6, 6.4, 6.1, 7.2, 8, 8.4, 9.1],
	},
	{
		name: "Defense & Space",
		symbol: "DFSP",
		avatars,
		tags: ["Pre-IPO"],
		owner: "7Ge1…kXSq",
		price: "$0.9791",
		change: "−2.09%",
		value: "$29K",
		count: 1,
		spark: [9, 8.6, 8.9, 7.8, 7.5, 7.9, 6.8, 6.4, 6.6, 5.9],
	},
];

export default function Demo() {
	return (
		<Card className="w-full gap-0 py-0">
			<Table>
				<TableHeader>
					<IndexRowHeader
						labels={{
							name: "Index",
							owner: "Creator",
							change: "7d",
							value: "AUM",
							count: "Holders",
							trend: "30d",
						}}
					/>
				</TableHeader>
				<TableBody>
					{rows.map((r) => (
						<IndexRow key={r.symbol} index={r} />
					))}
				</TableBody>
			</Table>
		</Card>
	);
}
