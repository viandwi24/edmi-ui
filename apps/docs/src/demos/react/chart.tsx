import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
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
		<Card className="w-full max-w-lg gap-0 py-0">
			<CardHeader className="gap-1 px-6 pt-5.5 pb-0">
				<CardTitle className="font-semibold text-base tracking-[-0.2px]">
					NAV vs benchmark
				</CardTitle>
				<CardDescription className="text-[13.5px]">
					Last 30 days
				</CardDescription>
			</CardHeader>
			<CardContent className="items-center px-5 pt-2.5 pb-0">
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
							strokeWidth={2}
							fill="var(--color-spyx)"
							fillOpacity={0.12}
						/>
						<Area
							dataKey="mag4"
							type="monotone"
							stroke="var(--color-mag4)"
							strokeWidth={2}
							fill="var(--color-mag4)"
							fillOpacity={0.2}
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-stretch gap-1 px-6 pt-3.5 pb-5.5 text-[13.5px]">
				<b className="font-medium">MAG4 outperformed SPYx by 6.1 pts</b>
				<span className="text-muted-foreground">Sep 1 to Oct 1</span>
			</CardFooter>
		</Card>
	);
}
