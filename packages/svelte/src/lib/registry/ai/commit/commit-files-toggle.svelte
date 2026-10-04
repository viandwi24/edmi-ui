<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { CollapsibleTrigger } from "$lib/registry/ui/collapsible/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	// ✦ The "N files changed" row that opens and closes the file list (sits under the header, own top border).
	let {
		count,
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof CollapsibleTrigger> & { count?: number } = $props();
</script>

<div class="border-t border-border-2 px-4 pt-2 pb-1.5">
	<CollapsibleTrigger
		class={cn(
			"group/commit-toggle flex w-full cursor-pointer items-center gap-2 py-1 text-left text-[13.5px] text-muted-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
			className
		)}
		{...restProps}
	>
		<IconPlaceholder
			lucide="ChevronDownIcon"
			tabler="IconChevronDown"
			hugeicons="ArrowDown01Icon"
			phosphor="CaretDownIcon"
			remixicon="RiArrowDownSLine"
			class="size-3.5 transition-transform group-data-[state=open]/commit-toggle:rotate-180"
		/>
		<span>
			{#if children}{@render children()}{:else}{count ?? 0} file{count === 1 ? "" : "s"} changed{/if}
		</span>
	</CollapsibleTrigger>
</div>
