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
	ChartTooltip,
	ChartTooltipContent,
} from "@edmi-react/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

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
} satisfies ChartConfig;

export default function Demo() {
	return (
		<Card className="w-full max-w-sm gap-0 py-0">
			<CardHeader className="gap-1 px-6 pt-5.5 pb-0">
				<CardTitle className="font-semibold text-base tracking-[-0.2px]">
					Area Chart - Axes
				</CardTitle>
				<CardDescription className="text-[13.5px]">
					Showing total visitors for the last 6 months
				</CardDescription>
			</CardHeader>
			<CardContent className="items-center px-5 pt-2.5 pb-0">
				<ChartContainer config={config} className="aspect-auto h-44 w-full">
					<AreaChart
						accessibilityLayer
						data={data}
						margin={{ left: 4, right: 12 }}
					>
						<defs>
							<linearGradient
								id="fill-desktop-axes"
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
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							width={40}
							domain={[0, 400]}
							ticks={[0, 133, 266, 400]}
						/>
						<ChartTooltip content={<ChartTooltipContent indicator="line" />} />
						<Area
							dataKey="desktop"
							type="natural"
							fill="url(#fill-desktop-axes)"
							fillOpacity={1}
							stroke="var(--color-desktop)"
							strokeWidth={2}
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-stretch gap-1 px-6 pt-3.5 pb-5.5 text-[13.5px]">
				<b className="flex items-center gap-2 font-medium">
					Trending up by 5.2% this month
					<IconPlaceholder
						lucide="TrendingUpIcon"
						tabler="IconTrendingUp"
						hugeicons="AnalyticsUpIcon"
						phosphor="TrendUpIcon"
						remixicon="RiLineChartLine"
						className="size-4"
					/>
				</b>
				<span className="text-muted-foreground">January - June 2024</span>
			</CardFooter>
		</Card>
	);
}
