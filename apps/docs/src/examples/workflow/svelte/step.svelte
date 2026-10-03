<script lang="ts">
	import { Node, NodeContent, NodeDescription, NodeFooter, NodeHeader, NodeTitle } from "@edmi-svelte/ai/node";
	import { Toolbar } from "@edmi-svelte/ai/toolbar";
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Button } from "@edmi-svelte/ui/button";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	// Node type of the workflow (Svelte Flow node types must be components); same shape as `StepData` in data.ts.
	type StepData = {
		title: string;
		description?: string;
		body?: string;
		bodyBadge?: boolean;
		footer?: string;
		badges?: string[];
		actions?: string[];
		toolbar?: boolean;
		handles: { target: boolean; source: boolean };
	};
	let { data, selected = false }: { data: StepData; selected?: boolean } = $props();
</script>

{#if data.toolbar}
	<Toolbar isVisible={selected}>
		<Button size="icon-xs" variant="ghost" aria-label="Settings">
			<IconPlaceholder
				lucide="SettingsIcon"
				tabler="IconSettings"
				hugeicons="Settings01Icon"
				phosphor="GearIcon"
				remixicon="RiSettings3Line"
			/>
		</Button>
		<Button size="icon-xs" variant="ghost" aria-label="Duplicate">
			<IconPlaceholder
				lucide="CopyIcon"
				tabler="IconCopy"
				hugeicons="Copy01Icon"
				phosphor="CopyIcon"
				remixicon="RiFileCopyLine"
			/>
		</Button>
		<Button size="icon-xs" variant="ghost" aria-label="Delete">
			<IconPlaceholder
				lucide="Trash2Icon"
				tabler="IconTrash"
				hugeicons="Delete02Icon"
				phosphor="TrashIcon"
				remixicon="RiDeleteBinLine"
			/>
		</Button>
	</Toolbar>
{/if}
<Node handles={data.handles} {selected}>
	<NodeHeader>
		<NodeTitle>{data.title}</NodeTitle>
		{#if data.description}<NodeDescription>{data.description}</NodeDescription>{/if}
	</NodeHeader>
	{#if data.body || data.badges || data.actions}
		<NodeContent class={data.badges || data.actions ? "flex gap-1.5" : undefined}>
			{#if data.badges}
				<Badge variant="success">{data.badges[0]}</Badge>
				<Badge variant="outline">{data.badges[1]}</Badge>
			{:else if data.actions}
				<Button size="xs">{data.actions[0]}</Button>
				<Button size="xs" variant="outline">{data.actions[1]}</Button>
			{:else if data.bodyBadge}
				<Badge variant="secondary">{data.body}</Badge>
			{:else}
				<span class="font-mono text-xs">{data.body}</span>
			{/if}
		</NodeContent>
	{/if}
	{#if data.footer}<NodeFooter>{data.footer}</NodeFooter>{/if}
</Node>
