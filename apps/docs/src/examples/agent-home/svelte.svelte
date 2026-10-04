<script lang="ts">
	import { ElevationProvider } from "@edmi-svelte/ui/elevation";
	import { AgentAvatar } from "@edmi-svelte/ai/agent-avatar";
	import { ConversationEmptyState } from "@edmi-svelte/ai/conversation";
	import {
		PromptInput,
		PromptInputBody,
		PromptInputFooter,
		PromptInputHeader,
		PromptInputSubmit,
		PromptInputTextarea,
		PromptInputTools,
	} from "@edmi-svelte/ai/prompt-input";
	import { PromptInputAgent } from "@edmi-svelte/ai/prompt-input-agent";
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
	import { Suggestion, Suggestions } from "@edmi-svelte/ai/suggestion";
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Button } from "@edmi-svelte/ui/button";
	import { Spinner } from "@edmi-svelte/ui/spinner";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { agent, greeting, project, suggestions, tasks } from "./data";
</script>

<ElevationProvider mode="layered">
<div class="mx-auto flex min-h-svh w-full max-w-2xl flex-col gap-4 bg-background p-4 text-foreground">
	<ConversationEmptyState variant="home" title={greeting} description="" class="flex-1 gap-8 p-2">
		<Badge variant="secondary" class="-mt-5 gap-1.5">
			<IconPlaceholder
				lucide="MapIcon"
				tabler="IconMap"
				hugeicons="Location01Icon"
				phosphor="MapTrifoldIcon"
				remixicon="RiMapLine"
				class="size-3"
			/>
			{project}
		</Badge>
		<Queue variant="flat" class="w-full text-left">
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
										<AgentAvatar seed={task.agent.id} color={task.agent.color} size={22} tile={false} />
									</QueueItemAvatar>
									<QueueItemContent>{task.title}</QueueItemContent>
									<QueueItemStatus>
										<span class="font-mono">{task.age}</span>
										{#if task.status === "running"}
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
		<div class="flex w-full items-center gap-2">
			<span class="shrink-0 text-xs text-muted-foreground">Suggested</span>
			<Suggestions>
				{#each suggestions as s (s)}
					<Suggestion suggestion={s} />
				{/each}
			</Suggestions>
		</div>
	</ConversationEmptyState>

	<PromptInput onSubmit={() => {}}>
		<PromptInputHeader>
			<PromptInputAgent {agent} />
		</PromptInputHeader>
		<PromptInputBody>
			<PromptInputTextarea placeholder="Ask {agent.name} anything about your index…" class="min-h-20" />
		</PromptInputBody>
		<PromptInputFooter>
			<PromptInputTools>
				<Button aria-label="Attach" size="icon-sm" type="button" variant="ghost">
					<IconPlaceholder
						lucide="PlusIcon"
						tabler="IconPlus"
						hugeicons="Add01Icon"
						phosphor="PlusIcon"
						remixicon="RiAddLine"
						class="size-4"
					/>
				</Button>
			</PromptInputTools>
			<PromptInputSubmit class="size-10" size="icon-sm" variant="secondary" />
		</PromptInputFooter>
	</PromptInput>
</div>
</ElevationProvider>
