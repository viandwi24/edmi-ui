<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		label,
		count,
		icon,
		chevron = true,
		...restProps
	}: Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
		label: string;
		count?: number;
		icon?: Snippet;
		chevron?: boolean;
	} = $props();
</script>

<span data-slot="ai-queue-section-label" class={cn("flex items-center gap-2", className)} {...restProps}>
	{#if chevron}
	<IconPlaceholder
		lucide="ChevronDownIcon"
		tabler="IconChevronDown"
		hugeicons="ArrowDown01Icon"
		phosphor="CaretDownIcon"
		remixicon="RiArrowDownSLine"
		class="size-4 text-muted-foreground transition-transform group-data-[state=open]/queue-trigger:rotate-180"
	/>
	{/if}
	{@render icon?.()}
	<span>{label}</span>
	{#if count !== undefined}
		<Badge shape="number" variant="secondary" class="h-5">{count}</Badge>
	{/if}
</span>
