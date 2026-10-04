import { LeaderboardPodium } from "@edmi-react/blocks/leaderboard-podium/leaderboard-podium";
import type { Elevation } from "@edmi-react/ui/elevation";

function Sample({ elevation }: { elevation: Elevation }) {
	return (
		<LeaderboardPodium
			elevation={elevation}
			entries={[
				{ rank: 1, name: "dewi", meta: "$49.2K · 412 holders" },
				{ rank: 2, name: "noah", meta: "$31.7K · 265 holders" },
				{ rank: 3, name: "sarah", meta: "$18.9K · 140 holders" },
			]}
		/>
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
