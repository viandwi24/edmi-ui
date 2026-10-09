import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@edmi-react/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartStatWell,
	ChartTooltip,
	ChartTooltipContent,
} from "@edmi-react/ui/chart";
import { useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const desktop = [
	223, 243, 240, 188, 168, 232, 245, 275, 233, 205, 197, 257, 283, 292, 225,
	151, 179, 227, 259, 230, 215, 159, 189, 219, 226, 189, 161, 155, 198, 190,
	185, 174, 142, 145, 157, 180, 155, 145, 145, 172, 182, 169, 204, 167, 138,
	183, 213, 205, 203, 162, 152, 227, 263, 260, 216, 157, 199, 255, 269, 262,
	217, 143, 221, 278, 256, 241, 191, 185, 216, 229, 227, 229, 164, 190, 204,
	219, 218, 195, 157, 187, 178, 200, 166, 182, 143, 169, 192, 184, 159, 142,
	154,
];

const mobile = [
	168, 206, 170, 122, 151, 195, 160, 179, 197, 169, 126, 182, 229, 203, 142,
	138, 168, 153, 167, 193, 178, 107, 141, 193, 170, 121, 140, 157, 141, 126,
	166, 159, 100, 113, 158, 149, 102, 127, 152, 131, 120, 153, 178, 116, 105,
	171, 171, 130, 154, 162, 124, 143, 201, 212, 146, 112, 177, 198, 167, 183,
	192, 123, 139, 206, 211, 163, 128, 167, 180, 147, 159, 198, 139, 122, 161,
	192, 154, 128, 148, 168, 121, 141, 162, 153, 96, 138, 178, 139, 106, 137, 152,
];

// Apr 1 to Jun 30
const data = desktop.map((d, i) => ({
	date: new Date(Date.UTC(2024, 3, 1 + i)).toISOString(),
	desktop: d,
	mobile: mobile[i],
}));

const config = {
	views: { label: "Page Views" },
	desktop: { label: "Desktop", color: "var(--chart-1)" },
	mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;

const formatDate = (value: string | number) =>
	new Date(value).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		timeZone: "UTC",
	});

export default function Demo() {
	const [active, setActive] = useState<"desktop" | "mobile">("desktop");
	const total = useMemo(
		() => ({
			desktop: data.reduce((sum, d) => sum + d.desktop, 0),
			mobile: data.reduce((sum, d) => sum + d.mobile, 0),
		}),
		[],
	);

	return (
		<Card className="w-full gap-0 py-0">
			<div className="flex items-stretch justify-between border-border border-b">
				<div className="flex flex-col justify-center gap-1 px-6 pt-5.5 pb-4.5">
					<CardTitle className="font-semibold text-base tracking-[-0.2px]">
						Line Chart - Interactive
					</CardTitle>
					<CardDescription className="text-[13.5px]">
						Showing total visitors for the last 3 months
					</CardDescription>
				</div>
				<div className="flex">
					{(["desktop", "mobile"] as const).map((key) => (
						<ChartStatWell
							key={key}
							active={active === key}
							onClick={() => setActive(key)}
						>
							{config[key].label}
							<b>{total[key].toLocaleString()}</b>
						</ChartStatWell>
					))}
				</div>
			</div>
			<CardContent className="items-center px-5 pt-5 pb-5">
				<ChartContainer config={config} className="aspect-auto h-64 w-full">
					<LineChart data={data} margin={{ left: 12, right: 12 }}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={formatDate}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									className="w-40"
									nameKey="views"
									labelFormatter={(value) => formatDate(String(value))}
								/>
							}
						/>
						<Line
							dataKey={active}
							type="monotone"
							stroke={`var(--color-${active})`}
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
