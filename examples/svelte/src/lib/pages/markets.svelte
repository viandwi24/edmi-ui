<script lang="ts">
	import Plus from "phosphor-svelte/lib/Plus";
	import { Badge } from "#lib/components/ui/badge/index.js";
	import { Button } from "#lib/components/ui/button/index.js";
	import { Card } from "#lib/components/ui/card/index.js";
	import { IndexRow, IndexRowHeader } from "#lib/components/ui/index-row/index.js";
	import { Table, TableBody, TableHeader } from "#lib/components/ui/table/index.js";
	import { TickerStrip } from "#lib/components/ui/ticker-strip/index.js";
	import { activity, creators, humanVsAi, indexes, tickers } from "#lib/data/markets.js";
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
		<div class="my-2 text-[34px] leading-none font-light tracking-[-0.5px] text-brand-text">{m.value}</div>
		<div class="text-[13px] text-muted-foreground">{m.note}</div>
	</div>
{/snippet}

<!-- The page does not know about the shell: it renders the same inside Dashboard and Navbar layouts. -->
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
		<Button raised size="lg">
			Create index
			<Plus />
		</Button>
	</div>

	<TickerStrip raised items={tickers} />

	<Card raised class="gap-4 px-6">
		{@render cardTop("Top indexes", "View all")}
		<Table>
			<TableHeader>
				<IndexRowHeader />
			</TableHeader>
			<TableBody>
				{#each indexes as index (index.symbol)}
					<IndexRow {index} />
				{/each}
			</TableBody>
		</Table>
	</Card>

	<div class="grid items-start gap-6 lg:grid-cols-3">
		<Card raised class="@container gap-4 px-6">
			{@render cardTop("Human vs AI")}
			<div class="grid gap-3 @[400px]:grid-cols-2">
				{@render mini(humanVsAi.human)}
				{@render mini(humanVsAi.ai)}
			</div>
		</Card>

		<Card raised class="gap-3 px-6">
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

		<Card raised class="gap-3 px-6">
			{@render cardTop("Latest activity")}
			<ul>
				{#each activity as a, i (i)}
					<li class="flex items-center gap-2.5 border-b border-border-2 py-3 text-[13px] last:border-b-0">
						<span class="size-1.5 rounded-full {a.tone === 'brand' ? 'bg-brand' : 'bg-warning'}"></span>
						<span class="font-mono font-semibold">{a.symbol}</span>
						<span class="min-w-0 flex-1 truncate text-foreground-2">{a.text}</span>
						<span class="text-muted-foreground">{a.ago}</span>
					</li>
				{/each}
			</ul>
		</Card>
	</div>
</div>
