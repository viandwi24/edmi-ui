<script setup lang="ts">
import { ElevationProvider } from "@edmi-vue/ui/elevation";
import { PlusIcon } from "@lucide/vue";
import { AppHeader } from "@edmi-vue/ui/app-header";
import { IndexRow, IndexRowHeader } from "@edmi-vue/ui/index-row";
import { TickerStrip } from "@edmi-vue/ui/ticker-strip";
import { Badge } from "@edmi-vue/ui/badge";
import { Button } from "@edmi-vue/ui/button";
import { Card } from "@edmi-vue/ui/card";
import { Table, TableBody, TableHeader } from "@edmi-vue/ui/table";
import { activity, creators, humanVsAi, indexes, nav, tickers } from "./data";
</script>

<template>
<ElevationProvider mode="layered">
	<div class="min-h-svh bg-background text-foreground">
		<div class="border-b border-border">
			<div class="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
				<AppHeader
					
					class="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
					:items="nav"
					active="#explore"
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
			<Button size="lg">
				Create index
				<PlusIcon />
			</Button>
		</div>

		<TickerStrip  :items="tickers" />

		<Card class="gap-4 px-6">
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
			<Card class="@container gap-4 px-6">
				<div class="flex items-baseline justify-between">
					<h2 class="text-xl font-normal tracking-[-0.3px]">Human vs AI</h2>
				</div>
				<div class="grid gap-3 @[400px]:grid-cols-2">
					<div v-for="m in [humanVsAi.human, humanVsAi.ai]" :key="m.label" class="rounded-xl border border-sk-bd bg-sk-bg p-[18px] shadow-sunken">
						<div class="text-[13px] text-muted-foreground">{{ m.label }}</div>
						<div class="my-2 text-[34px] leading-none font-light tracking-[-0.5px] text-success-text">{{ m.value }}</div>
						<div class="text-[13px] text-muted-foreground">{{ m.note }}</div>
					</div>
				</div>
			</Card>

			<Card class="gap-3 px-6">
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

			<Card class="gap-3 px-6">
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
	</div>
</ElevationProvider>
</template>
