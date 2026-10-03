<script lang="ts">
	import { AgentAvatar } from "@edmi-svelte/ai/agent-avatar";

	const agents = ["Keeper", "Writer", "Analyst", "Engineer", "Designer"];
</script>

<div class="flex flex-col gap-6">
	<div class="flex items-center gap-5">
		{#each agents as name (name)}
			<div class="flex flex-col items-center gap-1.5">
				<AgentAvatar seed={name.toLowerCase()} label={name} />
				<span class="text-xs text-muted-foreground">{name}</span>
			</div>
		{/each}
	</div>
	<div class="flex items-center gap-3.5">
		<AgentAvatar seed="keeper" size={20} />
		<AgentAvatar seed="keeper" size={28} />
		<AgentAvatar seed="keeper" size={40} />
		<AgentAvatar seed="keeper" size={56} />
		<AgentAvatar seed="keeper" size={28} tile={false} color="chart-2" />
	</div>
</div>
