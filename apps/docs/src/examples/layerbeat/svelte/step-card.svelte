<script lang="ts">
	import type { Snippet } from "svelte";
	import { Card } from "@edmi-svelte/ui/card";
	import { Kbd } from "@edmi-svelte/ui/kbd";

	let {
		index,
		title,
		description,
		children,
	}: { index: string; title: string; description?: string; children: Snippet } = $props();
</script>

<Card class="gap-0 px-[26px] pt-[22px] pb-[26px]">
	<div class="flex items-center gap-3">
		<Kbd class="h-6 min-w-7 text-[11.5px]">{index}</Kbd>
		<h2 class="text-lg font-semibold tracking-[-0.2px]">{title}</h2>
	</div>
	{#if description}
		<p class="mt-3 text-sm text-muted-foreground">{description}</p>
	{/if}
	<div class="mt-[18px]">{@render children()}</div>
</Card>
