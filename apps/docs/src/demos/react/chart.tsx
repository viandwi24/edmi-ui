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
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const data = [
	{ day: "Sep 1", mag4: 4.0, spyx: 2.0 },
	{ day: "Sep 7", mag4: 5.6, spyx: 2.6 },
	{ day: "Sep 13", mag4: 6.4, spyx: 3.4 },
	{ day: "Sep 19", mag4: 9.8, spyx: 5.1 },
	{ day: "Sep 21", mag4: 11.0, spyx: 6.4 },
	{ day: "Sep 25", mag4: 12.3, spyx: 7.2 },
	{ day: "Oct 1", mag4: 14.1, spyx: 8.0 },
];

const config = {
	mag4: { label: "MAG4", color: "var(--chart-1)" },
	spyx: { label: "SPYx", color: "var(--chart-2)" },
} satisfies ChartConfig;

export default function Demo() {
	return (
		<Card className="w-full max-w-lg">
			<CardHeader>
				<CardTitle>NAV vs benchmark</CardTitle>
				<CardDescription>Last 30 days</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={config} className="aspect-auto h-52 w-full">
					<AreaChart data={data} margin={{ left: 4, right: 4 }}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="day"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						/>
						<ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
						<ChartLegend content={<ChartLegendContent />} />
						<Area
							dataKey="spyx"
							type="monotone"
							stroke="var(--color-spyx)"
							strokeDasharray="5 4"
							fill="var(--color-spyx)"
							fillOpacity={0.12}
						/>
						<Area
							dataKey="mag4"
							type="monotone"
							stroke="var(--color-mag4)"
							fill="var(--color-mag4)"
							fillOpacity={0.2}
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
