import { WatchlistItem } from "@edmi-react/blocks/watchlist-item/watchlist-item";
import type { Elevation } from "@edmi-react/ui/elevation";

function Sample({ elevation }: { elevation: Elevation }) {
	return (
		<div className="flex w-60 flex-col gap-1.5">
			<WatchlistItem
				elevation={elevation}
				href="#mag4"
				symbol="MAG4"
				price="1.0000"
				change="+2.38%"
				color="var(--chart-1)"
				active
			/>
			<WatchlistItem
				elevation={elevation}
				href="#aifr"
				symbol="AIFR"
				price="1.0104"
				change="+0.84%"
				color="var(--chart-4)"
			/>
			<WatchlistItem
				elevation={elevation}
				href="#atls"
				symbol="ATLS"
				price="0.9893"
				change="−0.64%"
				color="var(--chart-3)"
			/>
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
