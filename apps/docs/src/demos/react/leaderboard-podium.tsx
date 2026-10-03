import { LeaderboardPodium } from "@edmi-react/blocks/leaderboard-podium/leaderboard-podium";

export default function Demo() {
	return (
		<LeaderboardPodium
			entries={[
				{ rank: 1, name: "dewi", meta: "$49.2K AUM · 412 holders" },
				{ rank: 2, name: "noah", meta: "$31.7K AUM · 265 holders" },
				{ rank: 3, name: "sarah", meta: "$18.9K AUM · 140 holders" },
			]}
		/>
	);
}
