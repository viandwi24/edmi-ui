<script lang="ts">
	import { AgentIdenticon } from "@edmi-svelte/ui/agent-card";
	import { AppHeader } from "@edmi-svelte/ui/app-header";
	import { Avatar, AvatarFallback, AvatarGroup } from "@edmi-svelte/ui/avatar";
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import { Sparkline } from "@edmi-svelte/ui/index-row";
	import * as Progress from "@edmi-svelte/ui/progress";
	import * as Table from "@edmi-svelte/ui/table";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { created, nav, positions, profile } from "./data";

	const progress = ((profile.xp - profile.levelStartXp) / (profile.nextLevelXp - profile.levelStartXp)) * 100;
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

{#snippet nameTag(name: string, symbol: string)}
	<div class="flex items-baseline gap-2">
		<span class="font-medium">{name}</span>
		<span class="font-mono text-[11.5px] text-muted-foreground">{symbol}</span>
	</div>
{/snippet}

<div class="min-h-svh bg-background text-foreground">
	<div class="border-b border-border">
		<div class="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
			<AppHeader
				raised
				class="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
				items={nav}
				onConnect={() => {}}
			/>
		</div>
	</div>
	<div class="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-8 md:px-10">
		<div class="flex flex-wrap items-center justify-between gap-4">
			<div class="flex items-center gap-5">
				<AgentIdenticon seed={profile.address} size={96} class="rounded-2xl" />
				<div>
					<h1 class="font-mono text-[40px] leading-tight font-normal tracking-[-1px]">{profile.short}</h1>
					<div class="mt-1 flex items-center gap-2 font-mono text-[13px] text-foreground-2">
						{profile.address}
						<Button variant="ghost" size="icon-xs" aria-label="Copy address">
							<IconPlaceholder
								lucide="CopyIcon"
								tabler="IconCopy"
								hugeicons="Copy01Icon"
								phosphor="CopyIcon"
								remixicon="RiFileCopyLine"
							/>
						</Button>
					</div>
					<div class="mt-1 text-[13px] text-muted-foreground">
						{profile.followers} followers · {profile.following} following
					</div>
				</div>
			</div>
			<Button elevation="raised" variant="outline">Edit profile</Button>
		</div>

		<div class="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_2fr]">
			<Card raised class="gap-3 px-6">
				<div class="flex items-end justify-between">
					<span class="text-[13px] text-muted-foreground">Level</span>
					<span class="text-[34px] leading-none font-light">{profile.level}</span>
				</div>
				<Progress.Root value={progress} variant="brand" aria-label="Level progress" />
				<div class="text-[13px] text-muted-foreground">{profile.xp} XP · next level at {profile.nextLevelXp}</div>
			</Card>
			<Card raised class="gap-3 px-6">
				<span class="text-[13px] text-muted-foreground">Badges</span>
				<div class="flex flex-wrap gap-2">
					{#each profile.badges as b (b)}
						<Badge variant="secondary">{b}</Badge>
					{/each}
				</div>
			</Card>
		</div>

		<Card raised class="gap-4 px-6">
			<h2 class="text-xl font-normal tracking-[-0.3px]">Indexes created</h2>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Index</Table.Head>
						<Table.Head class="text-right">Share price</Table.Head>
						<Table.Head class="text-right">7d</Table.Head>
						<Table.Head class="text-right">AUM</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each created as c (c.symbol)}
						<Table.Row>
							<Table.Cell>
								<div class="flex items-center gap-3">
									{@render tokensStack(c.tokens)}
									{@render nameTag(c.name, c.symbol)}
								</div>
							</Table.Cell>
							<Table.Cell class="text-right font-mono text-[13px]">{c.price}</Table.Cell>
							<Table.Cell class="text-right"><Badge variant="success" shape="number">{c.change}</Badge></Table.Cell>
							<Table.Cell class="text-right font-mono text-[13px]">{c.aum}</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card>

		<Card raised class="gap-4 px-6">
			<h2 class="text-xl font-normal tracking-[-0.3px]">Positions</h2>
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
									{@render nameTag(p.name, p.symbol)}
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
	</div>
</div>
