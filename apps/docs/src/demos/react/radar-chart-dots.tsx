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
import {
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart,
} from "recharts";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

const data = [
	{ month: "January", desktop: 186 },
	{ month: "February", desktop: 305 },
	{ month: "March", desktop: 237 },
	{ month: "April", desktop: 73 },
	{ month: "May", desktop: 209 },
	{ month: "June", desktop: 214 },
];

const config = {
	desktop: { label: "Desktop", color: "var(--chart-1)" },
} satisfies ChartConfig;

export default function Demo() {
	return (
		<Card className="w-full max-w-sm gap-0 py-0">
			<CardHeader className="gap-1 px-6 pt-5.5 pb-0">
				<CardTitle className="font-semibold text-base tracking-[-0.2px]">
					Radar Chart - Dots
				</CardTitle>
				<CardDescription className="text-[13.5px]">
					Showing total visitors for the last 6 months
				</CardDescription>
			</CardHeader>
			<CardContent className="items-center px-5 pt-2.5 pb-0">
				<ChartContainer
					config={config}
					className="mx-auto aspect-auto h-[262px] w-full max-w-64 [&_.recharts-surface]:overflow-visible"
				>
					<RadarChart data={data} outerRadius={88}>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<PolarAngleAxis
							dataKey="month"
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<PolarRadiusAxis domain={[0, 400]} tick={false} axisLine={false} />
						<PolarGrid />
						<Radar
							dataKey="desktop"
							fill="var(--color-desktop)"
							fillOpacity={0.18}
							stroke="var(--color-desktop)"
							strokeWidth={2}
							dot={{
								r: 4,
								fill: "var(--color-desktop)",
								fillOpacity: 1,
								stroke: "var(--card)",
								strokeWidth: 2,
							}}
						/>
					</RadarChart>
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
				<span className="text-muted-foreground">January - June 2024</span>
			</CardFooter>
		</Card>
	);
}
