<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import * as Collapsible from "@edmi-svelte/ui/collapsible";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let open = $state(false);
	const rows = ["NVDAx · 32%", "MSFTx · 28%", "AAPLx · 24%", "ANTHRP-pre · 16%"];
</script>

<Collapsible.Root
	bind:open
	class="w-[320px] rounded-xl border border-border bg-card p-3"
>
	<div class="flex items-center justify-between">
		<span class="px-1 text-sm font-medium">3 tokens hidden</span>
		<Collapsible.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="ghost" size="icon-xs" aria-label="Toggle">
					<IconPlaceholder
						lucide="ChevronsUpDownIcon"
						tabler="IconSelector"
						hugeicons="UnfoldMoreIcon"
						phosphor="CaretUpDownIcon"
						remixicon="RiArrowUpDownLine"
					/>
				</Button>
			{/snippet}
		</Collapsible.Trigger>
	</div>
	<div class="mt-2 rounded-md border border-border bg-muted px-3 py-2 font-mono text-[13px]">
		{rows[0]}
	</div>
	<Collapsible.Content class="mt-2 flex flex-col gap-2">
		{#each rows.slice(1) as r (r)}
			<div class="rounded-md border border-border bg-muted px-3 py-2 font-mono text-[13px]">
				{r}
			</div>
		{/each}
	</Collapsible.Content>
</Collapsible.Root>
