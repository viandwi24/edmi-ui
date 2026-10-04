<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		name,
		model,
		class: className,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { name: string; model?: string } = $props();
</script>

<div
	data-slot="ai-agent-header"
	class={cn("flex w-full items-center gap-2.5 border-b border-border px-4 py-3.5", className)}
	{...restProps}
>
	<span
		class="inline-flex size-[30px] shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-text"
	>
		<IconPlaceholder
			lucide="SparklesIcon"
			tabler="IconSparkles"
			hugeicons="SparklesIcon"
			phosphor="SparkleIcon"
			remixicon="RiSparklingLine"
			class="size-4"
		/>
	</span>
	<span class="text-sm font-semibold">{name}</span>
	{#if model}
		<Badge class="h-5 font-mono text-[11px]" variant="secondary">{model}</Badge>
	{/if}
</div>
