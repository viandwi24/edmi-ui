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
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

const data = [
	{ browser: "chrome", visitors: 275 },
	{ browser: "safari", visitors: 200 },
	{ browser: "firefox", visitors: 187 },
	{ browser: "edge", visitors: 173 },
	{ browser: "other", visitors: 90 },
];

const config = {
	visitors: { label: "Visitors", color: "var(--chart-1)" },
	chrome: { label: "Chrome" },
	safari: { label: "Safari" },
	firefox: { label: "Firefox" },
	edge: { label: "Edge" },
	other: { label: "Other" },
} satisfies ChartConfig;

export default function Demo() {
	return (
		<Card className="w-full max-w-sm gap-0 py-0">
			<CardHeader className="gap-1 px-6 pt-5.5 pb-0">
				<CardTitle className="font-semibold text-base tracking-[-0.2px]">
					Bar Chart - Custom Label
				</CardTitle>
				<CardDescription className="text-[13.5px]">
					January - June 2024
				</CardDescription>
			</CardHeader>
			<CardContent className="items-center px-5 pt-2.5 pb-0">
				<ChartContainer config={config} className="aspect-auto h-52 w-full">
					<BarChart data={data} layout="vertical" margin={{ right: 28 }}>
						<YAxis
							dataKey="browser"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							width={56}
							tickFormatter={(value) =>
								config[value as keyof typeof config]?.label ?? value
							}
						/>
						<XAxis dataKey="visitors" type="number" hide />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar
							dataKey="visitors"
							fill="var(--color-visitors)"
							radius={[0, 4, 4, 0]}
							maxBarSize={24}
						>
							<LabelList
								dataKey="visitors"
								position="right"
								offset={8}
								className="fill-foreground"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-stretch gap-1 px-6 pt-3.5 pb-5.5 text-[13.5px]">
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
