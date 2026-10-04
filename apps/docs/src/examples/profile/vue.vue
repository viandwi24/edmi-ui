<script setup lang="ts">
import { CopyIcon } from "@lucide/vue";
import { AgentIdenticon } from "@edmi-vue/ui/agent-card";
import { AppHeader } from "@edmi-vue/ui/app-header";
import { Avatar, AvatarFallback, AvatarGroup } from "@edmi-vue/ui/avatar";
import { Badge } from "@edmi-vue/ui/badge";
import { Button } from "@edmi-vue/ui/button";
import { Card } from "@edmi-vue/ui/card";
import { Sparkline } from "@edmi-vue/ui/index-row";
import { Progress } from "@edmi-vue/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@edmi-vue/ui/table";
import { created, nav, positions, profile } from "./data";

const progress = ((profile.xp - profile.levelStartXp) / (profile.nextLevelXp - profile.levelStartXp)) * 100;
</script>

<template>
	<div class="min-h-svh bg-background text-foreground">
		<div class="border-b border-border">
			<div class="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
				<AppHeader raised class="flex-1 border-0 bg-transparent px-0 py-0 shadow-none" :items="nav" />
			</div>
		</div>
		<div class="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-8 md:px-10">
			<div class="flex flex-wrap items-center justify-between gap-4">
				<div class="flex items-center gap-5">
					<AgentIdenticon :seed="profile.address" :size="96" class="rounded-2xl" />
					<div>
						<h1 class="font-mono text-[40px] leading-tight font-normal tracking-[-1px]">{{ profile.short }}</h1>
						<div class="mt-1 flex items-center gap-2 font-mono text-[13px] text-foreground-2">
							{{ profile.address }}
							<Button variant="ghost" size="icon-xs" aria-label="Copy address"><CopyIcon /></Button>
						</div>
						<div class="mt-1 text-[13px] text-muted-foreground">
							{{ profile.followers }} followers · {{ profile.following }} following
						</div>
					</div>
				</div>
				<Button elevation="raised" variant="outline">Edit profile</Button>
			</div>

			<div class="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_2fr]">
				<Card raised class="gap-3 px-6">
					<div class="flex items-end justify-between">
						<span class="text-[13px] text-muted-foreground">Level</span>
						<span class="text-[34px] leading-none font-light">{{ profile.level }}</span>
					</div>
					<Progress :model-value="progress" variant="brand" aria-label="Level progress" />
					<div class="text-[13px] text-muted-foreground">{{ profile.xp }} XP · next level at {{ profile.nextLevelXp }}</div>
				</Card>
				<Card raised class="gap-3 px-6">
					<span class="text-[13px] text-muted-foreground">Badges</span>
					<div class="flex flex-wrap gap-2">
						<Badge v-for="b in profile.badges" :key="b" variant="secondary">{{ b }}</Badge>
					</div>
				</Card>
			</div>

			<Card raised class="gap-4 px-6">
				<h2 class="text-xl font-normal tracking-[-0.3px]">Indexes created</h2>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Index</TableHead>
							<TableHead class="text-right">Share price</TableHead>
							<TableHead class="text-right">7d</TableHead>
							<TableHead class="text-right">AUM</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow v-for="c in created" :key="c.symbol">
							<TableCell>
								<div class="flex items-center gap-3">
									<AvatarGroup>
										<Avatar v-for="t in c.tokens" :key="t" class="size-8">
											<AvatarFallback class="text-[10px]">{{ t }}</AvatarFallback>
										</Avatar>
									</AvatarGroup>
									<div class="flex items-baseline gap-2">
										<span class="font-medium">{{ c.name }}</span>
										<span class="font-mono text-[11.5px] text-muted-foreground">{{ c.symbol }}</span>
									</div>
								</div>
							</TableCell>
							<TableCell class="text-right font-mono text-[13px]">{{ c.price }}</TableCell>
							<TableCell class="text-right"><Badge variant="success" shape="number">{{ c.change }}</Badge></TableCell>
							<TableCell class="text-right font-mono text-[13px]">{{ c.aum }}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Card>

			<Card raised class="gap-4 px-6">
				<h2 class="text-xl font-normal tracking-[-0.3px]">Positions</h2>
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
		</div>
	</div>
</template>
