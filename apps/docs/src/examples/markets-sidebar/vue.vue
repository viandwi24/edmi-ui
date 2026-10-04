<script setup lang="ts">
import {
	ChartLineIcon,
	GlobeIcon,
	LayoutDashboardIcon,
	ListIcon,
	PlusIcon,
	SettingsIcon,
	SparklesIcon,
	StarIcon,
	WalletIcon,
} from "@lucide/vue";
import { IndexRow, IndexRowHeader } from "@edmi-vue/ui/index-row";
import { TickerStrip } from "@edmi-vue/ui/ticker-strip";
import { WatchlistItem } from "@edmi-vue/ui/watchlist-item";
import { Badge } from "@edmi-vue/ui/badge";
import { Button } from "@edmi-vue/ui/button";
import { Card } from "@edmi-vue/ui/card";
import { Input } from "@edmi-vue/ui/input";
import { Kbd } from "@edmi-vue/ui/kbd";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@edmi-vue/ui/sidebar";
import { Table, TableBody, TableHeader } from "@edmi-vue/ui/table";
import { activity, creators, humanVsAi, indexes, sidebarNav, tickers, watchlist } from "./data";

const navIcons: Record<string, unknown> = {
	dashboard: LayoutDashboardIcon,
	explore: GlobeIcon,
	feed: ListIcon,
	leaderboard: StarIcon,
	agents: SparklesIcon,
	create: PlusIcon,
	portfolio: WalletIcon,
	settings: SettingsIcon,
};
</script>

<template>
	<SidebarProvider style="--sidebar-width: 16rem">
		<Sidebar variant="inset" collapsible="offcanvas">
			<SidebarHeader class="gap-3 px-3 pt-4">
				<div class="flex items-center justify-between">
					<a href="#/" class="flex items-center gap-2 font-brand text-xl font-semibold tracking-[-0.4px]">
						<span class="inline-flex size-7 items-center justify-center rounded-lg border border-primary-edge border-b-primary-lip bg-linear-to-b from-primary-hi to-primary text-primary-foreground shadow-btn-primary [background-origin:border-box]">
							<ChartLineIcon class="size-[15px]" />
						</span>
						Stockbreak
					</a>
					<SidebarTrigger />
				</div>
				<div class="relative">
					<Input readonly placeholder="Search" aria-label="Search" class="pr-12" />
					<Kbd class="absolute top-1/2 right-2 -translate-y-1/2">⌘K</Kbd>
				</div>
			</SidebarHeader>
			<SidebarContent class="px-2">
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem v-for="item in sidebarNav" :key="item.label">
								<SidebarMenuButton as-child :is-active="'active' in item && item.active" class="h-9">
									<a href="#/">
										<component :is="navIcons[item.icon]" />
										<span>{{ item.label }}</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel class="text-[11.5px] tracking-[0.6px] uppercase">My watchlist</SidebarGroupLabel>
					<SidebarGroupContent class="flex flex-col gap-0.5">
						<WatchlistItem v-for="(w, i) in watchlist" :key="w.symbol" raised href="#/" :active="i === 0" v-bind="w" />
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter class="px-3 pb-4">
				<div class="rounded-xl border border-border bg-card p-3">
					<div class="text-[13.5px] font-medium">Get devnet USDC ↗</div>
					<div class="text-xs text-muted-foreground">Fund your wallet at /faucet</div>
				</div>
			</SidebarFooter>
		</Sidebar>
		<SidebarInset class="min-w-0 bg-background">
			<header class="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border px-4 md:px-7">
				<div class="flex min-w-0 items-center gap-2 text-[15px]">
					<SidebarTrigger class="md:hidden" />
					<span class="text-muted-foreground max-sm:hidden">Dashboard</span>
					<span class="text-muted-foreground max-sm:hidden">/</span>
					<span>Markets</span>
				</div>
				<div class="flex items-center gap-2">
					<Button raised variant="outline" class="max-sm:hidden">Devnet</Button>
					<Button raised>
						Create index
						<PlusIcon />
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

		<TickerStrip raised :items="tickers" />

		<Card raised class="gap-4 px-6">
			<div class="flex items-baseline justify-between">
				<h2 class="text-xl font-normal tracking-[-0.3px]">Top indexes</h2>
				<a href="#all" class="text-[13px] text-muted-foreground hover:text-foreground">View all</a>
			</div>
			<Table>
				<TableHeader>
					<IndexRowHeader />
				</TableHeader>
				<TableBody>
					<IndexRow v-for="index in indexes" :key="index.symbol" :index="index" delta="pill" />
				</TableBody>
			</Table>
		</Card>

		<div class="grid items-start gap-6 lg:grid-cols-3">
			<Card raised class="@container gap-4 px-6">
				<div class="flex items-baseline justify-between">
					<h2 class="text-xl font-normal tracking-[-0.3px]">Human vs AI</h2>
				</div>
				<div class="grid gap-3 @[400px]:grid-cols-2">
					<div v-for="m in [humanVsAi.human, humanVsAi.ai]" :key="m.label" class="rounded-xl border border-border-2 bg-muted p-[18px] shadow-sunk">
						<div class="text-[13px] text-muted-foreground">{{ m.label }}</div>
						<div class="my-2 text-[34px] leading-none font-light tracking-[-0.5px] text-success-text">{{ m.value }}</div>
						<div class="text-[13px] text-muted-foreground">{{ m.note }}</div>
					</div>
				</div>
			</Card>

			<Card raised class="gap-3 px-6">
				<div class="flex items-baseline justify-between">
					<h2 class="text-xl font-normal tracking-[-0.3px]">Top creators</h2>
					<a href="#all" class="text-[13px] text-muted-foreground hover:text-foreground">See all</a>
				</div>
				<ul>
					<li v-for="c in creators" :key="c.address" class="flex items-center gap-3 border-b border-border-2 py-3 last:border-b-0">
						<span class="inline-flex size-9 items-center justify-center rounded-full border border-border bg-muted font-mono text-xs">{{ c.rank }}</span>
						<div class="min-w-0 flex-1">
							<div class="font-mono text-[13px] font-semibold">{{ c.address }}</div>
							<div class="text-xs text-muted-foreground">{{ c.meta }}</div>
						</div>
						<div class="text-right">
							<div class="font-mono text-[13px] font-semibold">{{ c.aum }}</div>
							<div class="text-xs text-muted-foreground">{{ c.joiners }}</div>
						</div>
					</li>
				</ul>
			</Card>

			<Card raised class="gap-3 px-6">
				<div class="flex items-baseline justify-between">
					<h2 class="text-xl font-normal tracking-[-0.3px]">Latest activity</h2>
				</div>
				<ul>
					<li v-for="(a, i) in activity" :key="i" class="flex items-center gap-2.5 border-b border-border-2 py-3 text-[13px] last:border-b-0">
						<span :class="`size-1.5 rounded-full ${a.tone === 'brand' ? 'bg-success' : 'bg-warning'}`" />
						<span class="font-mono font-semibold">{{ a.symbol }}</span>
						<span class="min-w-0 flex-1 truncate text-foreground-2">{{ a.text }}</span>
						<span class="text-muted-foreground">{{ a.ago }}</span>
					</li>
				</ul>
			</Card>
		</div>
	</div>
		</SidebarInset>
	</SidebarProvider>
</template>
