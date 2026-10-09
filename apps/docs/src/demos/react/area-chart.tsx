import {
	Card,
	CardAction,
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@edmi-react/ui/select";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

// 91 days (Apr 1 - Jun 30, 2024) of sample visitors.
const data = Array.from({ length: 91 }, (_, i) => {
	const date = new Date(Date.UTC(2024, 3, 1 + i)).toISOString().slice(0, 10);
	const desktop = Math.round(
		220 + 110 * Math.sin(i / 3.1) + 70 * Math.sin(i / 7.3 + 1) + (i % 5) * 9,
	);
	const mobile = Math.round(
		170 + 90 * Math.sin(i / 2.7 + 2) + 60 * Math.cos(i / 6.1) + (i % 4) * 11,
	);
	return { date, desktop, mobile };
});

const config = {
	desktop: { label: "Desktop", color: "var(--chart-1)" },
	mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;

const ranges = [
	{ value: "90d", label: "Last 3 months", days: 90 },
	{ value: "30d", label: "Last 30 days", days: 30 },
	{ value: "7d", label: "Last 7 days", days: 7 },
];

export default function Demo() {
	const [range, setRange] = React.useState("90d");
	const days = ranges.find((r) => r.value === range)?.days ?? 90;
	const filtered = data.slice(-days);

	return (
		<Card className="w-full max-w-3xl gap-0 py-0">
			<CardHeader className="gap-1 border-b px-6 pt-5.5 pb-5.5">
				<CardTitle className="font-semibold text-base tracking-[-0.2px]">
					Area Chart - Interactive
				</CardTitle>
				<CardDescription className="text-[13.5px]">
					Showing total visitors for the last 3 months
				</CardDescription>
				<CardAction className="self-center">
					<Select
						value={range}
						onValueChange={(value) => value && setRange(value)}
						items={ranges}
					>
						<SelectTrigger className="w-40" aria-label="Select a range">
							<SelectValue />
						</SelectTrigger>
						<SelectContent alignItemWithTrigger={false}>
							{ranges.map((r) => (
								<SelectItem key={r.value} value={r.value}>
									{r.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</CardAction>
			</CardHeader>
			<CardContent className="items-center px-5 pt-2.5 pb-4">
				<ChartContainer config={config} className="aspect-auto h-64 w-full">
					<AreaChart data={filtered} margin={{ left: 12, right: 12 }}>
						<defs>
							<linearGradient
								id="fill-desktop-main"
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
							<linearGradient id="fill-mobile-main" x1="0" y1="0" x2="0" y2="1">
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
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) =>
								new Date(value).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									timeZone: "UTC",
								})
							}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									indicator="dot"
									labelFormatter={(value) =>
										new Date(value).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											timeZone: "UTC",
										})
									}
								/>
							}
						/>
						<ChartLegend content={<ChartLegendContent />} />
						<Area
							dataKey="desktop"
							type="natural"
							fill="url(#fill-desktop-main)"
							fillOpacity={1}
							stroke="var(--color-desktop)"
							strokeWidth={2}
						/>
						<Area
							dataKey="mobile"
							type="natural"
							fill="url(#fill-mobile-main)"
							fillOpacity={1}
							stroke="var(--color-mobile)"
							strokeWidth={2}
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
