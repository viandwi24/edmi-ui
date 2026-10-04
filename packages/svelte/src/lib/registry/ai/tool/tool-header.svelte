<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";
	import { CollapsibleTrigger } from "$lib/registry/ui/collapsible/index.js";
	import type { ComponentProps } from "svelte";
	import ToolStatusBadge from "./tool-status-badge.svelte";
	import type { ToolState } from "./types.js";

	let {
		class: className,
		title,
		type,
		state,
		toolName,
		...restProps
	}: Omit<ComponentProps<typeof CollapsibleTrigger>, "children" | "title" | "type"> & {
		/** `tool-<name>` (static tools) or `dynamic-tool` (then pass `toolName`). */
		type: string;
		state: ToolState;
		title?: string;
		toolName?: string;
	} = $props();

	const derivedName = $derived(
		type === "dynamic-tool" ? toolName : type.split("-").slice(1).join("-")
	);
</script>

<CollapsibleTrigger
	data-slot="ai-tool-header"
	class={cn(
		"group/tool-trigger flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[13.5px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
		className
	)}
	{...restProps}
>
	<IconPlaceholder
		lucide="WrenchIcon"
		tabler="IconTool"
		hugeicons="Wrench01Icon"
		phosphor="WrenchIcon"
		remixicon="RiToolsLine"
		class="size-[15px] shrink-0 text-muted-foreground"
	/>
	<span class="font-mono text-[12.5px]">{title ?? derivedName}</span>
	<ToolStatusBadge {state} />
	<IconPlaceholder
		lucide="ChevronDownIcon"
		tabler="IconChevronDown"
		hugeicons="ArrowDown01Icon"
		phosphor="CaretDownIcon"
		remixicon="RiArrowDownSLine"
		class="ml-auto size-3.5 shrink-0 text-muted-foreground transition-transform group-data-[state=open]/tool-trigger:rotate-180"
	/>
</CollapsibleTrigger>
