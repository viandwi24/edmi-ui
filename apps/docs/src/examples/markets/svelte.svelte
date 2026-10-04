<script lang="ts">
	import { AppHeader } from "@edmi-svelte/ui/app-header";
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import { IndexRow, IndexRowHeader } from "@edmi-svelte/ui/index-row";
	import { Table, TableBody, TableHeader } from "@edmi-svelte/ui/table";
	import { TickerStrip } from "@edmi-svelte/ui/ticker-strip";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { activity, creators, humanVsAi, indexes, nav, tickers } from "./data";
</script>

{#snippet cardTop(title: string, action?: string)}
	<div class="flex items-baseline justify-between">
		<h2 class="text-xl font-normal tracking-[-0.3px]">{title}</h2>
		{#if action}
			<a href="#all" class="text-[13px] text-muted-foreground hover:text-foreground">{action}</a>
		{/if}
	</div>
{/snippet}

{#snippet mini(m: { label: string; value: string; note: string })}
	<div class="rounded-xl border border-border-2 bg-muted p-[18px] shadow-sunk">
		<div class="text-[13px] text-muted-foreground">{m.label}</div>
		<div class="my-2 text-[34px] leading-none font-light tracking-[-0.5px] text-success-text">{m.value}</div>
		<div class="text-[13px] text-muted-foreground">{m.note}</div>
	</div>
{/snippet}

<div class="min-h-svh bg-background text-foreground">
	<div class="border-b border-border">
		<div class="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
			<AppHeader
				raised
				class="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
				items={nav}
				active="#explore"
				onConnect={() => {}}
			/>
		</div>
	</div>
<div class="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-8 md:px-10">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<div class="flex items-center gap-3">
				<h1 class="text-[44px] leading-tight font-normal tracking-[-1.5px]">Markets</h1>
				<Badge variant="secondary">Simulated</Badge>
			</div>
			<p class="mt-1 text-lg text-muted-foreground">
				Tokenized stock indexes. Create one, share it, or join someone else’s.
			</p>
		</div>
		<Button elevation="raised" size="lg">
			Create index
			<IconPlaceholder
				lucide="PlusIcon"
				tabler="IconPlus"
				hugeicons="PlusSignIcon"
				phosphor="PlusIcon"
				remixicon="RiAddLine"
			/>
		</Button>
	</div>

	<TickerStrip raised items={tickers} />

	<Card elevation="raised" class="gap-4 px-6">
		{@render cardTop("Top indexes", "View all")}
		<Table>
			<TableHeader>
				<IndexRowHeader />
			</TableHeader>
			<TableBody>
				{#each indexes as index (index.symbol)}
					<IndexRow {index} delta="pill" />
				{/each}
			</TableBody>
		</Table>
	</Card>

	<div class="grid items-start gap-6 lg:grid-cols-3">
		<Card elevation="raised" class="@container gap-4 px-6">
			{@render cardTop("Human vs AI")}
			<div class="grid gap-3 @[400px]:grid-cols-2">
				{@render mini(humanVsAi.human)}
				{@render mini(humanVsAi.ai)}
			</div>
		</Card>

		<Card elevation="raised" class="gap-3 px-6">
			{@render cardTop("Top creators", "See all")}
			<ul>
				{#each creators as c (c.address)}
					<li class="flex items-center gap-3 border-b border-border-2 py-3 last:border-b-0">
						<span
							class="inline-flex size-9 items-center justify-center rounded-full border border-border bg-muted font-mono text-xs"
						>
							{c.rank}
						</span>
						<div class="min-w-0 flex-1">
							<div class="font-mono text-[13px] font-semibold">{c.address}</div>
							<div class="text-xs text-muted-foreground">{c.meta}</div>
						</div>
						<div class="text-right">
							<div class="font-mono text-[13px] font-semibold">{c.aum}</div>
							<div class="text-xs text-muted-foreground">{c.joiners}</div>
						</div>
					</li>
				{/each}
			</ul>
		</Card>

		<Card elevation="raised" class="gap-3 px-6">
			{@render cardTop("Latest activity")}
			<ul>
				{#each activity as a, i (i)}
					<li class="flex items-center gap-2.5 border-b border-border-2 py-3 text-[13px] last:border-b-0">
						<span class="size-1.5 rounded-full {a.tone === 'brand' ? 'bg-success' : 'bg-warning'}"></span>
						<span class="font-mono font-semibold">{a.symbol}</span>
						<span class="min-w-0 flex-1 truncate text-foreground-2">{a.text}</span>
						<span class="text-muted-foreground">{a.ago}</span>
					</li>
				{/each}
			</ul>
		</Card>
	</div>
</div>
</div>
