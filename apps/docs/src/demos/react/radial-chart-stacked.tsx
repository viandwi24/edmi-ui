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
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

const data = [{ month: "january", desktop: 1260, mobile: 570 }];

const config = {
	desktop: { label: "Desktop", color: "var(--chart-1)" },
	mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;

const total = data[0].desktop + data[0].mobile;

export default function Demo() {
	return (
		<Card className="w-full max-w-sm gap-0 py-0">
			<CardHeader className="items-center gap-1 px-6 pt-5.5 pb-0 text-center">
				<CardTitle className="font-semibold text-base tracking-[-0.2px]">
					Radial Chart - Stacked
				</CardTitle>
				<CardDescription className="text-[13.5px]">
					January - June 2024
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 items-center px-5 pt-2.5 pb-0">
				<ChartContainer
					config={config}
					className="mx-auto aspect-[2/1] max-h-60 w-full"
				>
					<RadialBarChart
						data={data}
						startAngle={180}
						endAngle={0}
						cy="85%"
						innerRadius={89}
						outerRadius={111}
					>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) - 16}
													className="fill-foreground font-semibold text-3xl tracking-[-1px]"
												>
													{total.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 2}
													className="fill-muted-foreground text-xs"
												>
													Visitors
												</tspan>
											</text>
										);
									}
								}}
							/>
						</PolarRadiusAxis>
						<RadialBar
							dataKey="desktop"
							stackId="a"
							cornerRadius={0}
							fill="var(--color-desktop)"
							stroke="var(--card)"
							strokeWidth={2}
						/>
						<RadialBar
							dataKey="mobile"
							stackId="a"
							cornerRadius={0}
							fill="var(--color-mobile)"
							stroke="var(--card)"
							strokeWidth={2}
						/>
						<ChartLegend
							content={<ChartLegendContent />}
							verticalAlign="bottom"
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
