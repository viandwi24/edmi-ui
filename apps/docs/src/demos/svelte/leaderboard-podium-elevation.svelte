<script lang="ts">
	import { LeaderboardPodium, type PodiumEntry } from "@edmi-svelte/ui/leaderboard-podium";

	const entries: PodiumEntry[] = [
		{ rank: 1, name: "dewi", meta: "$49.2K · 412 holders" },
		{ rank: 2, name: "noah", meta: "$31.7K · 265 holders" },
		{ rank: 3, name: "sarah", meta: "$18.9K · 140 holders" },
	];

	const levels = [
		{ value: "flat", label: "Flat (0)" } as const,
		{ value: "raised", label: "Raised (+1)" } as const,
		{ value: "floating", label: "Floating (+2)" } as const,
	];
</script>

<div class="flex flex-col gap-6">
	{#each levels as l (l.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{l.label}</p>
<LeaderboardPodium elevation={l.value} {entries} />
		</div>
	{/each}
</div>
