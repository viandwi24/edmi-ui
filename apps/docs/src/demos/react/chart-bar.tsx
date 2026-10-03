import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@edmi-react/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@edmi-react/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const data = [
	{ day: "M", joins: 62, exits: 37 },
	{ day: "T", joins: 80, exits: 48 },
	{ day: "W", joins: 54, exits: 32 },
	{ day: "T", joins: 96, exits: 58 },
	{ day: "F", joins: 70, exits: 42 },
	{ day: "S", joins: 110, exits: 66 },
	{ day: "S", joins: 88, exits: 53 },
];

// No colors given: series fall back to --chart-1, --chart-2 by order (✦).
const config = {
	joins: { label: "Joins" },
	exits: { label: "Exits" },
} satisfies ChartConfig;

export default function Demo() {
	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Joins vs exits</CardTitle>
				<CardDescription>This week</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={config} className="aspect-auto h-48 w-full">
					<BarChart data={data}>
						<CartesianGrid vertical={false} />
						<XAxis dataKey="day" tickLine={false} axisLine={false} />
						<ChartTooltip content={<ChartTooltipContent indicator="line" />} />
						<ChartLegend content={<ChartLegendContent />} />
						<Bar dataKey="joins" fill="var(--color-joins)" radius={4} />
						<Bar dataKey="exits" fill="var(--color-exits)" radius={4} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
