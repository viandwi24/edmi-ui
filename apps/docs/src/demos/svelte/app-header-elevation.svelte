<script lang="ts">
	import { AppHeader } from "@edmi-svelte/ui/app-header";

	const items = [
		{ label: "Explore", href: "#explore" },
		{ label: "Feed", href: "#feed" },
		{ label: "Leaderboard", href: "#leaderboard" },
		{ label: "AI", href: "#ai" },
		{ label: "Create", href: "#create" },
	];
	let connected = $state(false);

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
<AppHeader
	elevation={l.value}
	{items}
	active="#leaderboard"
	connectLabel={connected ? "dG6r…4mSr" : "Connect"}
	onConnect={() => (connected = !connected)}
/>
		</div>
	{/each}
</div>
