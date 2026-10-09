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
import { RadialBar, RadialBarChart } from "recharts";

const data = [
	{ browser: "other", visitors: 90, fill: "var(--color-other)" },
	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
];
const config = {
	visitors: { label: "Visitors" },
	chrome: { label: "Chrome", color: "var(--chart-1)" },
	safari: { label: "Safari", color: "var(--chart-2)" },
	firefox: { label: "Firefox", color: "var(--chart-3)" },
	edge: { label: "Edge", color: "var(--chart-4)" },
	other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig;

export default function Demo() {
	return (
		<Card className="w-full max-w-sm gap-0 py-0">
			<CardHeader className="items-center gap-1 px-6 pt-5.5 pb-0 text-center">
				<CardTitle className="font-semibold text-base tracking-[-0.2px]">
					Radial Chart
				</CardTitle>
				<CardDescription className="text-[13.5px]">
					January - June 2024
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 items-center px-5 pt-2.5 pb-0">
				<ChartContainer
					config={config}
					className="mx-auto aspect-square max-h-60 w-full"
				>
					<RadialBarChart
						data={data}
						startAngle={90}
						endAngle={-180}
						innerRadius={29}
						outerRadius={115}
					>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel nameKey="browser" />}
						/>
						<RadialBar
							dataKey="visitors"
							background
							cornerRadius={7}
							barSize={14}
						/>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-center gap-1 px-6 pt-3.5 pb-5.5 text-center text-[13.5px]">
				<b className="inline-flex items-center gap-2 font-medium">
					Trending up by 5.2% this month
					<svg
						viewBox="0 0 24 24"
						className="size-3.5"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<path d="m22 7-8.5 8.5-5-5L2 17" />
						<path d="M16 7h6v6" />
					</svg>
				</b>
				<span className="text-muted-foreground">
					Showing total visitors for the last 6 months
				</span>
			</CardFooter>
		</Card>
	);
}
