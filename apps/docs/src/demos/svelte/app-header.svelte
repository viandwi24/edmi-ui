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
</script>

<AppHeader
	{items}
	active="#leaderboard"
	connectLabel={connected ? "dG6r…4mSr" : "Connect"}
	onConnect={() => (connected = !connected)}
/>
