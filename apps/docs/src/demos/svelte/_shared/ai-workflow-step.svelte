<script lang="ts">
	import { Node, NodeContent, NodeDescription, NodeFooter, NodeHeader, NodeTitle } from "@edmi-svelte/ai/node";
	import { Toolbar } from "@edmi-svelte/ai/toolbar";
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Button } from "@edmi-svelte/ui/button";
	import { CopyIcon, SettingsIcon, Trash2Icon } from "@lucide/svelte";

	// Shared node type of the AI Workflow demos (Svelte Flow node types must be components).
	type StepData = {
		title: string;
		description?: string;
		body?: string;
		footer?: string;
		badges?: string[];
		toolbar?: boolean;
		raised?: boolean;
		compact?: boolean;
		handles: { target: boolean; source: boolean };
	};

	let { data, selected = false }: { data: StepData; selected?: boolean } = $props();
</script>

{#if data.toolbar}
	<Toolbar isVisible>
		<Button size="icon-xs" variant="ghost" aria-label="Settings"><SettingsIcon /></Button>
		<Button size="icon-xs" variant="ghost" aria-label="Duplicate"><CopyIcon /></Button>
		<Button size="icon-xs" variant="ghost" aria-label="Delete"><Trash2Icon /></Button>
	</Toolbar>
{/if}
<Node handles={data.handles} {selected} raised={data.raised} class={data.compact ? "w-40" : undefined}>
	<NodeHeader class={data.compact ? "border-b-0" : undefined}>
		<NodeTitle>{data.title}</NodeTitle>
		{#if data.description}<NodeDescription>{data.description}</NodeDescription>{/if}
	</NodeHeader>
	{#if data.body || data.badges}
		<NodeContent class={data.badges ? "flex gap-1.5" : undefined}>
			{#if data.badges}
				<Badge variant="success">{data.badges[0]}</Badge>
				{#if data.badges[1]}<Badge variant="outline">{data.badges[1]}</Badge>{/if}
			{:else}
				{#if data.body === "cron 0 * * * *"}
					<Badge variant="secondary">{data.body}</Badge>
				{:else}
					<span class="font-mono text-xs">{data.body}</span>
				{/if}
			{/if}
		</NodeContent>
	{/if}
	{#if data.footer}<NodeFooter>{data.footer}</NodeFooter>{/if}
</Node>
