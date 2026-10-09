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
import { Pie, PieChart } from "recharts";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

const data = [
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const config = {
	visitors: { label: "Visitors" },
	chrome: { label: "Chrome", color: "var(--chart-1)" },
	safari: { label: "Safari", color: "var(--chart-2)" },
	firefox: { label: "Firefox", color: "var(--chart-3)" },
	edge: { label: "Edge", color: "var(--chart-4)" },
	other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig;

const RAD = Math.PI / 180;
const pt = (cx: number, cy: number, r: number, mid: number) => ({
	x: cx + r * Math.cos(-mid * RAD),
	y: cy + r * Math.sin(-mid * RAD),
});

export default function Demo() {
	return (
		<Card className="w-full max-w-sm gap-0 py-0">
			<CardHeader className="items-center justify-items-center gap-1 px-6 pt-5.5 pb-0 text-center">
				<CardTitle className="font-semibold text-base tracking-[-0.2px]">
					Pie Chart - Label
				</CardTitle>
				<CardDescription className="text-[13.5px]">
					January - June 2024
				</CardDescription>
			</CardHeader>
			<CardContent className="items-center px-5 pt-2.5 pb-0">
				<ChartContainer
					config={config}
					className="aspect-auto h-[236px] w-full max-w-64 [&_.recharts-surface]:overflow-visible"
				>
					<PieChart>
						<ChartTooltip
							content={<ChartTooltipContent nameKey="browser" hideLabel />}
						/>
						<Pie
							data={data}
							dataKey="visitors"
							nameKey="browser"
							outerRadius={90}
							stroke="var(--card)"
							strokeWidth={2}
							labelLine={false}
							label={(p) => {
								const a = pt(p.cx, p.cy, p.outerRadius, p.midAngle ?? 0);
								const b = pt(p.cx, p.cy, p.outerRadius + 14, p.midAngle ?? 0);
								const x = b.x + (b.x > p.cx ? 8 : -8);
								return (
									<g>
										<path
											d={`M${a.x},${a.y}L${b.x},${b.y}`}
											stroke={p.fill}
											strokeWidth={1}
											fill="none"
										/>
										<text
											x={x}
											y={b.y + 4}
											textAnchor={b.x > p.cx ? "start" : "end"}
											className="fill-foreground text-xs tabular-nums"
										>
											{p.value}
										</text>
									</g>
								);
							}}
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-center gap-1 px-6 pt-3.5 pb-5.5 text-center text-[13.5px]">
				<div className="flex items-center gap-1.5 font-medium">
					Trending up by 5.2% this month
					<IconPlaceholder
						lucide="TrendingUpIcon"
						tabler="IconTrendingUp"
						hugeicons="ChartUpIcon"
						phosphor="TrendUpIcon"
						remixicon="RiArrowUpLine"
						className="size-4"
					/>
				</div>
				<div className="text-muted-foreground">
					Showing total visitors for the last 6 months
				</div>
			</CardFooter>
		</Card>
	);
}
