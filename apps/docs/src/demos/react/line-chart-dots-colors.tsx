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
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

const data = [
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const config = {
	visitors: { label: "Visitors", color: "var(--chart-1)" },
	chrome: { label: "Chrome", color: "var(--chart-1)" },
	safari: { label: "Safari", color: "var(--chart-2)" },
	firefox: { label: "Firefox", color: "var(--chart-3)" },
	edge: { label: "Edge", color: "var(--chart-4)" },
	other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig;

export default function Demo() {
	return (
		<Card className="w-full max-w-sm gap-0 py-0">
			<CardHeader className="gap-1 px-6 pt-5.5 pb-0">
				<CardTitle className="font-semibold text-base tracking-[-0.2px]">
					Line Chart - Dots Colors
				</CardTitle>
				<CardDescription className="text-[13.5px]">
					January - June 2024
				</CardDescription>
			</CardHeader>
			<CardContent className="items-center px-5 pt-2.5 pb-0">
				<ChartContainer config={config} className="aspect-auto h-44 w-full">
					<LineChart data={data} margin={{ left: 24, right: 24 }}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="browser"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) =>
								config[value as keyof typeof config]?.label
							}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent nameKey="visitors" hideLabel />}
						/>
						<Line
							dataKey="visitors"
							type="linear"
							stroke="var(--color-visitors)"
							strokeWidth={2}
							dot={({ cx, cy, payload, index }) => (
								<circle
									key={index}
									cx={cx}
									cy={cy}
									r={4}
									fill={payload.fill}
									stroke="var(--card)"
									strokeWidth={2}
								/>
							)}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-stretch gap-1 px-6 pt-3.5 pb-5.5 text-[13.5px]">
				<b className="flex items-center gap-1.5 font-medium">
					Trending up by 5.2% this month
					<IconPlaceholder
						lucide="TrendingUpIcon"
						tabler="IconTrendingUp"
						hugeicons="ChartUpIcon"
						phosphor="TrendUpIcon"
						remixicon="RiArrowUpLine"
						className="size-4"
					/>
				</b>
				<span className="text-muted-foreground">
					Showing total visitors for the last 6 months
				</span>
			</CardFooter>
		</Card>
	);
}
