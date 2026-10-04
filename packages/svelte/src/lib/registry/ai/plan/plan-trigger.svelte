<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { CollapsibleTrigger } from "$lib/registry/ui/collapsible/index.js";
	import type { ComponentProps } from "svelte";

	let { class: className, children, ...restProps }: ComponentProps<typeof CollapsibleTrigger> = $props();
</script>

<CollapsibleTrigger data-slot="ai-plan-trigger" {...restProps}>
	{#snippet child({ props })}
		<Button
			{...props}
			variant="ghost"
			size="icon-sm"
			class={cn("size-8 data-[state=open]:bg-transparent hover:data-[state=open]:bg-accent", className)}
		>
			{#if children}
				{@render children()}
			{:else}
				<IconPlaceholder
					lucide="ChevronsUpDownIcon"
					tabler="IconSelector"
					hugeicons="UnfoldMoreIcon"
					phosphor="CaretUpDownIcon"
					remixicon="RiArrowUpDownLine"
					class="size-4"
				/>
				<span class="sr-only">Toggle plan</span>
			{/if}
		</Button>
	{/snippet}
</CollapsibleTrigger>
