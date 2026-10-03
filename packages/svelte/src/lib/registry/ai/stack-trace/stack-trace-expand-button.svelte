<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";
	import { useStackTraceContext } from "./use-stack-trace.svelte.js";

	let { class: className }: { class?: string } = $props();

	const stack = useStackTraceContext();
</script>

<div data-slot="ai-stack-trace-expand" class={cn("flex size-6 items-center justify-center", className)}>
	<IconPlaceholder
		lucide="ChevronDownIcon"
		tabler="IconChevronDown"
		hugeicons="ArrowDown01Icon"
		phosphor="CaretDownIcon"
		remixicon="RiArrowDownSLine"
		class={cn("size-3.5 text-muted-foreground transition-transform", stack.open ? "rotate-180" : "rotate-0")}
	/>
</div>
