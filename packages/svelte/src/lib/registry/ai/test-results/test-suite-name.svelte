<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Badge, type BadgeVariant } from "$lib/registry/ui/badge/index.js";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import { type TestStatusType, useTestSuiteContext } from "./use-test-results.svelte.js";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();

	const suite = useTestSuiteContext();

	const variants: Record<TestStatusType, BadgeVariant> = {
		failed: "destructive",
		passed: "success",
		running: "info",
		skipped: "warning",
	};
</script>

<Collapsible.Trigger
	data-slot="ai-test-suite-name"
	class={cn(
		"group/ai-test-suite flex w-full items-center gap-2 py-1.5 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
		className
	)}
>
	<IconPlaceholder
		lucide="ChevronDownIcon"
		tabler="IconChevronDown"
		hugeicons="ArrowDown01Icon"
		phosphor="CaretDownIcon"
		remixicon="RiArrowDownSLine"
		class="size-3.5 shrink-0 text-muted-foreground transition-transform group-data-[state=open]/ai-test-suite:rotate-180"
	/>
	<span class="font-mono text-[12.5px]">
		{#if children}{@render children()}{:else}{suite.name}{/if}
	</span>
	<Badge class="h-[18px] text-[10.5px]" variant={variants[suite.status]}>{suite.status}</Badge>
</Collapsible.Trigger>
