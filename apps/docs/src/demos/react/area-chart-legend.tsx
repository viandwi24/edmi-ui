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
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
];

const config = {
	desktop: { label: "Desktop", color: "var(--chart-1)" },
	mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;

export default function Demo() {
	return (
		<Card className="w-full max-w-sm gap-0 py-0">
			<CardHeader className="gap-1 px-6 pt-5.5 pb-0">
				<CardTitle className="font-semibold text-base tracking-[-0.2px]">
					Area Chart - Legend
				</CardTitle>
				<CardDescription className="text-[13.5px]">
					Showing total visitors for the last 6 months
				</CardDescription>
			</CardHeader>
			<CardContent className="items-center px-5 pt-2.5 pb-4">
				<ChartContainer config={config} className="aspect-auto h-44 w-full">
					<AreaChart
						accessibilityLayer
						data={data}
						margin={{ left: 12, right: 12 }}
					>
						<defs>
							<linearGradient
								id="fill-desktop-legend"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="0"
									stopColor="var(--color-desktop)"
									stopOpacity={0.26}
								/>
								<stop
									offset="1"
									stopColor="var(--color-desktop)"
									stopOpacity={0.03}
								/>
							</linearGradient>
							<linearGradient
								id="fill-mobile-legend"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="0"
									stopColor="var(--color-mobile)"
									stopOpacity={0.26}
								/>
								<stop
									offset="1"
									stopColor="var(--color-mobile)"
									stopOpacity={0.03}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
						<ChartLegend content={<ChartLegendContent />} />
						<Area
							dataKey="desktop"
							type="natural"
							fill="url(#fill-desktop-legend)"
							fillOpacity={1}
							stroke="var(--color-desktop)"
							strokeWidth={2}
							stackId="a"
						/>
						<Area
							dataKey="mobile"
							type="natural"
							fill="url(#fill-mobile-legend)"
							fillOpacity={1}
							stroke="var(--color-mobile)"
							strokeWidth={2}
							stackId="a"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
