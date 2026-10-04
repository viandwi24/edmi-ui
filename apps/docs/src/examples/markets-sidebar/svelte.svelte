<script lang="ts">
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import { Input } from "@edmi-svelte/ui/input";
	import { Kbd } from "@edmi-svelte/ui/kbd";
	import { IndexRow, IndexRowHeader } from "@edmi-svelte/ui/index-row";
	import * as Sidebar from "@edmi-svelte/ui/sidebar";
	import { Table, TableBody, TableHeader } from "@edmi-svelte/ui/table";
	import { TickerStrip } from "@edmi-svelte/ui/ticker-strip";
	import { WatchlistItem } from "@edmi-svelte/ui/watchlist-item";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { activity, creators, humanVsAi, indexes, sidebarNav, tickers, watchlist } from "./data";

	const navIcons: Record<string, Record<string, string>> = {dashboard: { lucide: "LayoutDashboardIcon", tabler: "IconLayoutDashboard", hugeicons: "DashboardSquare01Icon", phosphor: "SquaresFourIcon", remixicon: "RiDashboardLine" }, explore: { lucide: "GlobeIcon", tabler: "IconWorld", hugeicons: "Globe02Icon", phosphor: "GlobeIcon", remixicon: "RiGlobalLine" }, feed: { lucide: "ListIcon", tabler: "IconList", hugeicons: "ListViewIcon", phosphor: "ListIcon", remixicon: "RiListUnordered" }, leaderboard: { lucide: "StarIcon", tabler: "IconStar", hugeicons: "StarIcon", phosphor: "StarIcon", remixicon: "RiStarLine" }, agents: { lucide: "SparklesIcon", tabler: "IconSparkles", hugeicons: "SparklesIcon", phosphor: "SparkleIcon", remixicon: "RiSparklingLine" }, create: { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine" }, portfolio: { lucide: "WalletIcon", tabler: "IconWallet", hugeicons: "Wallet01Icon", phosphor: "WalletIcon", remixicon: "RiWalletLine" }, settings: { lucide: "SettingsIcon", tabler: "IconSettings", hugeicons: "Settings01Icon", phosphor: "GearIcon", remixicon: "RiSettingsLine" }};
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

<Sidebar.Provider style="--sidebar-width: 16rem">
	<Sidebar.Root variant="inset" collapsible="offcanvas">
		<Sidebar.Header class="gap-3 px-3 pt-4">
			<div class="flex items-center justify-between">
				<a href="#/" class="flex items-center gap-2 font-brand text-xl font-semibold tracking-[-0.4px]">
					<span class="inline-flex size-7 items-center justify-center rounded-lg border border-primary-edge border-b-primary-lip bg-linear-to-b from-primary-hi to-primary text-primary-foreground shadow-btn-primary [background-origin:border-box]">
						<IconPlaceholder
							lucide="ChartLineIcon"
							tabler="IconChartLine"
							hugeicons="ChartLineData01Icon"
							phosphor="ChartLineUpIcon"
							remixicon="RiLineChartLine"
							class="size-[15px]"
						/>
					</span>
					Stockbreak
				</a>
				<Sidebar.Trigger />
			</div>
			<div class="relative">
				<Input readonly placeholder="Search" aria-label="Search" class="pr-12" />
				<Kbd class="absolute top-1/2 right-2 -translate-y-1/2">⌘K</Kbd>
			</div>
		</Sidebar.Header>
		<Sidebar.Content class="px-2">
			<Sidebar.Group>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each sidebarNav as item (item.label)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton isActive={"active" in item && item.active} class="h-9">
									{#snippet child({ props })}
										<a href="#/" {...props}>
											<IconPlaceholder {...navIcons[item.icon]} />
											<span>{item.label}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
			<Sidebar.Group>
				<Sidebar.GroupLabel class="text-[11.5px] tracking-[0.6px] uppercase">My watchlist</Sidebar.GroupLabel>
				<Sidebar.GroupContent class="flex flex-col gap-0.5">
					{#each watchlist as w, i (w.symbol)}
						<WatchlistItem raised href="#/" active={i === 0} {...w} />
					{/each}
				</Sidebar.GroupContent>
			</Sidebar.Group>
		</Sidebar.Content>
		<Sidebar.Footer class="px-3 pb-4">
			<div class="rounded-xl border border-border bg-card p-3">
				<div class="text-[13.5px] font-medium">Get devnet USDC ↗</div>
				<div class="text-xs text-muted-foreground">Fund your wallet at /faucet</div>
			</div>
		</Sidebar.Footer>
	</Sidebar.Root>
	<Sidebar.Inset class="min-w-0 bg-background">
		<header class="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border px-4 md:px-7">
			<div class="flex min-w-0 items-center gap-2 text-[15px]">
				<Sidebar.Trigger class="md:hidden" />
				<span class="text-muted-foreground max-sm:hidden">Dashboard</span>
				<span class="text-muted-foreground max-sm:hidden">/</span>
				<span>Markets</span>
			</div>
			<div class="flex items-center gap-2">
				<Button elevation="raised" variant="outline" class="max-sm:hidden">Devnet</Button>
				<Button elevation="raised">
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
		</header>
<div class="flex w-full flex-col gap-6 px-4 py-8 md:px-10">
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
					<IndexRow {index} delta="pill" />
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
	</Sidebar.Inset>
</Sidebar.Provider>
