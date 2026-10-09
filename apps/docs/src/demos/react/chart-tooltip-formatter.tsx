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
	ChartTooltip,
	ChartTooltipContent,
} from "@edmi-react/ui/chart";
import type { CSSProperties } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const data = [
	{ date: "2024-07-15", running: 450, swimming: 300 },
	{ date: "2024-07-16", running: 380, swimming: 420 },
	{ date: "2024-07-17", running: 520, swimming: 120 },
	{ date: "2024-07-18", running: 140, swimming: 550 },
	{ date: "2024-07-19", running: 600, swimming: 350 },
	{ date: "2024-07-20", running: 480, swimming: 400 },
];

const config = {
	running: { label: "Running", color: "var(--chart-1)" },
	swimming: { label: "Swimming", color: "var(--chart-2)" },
} satisfies ChartConfig;

export default function Demo() {
	return (
		<Card className="w-full max-w-sm gap-0 py-0">
			<CardHeader className="gap-1 px-6 pt-5.5 pb-0">
				<CardTitle className="font-semibold text-base tracking-[-0.2px]">
					Tooltip - Formatter
				</CardTitle>
				<CardDescription className="text-[13.5px]">
					Tooltip with custom formatter.
				</CardDescription>
			</CardHeader>
			<CardContent className="items-center px-5 pt-2.5 pb-4">
				<ChartContainer config={config} className="aspect-auto h-44 w-full">
					<BarChart accessibilityLayer data={data}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) =>
								new Date(value).toLocaleDateString("en-US", {
									weekday: "short",
									timeZone: "UTC",
								})
							}
						/>
						<Bar
							dataKey="running"
							stackId="a"
							fill="var(--color-running)"
							stroke="var(--card)"
							strokeWidth={2}
							maxBarSize={24}
						/>
						<Bar
							dataKey="swimming"
							stackId="a"
							fill="var(--color-swimming)"
							stroke="var(--card)"
							strokeWidth={2}
							radius={[4, 4, 0, 0]}
							maxBarSize={24}
						/>
						<ChartTooltip
							defaultIndex={1}
							content={
								<ChartTooltipContent
									labelFormatter={(value) =>
										new Date(value).toLocaleDateString("en-US", {
											weekday: "short",
											timeZone: "UTC",
										})
									}
									formatter={(value, name, item) => (
										<>
											<div
												className="size-2 shrink-0 rounded-[2px] bg-(--color-bg)"
												style={{ "--color-bg": item.color } as CSSProperties}
											/>
											<span className="flex-1 text-muted-foreground">
												{config[name as keyof typeof config]?.label ?? name}
											</span>
											<span className="ml-3 flex items-baseline gap-0.5 font-semibold text-foreground tabular-nums">
												{value}
												<span className="font-normal text-muted-foreground">
													kcal
												</span>
											</span>
										</>
									)}
								/>
							}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
