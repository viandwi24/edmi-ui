<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import { cn } from "$lib/utils.js";
	import type { ToolUIPart } from "ai";
	import type { ComponentProps } from "svelte";
	import SandboxStatusBadge from "./sandbox-status-badge.svelte";

	let {
		ref = $bindable(null),
		title,
		state: status,
		class: className,
		...restProps
	}: Omit<ComponentProps<typeof Collapsible.Trigger>, "children"> & {
		title?: string;
		state: ToolUIPart["state"];
	} = $props();
</script>

<Collapsible.Trigger
	bind:ref
	data-slot="ai-sandbox-header"
	class={cn(
		"group/ai-sandbox-trigger flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
		className
	)}
	{...restProps}
>
	<IconPlaceholder
		lucide="TerminalSquareIcon"
		tabler="IconTerminal2"
		hugeicons="ComputerTerminalIcon"
		phosphor="TerminalIcon"
		remixicon="RiTerminalBoxLine"
		class="size-[15px] shrink-0 text-muted-foreground"
	/>
	<span class="font-mono text-[12.5px]">{title}</span>
	<SandboxStatusBadge state={status} />
	<IconPlaceholder
		lucide="ChevronDownIcon"
		tabler="IconChevronDown"
		hugeicons="ArrowDown01Icon"
		phosphor="CaretDownIcon"
		remixicon="RiArrowDownSLine"
		class="ml-auto size-3.5 shrink-0 text-muted-foreground transition-transform group-data-[state=open]/ai-sandbox-trigger:rotate-180"
	/>
</Collapsible.Trigger>
