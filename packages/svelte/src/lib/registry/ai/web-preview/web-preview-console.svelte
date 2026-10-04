<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import { useWebPreviewContext } from "./use-web-preview.svelte.js";

	type LogLevel = "log" | "warn" | "error";

	let {
		logs = [],
		class: className,
		children,
	}: {
		logs?: { level: LogLevel; message: string; timestamp: Date }[];
		class?: string;
		children?: Snippet;
	} = $props();

	const preview = useWebPreviewContext();

	function levelClass(level: LogLevel) {
		if (level === "error") return "text-destructive-text";
		if (level === "warn") return "text-warning-text";
		return "text-foreground";
	}
</script>

<Collapsible.Root
	open={preview.consoleOpen}
	onOpenChange={(value) => (preview.consoleOpen = value)}
	data-slot="ai-web-preview-console"
	class={cn("border-t border-border bg-card font-mono text-[11.5px] leading-[1.8]", className)}
>
	<Collapsible.Trigger
		class="group/ai-console flex w-full items-center justify-between px-3 pt-2 pb-1 text-left font-mono text-[11px] font-medium tracking-[0.8px] text-muted-foreground uppercase outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
	>
		Console
		<IconPlaceholder
			lucide="ChevronDownIcon"
			tabler="IconChevronDown"
			hugeicons="ArrowDown01Icon"
			phosphor="CaretDownIcon"
			remixicon="RiArrowDownSLine"
			class="size-3.5 transition-transform duration-200 group-data-[state=open]/ai-console:rotate-180"
		/>
	</Collapsible.Trigger>
	<Collapsible.Content class="overflow-hidden">
		<div class="max-h-48 overflow-y-auto px-3 pb-2">
			{#if logs.length === 0}
				<p class="text-muted-foreground">No console output</p>
			{:else}
				{#each logs as log, index (`${log.timestamp.getTime()}-${index}`)}
					<div class={levelClass(log.level)}>
						<span class="text-muted-foreground"
							>{log.timestamp.toLocaleTimeString([], { hour12: false })}</span
						>
						{log.level.padEnd(4, " ")}
						{log.message}
					</div>
				{/each}
			{/if}
			{@render children?.()}
		</div>
	</Collapsible.Content>
</Collapsible.Root>
