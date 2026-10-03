<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { cn } from "$lib/utils.js";

	let {
		name,
		type,
		required,
		description,
		location,
		class: className,
	}: {
		name: string;
		type: string;
		required?: boolean;
		description?: string;
		location?: "path" | "query" | "header";
		class?: string;
	} = $props();
</script>

<div
	data-slot="ai-schema-display-parameter"
	class={cn("flex items-center gap-2 py-1.5 text-[12.5px]", className)}
>
	<span class="font-mono font-medium">{name}</span>
	<span class="font-mono text-muted-foreground">{type}</span>
	{#if location}
		<Badge class="h-[18px] text-[10.5px]" variant="secondary">{location}</Badge>
	{/if}
	{#if required}
		<Badge class="h-[18px] text-[10.5px]" variant="warning">required</Badge>
	{/if}
	{#if description}
		<span class="ml-auto text-right text-xs text-muted-foreground">{description}</span>
	{/if}
</div>
