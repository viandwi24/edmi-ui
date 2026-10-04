import {
	StatStrip,
	StatStripItem,
	StatTile,
} from "@edmi-react/blocks/stat-tile/stat-tile";

export default function Demo() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-wrap gap-4">
				<StatTile
					raised
					label="AUM"
					value="$49,182"
					delta="+37%"
					deltaLabel="vs last week"
				/>
				<StatTile
					raised
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
					raised
					label="Net flow"
					value="−$1,204"
					delta="−4.2%"
					deltaLabel="vs last week"
				/>
			</div>
			<StatStrip raised>
				<StatStripItem value="412" label="holders" />
				<StatStripItem value="$49.2K" label="AUM" />
				<StatStripItem value="63%" label="activity off-hours" />
				<StatStripItem value="14" label="indexes" />
			</StatStrip>
		</div>
	);
}
