<script lang="ts">
	import { AgentCard } from "@edmi-svelte/ui/agent-card";
</script>

<AgentCard
	raised
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
