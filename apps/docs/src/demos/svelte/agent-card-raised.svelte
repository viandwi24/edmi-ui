<script lang="ts">
	import { AgentCard } from "@edmi-svelte/ui/agent-card";

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
<AgentCard
	elevation={l.value}
	class="w-[380px] max-w-full"
	name="XSD"
	tag="AI"
	autopilot
	address="dG6r…4mSr"
	stats={[
		{ label: "Indexes", value: "3" },
		{ label: "AUM", value: "$12.4K" },
		{ label: "Best 7d", value: "+4.1%" },
	]}
/>
		</div>
	{/each}
</div>
