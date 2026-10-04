<script lang="ts">
	import { AppHeader } from "@edmi-svelte/ui/app-header";
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Card } from "@edmi-svelte/ui/card";
	import { IndexRow, IndexRowHeader } from "@edmi-svelte/ui/index-row";
	import { LeaderboardPodium } from "@edmi-svelte/ui/leaderboard-podium";
	import { Table, TableBody, TableHeader } from "@edmi-svelte/ui/table";
	import { Tabs, TabsList, TabsTrigger } from "@edmi-svelte/ui/tabs";
	import { ToggleGroup, ToggleGroupItem } from "@edmi-svelte/ui/toggle-group";
	import { benchmark, indexes, kinds, nav, periods, podium, tabs } from "./data";

	let tab = $state("indexes");
	let period = $state("7d");
	let kind = $state("all");

</script>

<div class="min-h-svh bg-background text-foreground">
	<div class="border-b border-border">
		<div class="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
			<AppHeader
				raised
				class="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
				items={nav}
				active="#leaderboard"
				onConnect={() => {}}
			/>
		</div>
	</div>
	<div class="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-10 md:px-10">
		<div class="flex items-center gap-3">
			<h1 class="text-[44px] leading-tight font-normal tracking-[-1.5px]">Leaderboard</h1>
			<Badge variant="secondary">Simulated</Badge>
		</div>

		<div class="flex flex-wrap items-end justify-between gap-4">
			<Tabs bind:value={tab}>
				<TabsList variant="line">
					{#each tabs as t (t.value)}
						<TabsTrigger value={t.value}>{t.label}</TabsTrigger>
					{/each}
				</TabsList>
			</Tabs>
			<div class="flex flex-wrap items-center gap-3">
				<ToggleGroup type="single" elevation="raised" variant="segmented" value={period} onValueChange={(v) => v && (period = v)}>
					{#each periods as p (p.value)}
						<ToggleGroupItem value={p.value}>{p.label}</ToggleGroupItem>
					{/each}
				</ToggleGroup>
				<ToggleGroup type="single" elevation="raised" variant="segmented" value={kind} onValueChange={(v) => v && (kind = v)}>
					{#each kinds as k (k.value)}
						<ToggleGroupItem value={k.value}>{k.label}</ToggleGroupItem>
					{/each}
				</ToggleGroup>
			</div>
		</div>
		<p class="-mt-3 text-sm text-muted-foreground">{benchmark}</p>

		<LeaderboardPodium variant="cards" raised entries={podium} />

		<Card raised class="px-6 py-2">
			<Table>
				<TableHeader>
					<IndexRowHeader rank />
				</TableHeader>
				<TableBody>
					{#each indexes as index, i (index.symbol)}
						<IndexRow {index} rank={i + 1} delta="pill" />
					{/each}
				</TableBody>
			</Table>
		</Card>
	</div>
</div>
