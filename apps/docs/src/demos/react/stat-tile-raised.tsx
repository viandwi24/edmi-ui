import {
	StatStrip,
	StatStripItem,
	StatTile,
} from "@edmi-react/blocks/stat-tile/stat-tile";
import type { Elevation } from "@edmi-react/ui/elevation";

function Sample({ elevation }: { elevation: Elevation }) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-wrap gap-4">
				<StatTile
					elevation={elevation}
					label="AUM"
					value="$49,182"
					delta="+37%"
					deltaLabel="vs last week"
				/>
				<StatTile
					elevation={elevation}
					label="Daily active holders"
					value="10,291"
					meter={{
						value: 23 / 30,
						zones: [
							{ upTo: 14 / 30, color: "var(--chart-1)" },
							{ upTo: 24 / 30, color: "var(--chart-3)" },
							{ upTo: 1, color: "var(--chart-5)" },
						],
					}}
					delta="+8%"
					deltaLabel="vs last week"
				/>
				<StatTile
					elevation={elevation}
					label="Net flow"
					value="−$1,204"
					delta="−4.2%"
					deltaLabel="vs last week"
				/>
			</div>
			<StatStrip elevation={elevation}>
				<StatStripItem value="412" label="holders" />
				<StatStripItem value="$49.2K" label="AUM" />
				<StatStripItem value="63%" label="activity off-hours" />
				<StatStripItem value="14" label="indexes" />
			</StatStrip>
		</div>
	);
}

const levels = [
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex flex-col gap-6">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<Sample elevation={value} />
				</div>
			))}
		</div>
	);
}
