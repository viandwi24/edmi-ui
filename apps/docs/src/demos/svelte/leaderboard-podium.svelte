<script lang="ts">
	import { LeaderboardPodium, type PodiumEntry } from "@edmi-svelte/ui/leaderboard-podium";

	const entries: PodiumEntry[] = [
		{ rank: 1, name: "dewi", meta: "$49.2K · 412 holders" },
		{ rank: 2, name: "noah", meta: "$31.7K · 265 holders" },
		{ rank: 3, name: "sarah", meta: "$18.9K · 140 holders" },
	];
</script>

<LeaderboardPodium {entries} />
