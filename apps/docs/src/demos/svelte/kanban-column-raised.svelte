<script lang="ts">
	import * as Kanban from "@edmi-svelte/ui/kanban-column";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

{#snippet icon()}
	<IconPlaceholder lucide="SparklesIcon" tabler="IconSparkles" hugeicons="SparklesIcon" phosphor="SparkleIcon" remixicon="RiSparklingLine" />
{/snippet}

<div class="flex flex-wrap items-start gap-3">
	<Kanban.Root raised title="Thesis stage" meta="1/1">
		<Kanban.Item {icon} title="Initial thesis" description="User task" />
	</Kanban.Root>
	<Kanban.Root raised title="Mandate stage" meta="0/3">
		<Kanban.Item disabled {icon} title="Pick tokens + weights" description="Agent task" />
		<Kanban.Item disabled {icon} title="Review mandate" description="Agent requests approval" />
	</Kanban.Root>
</div>
