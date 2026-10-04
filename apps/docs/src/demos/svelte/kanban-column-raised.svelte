<script lang="ts">
	import * as Kanban from "@edmi-svelte/ui/kanban-column";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

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
{#snippet icon()}
	<IconPlaceholder lucide="SparklesIcon" tabler="IconSparkles" hugeicons="SparklesIcon" phosphor="SparkleIcon" remixicon="RiSparklingLine" />
{/snippet}

<div class="flex flex-wrap items-start gap-3">
	<Kanban.Root elevation={l.value} title="Thesis stage" meta="1/1">
		<Kanban.Item {icon} title="Initial thesis" description="User task" />
	</Kanban.Root>
	<Kanban.Root elevation={l.value} title="Mandate stage" meta="0/3">
		<Kanban.Item disabled {icon} title="Pick tokens + weights" description="Agent task" />
		<Kanban.Item disabled {icon} title="Review mandate" description="Agent requests approval" />
	</Kanban.Root>
</div>
		</div>
	{/each}
</div>
