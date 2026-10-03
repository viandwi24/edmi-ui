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
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@edmi-react/ui/chart";
import { Cell, Pie, PieChart } from "recharts";

const data = [
	{ token: "nvdax", weight: 32 },
	{ token: "msftx", weight: 28 },
	{ token: "aaplx", weight: 24 },
	{ token: "anthrp", weight: 16 },
];

const config = {
	weight: { label: "Weight" },
	nvdax: { label: "NVDAx" },
	msftx: { label: "MSFTx" },
	aaplx: { label: "AAPLx" },
	anthrp: { label: "ANTHRP-pre" },
} satisfies ChartConfig;

export default function Demo() {
	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Allocation</CardTitle>
				<CardDescription>MAG4 weights</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={config} className="mx-auto aspect-square h-52">
					<PieChart>
						<ChartTooltip
							content={
								<ChartTooltipContent
									nameKey="token"
									hideLabel
									indicator="dashed"
								/>
							}
						/>
						<Pie
							data={data}
							dataKey="weight"
							nameKey="token"
							innerRadius={46}
							stroke="none"
						>
							{data.map((d) => (
								<Cell key={d.token} fill={`var(--color-${d.token})`} />
							))}
						</Pie>
						<ChartLegend content={<ChartLegendContent nameKey="token" />} />
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
