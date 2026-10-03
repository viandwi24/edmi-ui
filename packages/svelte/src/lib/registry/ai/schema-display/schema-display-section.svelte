<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	// Shared collapsible section (title + body) behind Parameters, Request and Response.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import type { Snippet } from "svelte";

	let {
		title,
		open = $bindable(true),
		class: className,
		children,
		...restProps
	}: {
		title: string;
		open?: boolean;
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<Collapsible.Root bind:open class={className} {...restProps}>
	<Collapsible.Trigger
		class="group/ai-schema-trigger flex w-full items-center gap-2 px-4 py-2 text-left text-[13.5px] text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
	>
		<IconPlaceholder
			lucide="ChevronDownIcon"
			tabler="IconChevronDown"
			hugeicons="ArrowDown01Icon"
			phosphor="CaretDownIcon"
			remixicon="RiArrowDownSLine"
			class="size-3.5 shrink-0 transition-transform group-data-[state=open]/ai-schema-trigger:rotate-180"
		/>
		<span>{title}</span>
	</Collapsible.Trigger>
	<Collapsible.Content class="overflow-hidden">
		<div class="px-4 pb-2.5">
			{@render children?.()}
		</div>
	</Collapsible.Content>
</Collapsible.Root>
