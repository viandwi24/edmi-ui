<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import {
		AccordionContent,
		AccordionItem,
		AccordionTrigger,
	} from "$lib/registry/ui/accordion/index.js";
	import { cn } from "$lib/utils.js";
	import { CodeBlock } from "../code-block/index.js";
	import { useAgentToolsContext } from "./use-agent.svelte.js";

	let {
		tool,
		value,
		name,
		class: className,
	}: {
		/** Matches the AI SDK `Tool` shape (`description`, `inputSchema`); a string schema is shown as typescript, anything else as JSON. */
		tool: { description?: string; inputSchema?: unknown; jsonSchema?: unknown };
		value: string;
		/** ✦ Tool name shown in mono before the description; falls back to `value`. */
		name?: string;
		class?: string;
	} = $props();

	const tools = useAgentToolsContext();
	$effect(() => tools?.register());

	const schema = $derived(
		"jsonSchema" in tool && tool.jsonSchema ? tool.jsonSchema : tool.inputSchema
	);
	const isString = $derived(typeof schema === "string");
	const code = $derived(isString ? (schema as string) : JSON.stringify(schema, null, 2));
</script>

<AccordionItem {value} class={cn("border-t-0 border-b border-border-2", className)}>
	<AccordionTrigger class="gap-2 py-[9px] text-[13px] font-normal">
		<IconPlaceholder
			lucide="Settings2Icon"
			tabler="IconSettings"
			hugeicons="Settings05Icon"
			phosphor="GearIcon"
			remixicon="RiSettingsLine"
			class="size-3.5 shrink-0 text-muted-foreground"
		/>
		<span class="font-mono text-[12.5px]">{name ?? value}</span>
		<span class="min-w-0 flex-1 truncate text-[13px] font-normal text-muted-foreground">
			{tool.description ?? "No description"}
		</span>
	</AccordionTrigger>
	<AccordionContent class="pb-2.5">
		<CodeBlock class="rounded-lg border-0 bg-muted" {code} language={isString ? "typescript" : "json"} />
	</AccordionContent>
</AccordionItem>
