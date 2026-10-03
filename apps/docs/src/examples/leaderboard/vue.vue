<script setup lang="ts">
import { ref } from "vue";
import { AppHeader } from "@edmi-vue/ui/app-header";
import { Badge } from "@edmi-vue/ui/badge";
import { Card } from "@edmi-vue/ui/card";
import { IndexRow, IndexRowHeader } from "@edmi-vue/ui/index-row";
import { LeaderboardPodium } from "@edmi-vue/ui/leaderboard-podium";
import { Table, TableBody, TableHeader } from "@edmi-vue/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@edmi-vue/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@edmi-vue/ui/toggle-group";
import { benchmark, indexes, kinds, nav, periods, podium, tabs } from "./data";

const tab = ref("indexes");
const period = ref("7d");
const kind = ref("all");
</script>

<template>
	<div class="min-h-svh bg-background text-foreground">
		<div class="border-b border-border">
			<div class="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
				<AppHeader
					raised
					class="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
					:items="nav"
					active="#leaderboard"
				/>
			</div>
		</div>
		<div class="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-10 md:px-10">
			<div class="flex items-center gap-3">
				<h1 class="text-[44px] leading-tight font-normal tracking-[-1.5px]">Leaderboard</h1>
				<Badge variant="secondary">Simulated</Badge>
			</div>

			<div class="flex flex-wrap items-end justify-between gap-4">
				<Tabs :model-value="tab" @update:model-value="(v) => (tab = String(v))">
					<TabsList variant="line">
						<TabsTrigger v-for="t in tabs" :key="t.value" :value="t.value">{{ t.label }}</TabsTrigger>
					</TabsList>
				</Tabs>
				<div class="flex flex-wrap items-center gap-3">
					<ToggleGroup type="single" raised variant="segmented" :model-value="period" @update:model-value="(v) => v && (period = String(v))">
						<ToggleGroupItem v-for="p in periods" :key="p.value" :value="p.value">{{ p.label }}</ToggleGroupItem>
					</ToggleGroup>
					<ToggleGroup type="single" raised variant="segmented" :model-value="kind" @update:model-value="(v) => v && (kind = String(v))">
						<ToggleGroupItem v-for="k in kinds" :key="k.value" :value="k.value">{{ k.label }}</ToggleGroupItem>
					</ToggleGroup>
				</div>
			</div>
			<p class="-mt-3 text-sm text-muted-foreground">{{ benchmark }}</p>

			<LeaderboardPodium variant="cards" raised :entries="podium" />

			<Card raised class="px-6 py-2">
				<Table>
					<TableHeader>
						<IndexRowHeader rank />
					</TableHeader>
					<TableBody>
						<IndexRow v-for="(index, i) in indexes" :key="index.symbol" :index="index" :rank="i + 1" delta="pill" />
					</TableBody>
				</Table>
			</Card>
		</div>
	</div>
</template>
