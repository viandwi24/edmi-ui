<script lang="ts">
	import { AgentAvatar } from "@edmi-svelte/ai/agent-avatar";
	import {
		Queue,
		QueueItem,
		QueueItemAvatar,
		QueueItemContent,
		QueueItemStatus,
		QueueList,
		QueueSection,
		QueueSectionContent,
		QueueSectionLabel,
		QueueSectionTrigger,
	} from "@edmi-svelte/ai/queue";
	import { Spinner } from "@edmi-svelte/ui/spinner";

	const tasks = [
		{ id: "1", agent: "keeper", title: "Rebalance MAG4 weights", age: "2m", running: true },
		{ id: "2", agent: "scout", title: "Summarize Q3 filings", age: "14m", running: false },
		{ id: "3", agent: "quote", title: "Compare fees with SPYx", age: "1h", running: false },
	];
</script>

<Queue variant="flat" class="w-full max-w-md">
	<QueueSection>
		<QueueSectionTrigger class="font-normal text-muted-foreground">
			<QueueSectionLabel label="Tasks" chevron={false} />
		</QueueSectionTrigger>
		<QueueSectionContent>
			<QueueList>
				{#each tasks as task (task.id)}
					<QueueItem>
						<div class="flex items-center gap-2">
							<QueueItemAvatar>
								<AgentAvatar seed={task.agent} size={22} tile={false} />
							</QueueItemAvatar>
							<QueueItemContent>{task.title}</QueueItemContent>
							<QueueItemStatus>
								<span class="font-mono">{task.age}</span>
								{#if task.running}
									<Spinner class="size-3.5" />
								{:else}
									<span class="size-1.5 rounded-full bg-success"></span>
								{/if}
							</QueueItemStatus>
						</div>
					</QueueItem>
				{/each}
			</QueueList>
		</QueueSectionContent>
	</QueueSection>
</Queue>
