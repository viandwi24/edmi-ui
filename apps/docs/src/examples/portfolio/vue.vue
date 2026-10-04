<script setup lang="ts">
import { AppHeader } from "@edmi-vue/ui/app-header";
import { Avatar, AvatarFallback, AvatarGroup } from "@edmi-vue/ui/avatar";
import { Badge } from "@edmi-vue/ui/badge";
import { Button } from "@edmi-vue/ui/button";
import { Card } from "@edmi-vue/ui/card";
import { Sparkline } from "@edmi-vue/ui/index-row";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@edmi-vue/ui/table";
import { looseAssets, looseNote, nav, positions, totals, yourIndexes } from "./data";
</script>

<template>
	<div class="min-h-svh bg-background text-foreground">
		<div class="border-b border-border">
			<div class="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
				<AppHeader
					raised
					class="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
					:items="nav"
					active="#portfolio"
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
					<div class="text-[56px] leading-none font-light tracking-[-2px]">{{ totals.value }}</div>
					<div class="mt-3 flex items-center gap-3 text-[13px] text-muted-foreground">
						<Badge variant="destructive" shape="number">{{ totals.delta }}</Badge>
						{{ totals.deltaNote }}
					</div>
					<div class="mt-1 text-[13px] text-muted-foreground">{{ totals.breakdown }}</div>
				</Card>
				<Card v-for="(t, i) in [totals.usdc, totals.sol]" :key="t.value" raised class="gap-1 px-6">
					<div class="text-[13px] text-muted-foreground">{{ i === 0 ? "USDC" : "SOL" }}</div>
					<div class="font-mono text-[32px] leading-tight">{{ t.value }}</div>
					<div class="text-[13px] text-muted-foreground">{{ t.note }}</div>
				</Card>
			</div>

			<Card raised class="gap-4 px-6">
				<div class="flex items-center justify-between gap-3">
					<h2 class="text-xl font-normal tracking-[-0.3px]">Positions</h2>
					<Button elevation="raised" variant="outline" size="sm">Redeem all</Button>
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Index</TableHead>
							<TableHead class="text-right">Shares</TableHead>
							<TableHead class="text-right">Price</TableHead>
							<TableHead class="text-right">Value</TableHead>
							<TableHead class="text-right">PnL</TableHead>
							<TableHead class="text-right">7d</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow v-for="p in positions" :key="p.symbol">
							<TableCell>
								<div class="flex items-center gap-3">
									<AvatarGroup>
										<Avatar v-for="t in p.tokens" :key="t" class="size-8">
											<AvatarFallback class="text-[10px]">{{ t }}</AvatarFallback>
										</Avatar>
									</AvatarGroup>
									<div class="flex items-baseline gap-2">
										<span class="font-medium">{{ p.name }}</span>
										<span class="font-mono text-[11.5px] text-muted-foreground">{{ p.symbol }}</span>
									</div>
								</div>
							</TableCell>
							<TableCell class="text-right font-mono text-[13px]">{{ p.shares }}</TableCell>
							<TableCell class="text-right font-mono text-[13px]">{{ p.price }}</TableCell>
							<TableCell class="text-right font-mono text-[13px]">{{ p.value }}</TableCell>
							<TableCell :class="`text-right font-mono text-[13px] ${p.pnl.startsWith('-') ? 'text-destructive-text' : 'text-success-text'}`">
								{{ p.pnl }} <span class="text-[11.5px]">{{ p.pnlPct }}</span>
							</TableCell>
							<TableCell class="text-right">
								<Sparkline :data="p.spark" :tone="p.pnl.startsWith('-') ? 'down' : 'up'" :width="64" />
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Card>

			<div class="grid items-start gap-6 lg:grid-cols-2">
				<Card raised class="gap-3 px-6">
					<div class="flex items-center justify-between gap-3">
						<h2 class="text-xl font-normal tracking-[-0.3px]">Loose assets</h2>
						<Button elevation="raised" variant="outline" size="sm">Swap all to USDC</Button>
					</div>
					<p class="text-[13px] leading-relaxed text-muted-foreground">
						Assets in your wallet that are not in any index, worth about
						<b class="font-semibold text-foreground">{{ looseNote }}</b>. Swap them back to USDC or use them to finish a join.
					</p>
					<ul>
						<li v-for="a in looseAssets" :key="a.symbol" class="flex items-center gap-3 border-b border-border-2 py-3 last:border-b-0">
							<span class="inline-flex size-8 items-center justify-center rounded-full border border-border bg-muted font-mono text-[11px]">{{ a.letter }}</span>
							<span class="flex-1 font-mono text-[14px] font-semibold">{{ a.symbol }}</span>
							<span class="font-mono text-[13px] text-muted-foreground">{{ a.amount }}</span>
						</li>
					</ul>
				</Card>

				<Card raised class="gap-3 px-6">
					<div class="flex items-center justify-between gap-3">
						<h2 class="text-xl font-normal tracking-[-0.3px]">Your indexes</h2>
						<Button elevation="raised" variant="outline" size="sm">Create index</Button>
					</div>
					<ul>
						<li v-for="x in yourIndexes" :key="x.symbol" class="flex items-center gap-3 border-b border-border-2 py-3 last:border-b-0">
							<AvatarGroup>
								<Avatar v-for="t in x.tokens" :key="t" class="size-8">
									<AvatarFallback class="text-[10px]">{{ t }}</AvatarFallback>
								</Avatar>
							</AvatarGroup>
							<div class="min-w-0 flex-1">
								<div class="flex items-baseline gap-2">
									<span class="font-medium">{{ x.name }}</span>
									<span class="font-mono text-[11.5px] text-muted-foreground">{{ x.symbol }}</span>
								</div>
								<div class="text-xs text-muted-foreground">AUM {{ x.aum }}</div>
							</div>
							<Button elevation="raised" variant="outline" size="sm">Manage</Button>
						</li>
					</ul>
				</Card>
			</div>
		</div>
	</div>
</template>
