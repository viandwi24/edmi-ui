<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import { cn } from "$lib/utils.js";
	import SchemaDisplayProperty from "./schema-display-property.svelte";
	import type { SchemaProperty } from "./use-schema-display.svelte.js";

	let {
		name,
		type,
		required,
		description,
		properties,
		items,
		depth = 0,
		class: className,
	}: SchemaProperty & { depth?: number; class?: string } = $props();

	const hasChildren = $derived(!!properties || !!items);
	const paddingLeft = $derived(depth * 16);
</script>

{#if hasChildren}
	<Collapsible.Root open={depth < 2}>
		<Collapsible.Trigger
			class={cn(
				"group/ai-schema-property flex w-full items-center gap-2 py-1.5 text-left text-[12.5px] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
				className
			)}
			style={`padding-left: ${paddingLeft}px`}
		>
			<IconPlaceholder
				lucide="ChevronDownIcon"
				tabler="IconChevronDown"
				hugeicons="ArrowDown01Icon"
				phosphor="CaretDownIcon"
				remixicon="RiArrowDownSLine"
				class="size-3.5 shrink-0 -rotate-90 text-muted-foreground transition-transform group-data-[state=open]/ai-schema-property:rotate-0"
			/>
			<span class="font-mono font-medium">{name}</span>
			<span class="font-mono text-muted-foreground">{type}</span>
			{#if required}
				<Badge class="h-[18px] text-[10.5px]" variant="warning">required</Badge>
			{/if}
			{#if description}
				<span class="ml-auto text-right text-xs text-muted-foreground">{description}</span>
			{/if}
		</Collapsible.Trigger>
		<Collapsible.Content class="overflow-hidden">
			<div>
				{#each properties ?? [] as prop (prop.name)}
					<SchemaDisplayProperty {...prop} depth={depth + 1} />
				{/each}
				{#if items}
					<SchemaDisplayProperty {...items} depth={depth + 1} name={`${name}[]`} />
				{/if}
			</div>
		</Collapsible.Content>
	</Collapsible.Root>
{:else}
	<div
		data-slot="ai-schema-display-property"
		class={cn("flex items-center gap-2 py-1.5 text-[12.5px]", className)}
		style={`padding-left: ${paddingLeft + (depth > 0 ? 22 : 0)}px`}
	>
		<span class="font-mono font-medium">{name}</span>
		<span class="font-mono text-muted-foreground">{type}</span>
		{#if required}
			<Badge class="h-[18px] text-[10.5px]" variant="warning">required</Badge>
		{/if}
		{#if description}
			<span class="ml-auto text-right text-xs text-muted-foreground">{description}</span>
		{/if}
	</div>
{/if}
