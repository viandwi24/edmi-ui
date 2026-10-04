<script lang="ts">
	import { AppHeader } from "@edmi-svelte/ui/app-header";
	import { Avatar, AvatarFallback, AvatarGroup } from "@edmi-svelte/ui/avatar";
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import { Sparkline } from "@edmi-svelte/ui/index-row";
	import * as Table from "@edmi-svelte/ui/table";
	import { looseAssets, looseNote, nav, positions, totals, yourIndexes } from "./data";

	const small = [
		{ label: "USDC", ...totals.usdc },
		{ label: "SOL", ...totals.sol },
	];
</script>

{#snippet tokensStack(tokens: string[])}
	<AvatarGroup>
		{#each tokens as t (t)}
			<Avatar class="size-8">
				<AvatarFallback class="text-[10px]">{t}</AvatarFallback>
			</Avatar>
		{/each}
	</AvatarGroup>
{/snippet}

<div class="min-h-svh bg-background text-foreground">
	<div class="border-b border-border">
		<div class="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
			<AppHeader
				raised
				class="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
				items={nav}
				active="#portfolio"
				onConnect={() => {}}
			/>
		</div>
	</div>
	<div class="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-8 md:px-10">
		<div>
			<div class="flex items-center gap-3">
				<h1 class="text-[44px] leading-tight font-normal tracking-[-1.5px]">Portfolio</h1>
				<Badge variant="secondary">Simulated</Badge>
			</div>
			<p class="mt-1 text-lg text-muted-foreground">Your positions, loose assets and indexes.</p>
		</div>

		<div class="grid items-stretch gap-6 lg:grid-cols-[1.4fr_1fr_1fr]">
			<Card raised class="gap-1.5 px-7">
				<div class="text-[13px] text-muted-foreground">Total value</div>
				<div class="text-[56px] leading-none font-light tracking-[-2px]">{totals.value}</div>
				<div class="mt-3 flex items-center gap-3 text-[13px] text-muted-foreground">
					<Badge variant="destructive" shape="number">{totals.delta}</Badge>
					{totals.deltaNote}
				</div>
				<div class="mt-1 text-[13px] text-muted-foreground">{totals.breakdown}</div>
			</Card>
			{#each small as t (t.label)}
				<Card raised class="gap-1 px-6">
					<div class="text-[13px] text-muted-foreground">{t.label}</div>
					<div class="font-mono text-[32px] leading-tight">{t.value}</div>
					<div class="text-[13px] text-muted-foreground">{t.note}</div>
				</Card>
			{/each}
		</div>

		<Card raised class="gap-4 px-6">
			<div class="flex items-center justify-between gap-3">
				<h2 class="text-xl font-normal tracking-[-0.3px]">Positions</h2>
				<Button elevation="raised" variant="outline" size="sm">Redeem all</Button>
			</div>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Index</Table.Head>
						<Table.Head class="text-right">Shares</Table.Head>
						<Table.Head class="text-right">Price</Table.Head>
						<Table.Head class="text-right">Value</Table.Head>
						<Table.Head class="text-right">PnL</Table.Head>
						<Table.Head class="text-right">7d</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each positions as p (p.symbol)}
						{@const down = p.pnl.startsWith("-")}
						<Table.Row>
							<Table.Cell>
								<div class="flex items-center gap-3">
									{@render tokensStack(p.tokens)}
									<div class="flex items-baseline gap-2">
										<span class="font-medium">{p.name}</span>
										<span class="font-mono text-[11.5px] text-muted-foreground">{p.symbol}</span>
									</div>
								</div>
							</Table.Cell>
							<Table.Cell class="text-right font-mono text-[13px]">{p.shares}</Table.Cell>
							<Table.Cell class="text-right font-mono text-[13px]">{p.price}</Table.Cell>
							<Table.Cell class="text-right font-mono text-[13px]">{p.value}</Table.Cell>
							<Table.Cell class="text-right font-mono text-[13px] {down ? 'text-destructive-text' : 'text-success-text'}">
								{p.pnl} <span class="text-[11.5px]">{p.pnlPct}</span>
							</Table.Cell>
							<Table.Cell class="text-right">
								<Sparkline data={p.spark} tone={down ? "down" : "up"} width={64} />
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card>

		<div class="grid items-start gap-6 lg:grid-cols-2">
			<Card raised class="gap-3 px-6">
				<div class="flex items-center justify-between gap-3">
					<h2 class="text-xl font-normal tracking-[-0.3px]">Loose assets</h2>
					<Button elevation="raised" variant="outline" size="sm">Swap all to USDC</Button>
				</div>
				<p class="text-[13px] leading-relaxed text-muted-foreground">
					Assets in your wallet that are not in any index, worth about
					<b class="font-semibold text-foreground">{looseNote}</b>. Swap them back to USDC or use them to finish a join.
				</p>
				<ul>
					{#each looseAssets as a (a.symbol)}
						<li class="flex items-center gap-3 border-b border-border-2 py-3 last:border-b-0">
							<span class="inline-flex size-8 items-center justify-center rounded-full border border-border bg-muted font-mono text-[11px]">{a.letter}</span>
							<span class="flex-1 font-mono text-[14px] font-semibold">{a.symbol}</span>
							<span class="font-mono text-[13px] text-muted-foreground">{a.amount}</span>
						</li>
					{/each}
				</ul>
			</Card>

			<Card raised class="gap-3 px-6">
				<div class="flex items-center justify-between gap-3">
					<h2 class="text-xl font-normal tracking-[-0.3px]">Your indexes</h2>
					<Button elevation="raised" variant="outline" size="sm">Create index</Button>
				</div>
				<ul>
					{#each yourIndexes as x (x.symbol)}
						<li class="flex items-center gap-3 border-b border-border-2 py-3 last:border-b-0">
							{@render tokensStack(x.tokens)}
							<div class="min-w-0 flex-1">
								<div class="flex items-baseline gap-2">
									<span class="font-medium">{x.name}</span>
									<span class="font-mono text-[11.5px] text-muted-foreground">{x.symbol}</span>
								</div>
								<div class="text-xs text-muted-foreground">AUM {x.aum}</div>
							</div>
							<Button elevation="raised" variant="outline" size="sm">Manage</Button>
						</li>
					{/each}
				</ul>
			</Card>
		</div>
	</div>
</div>
