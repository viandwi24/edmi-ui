<script lang="ts">
	import { AllocationBar } from "@edmi-svelte/ui/allocation-bar";
	import { AppHeader } from "@edmi-svelte/ui/app-header";
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Card } from "@edmi-svelte/ui/card";
	import { IndexRow, IndexRowHeader, Sparkline } from "@edmi-svelte/ui/index-row";
	import { Table, TableBody, TableHeader } from "@edmi-svelte/ui/table";
	import { Tabs, TabsList, TabsTrigger } from "@edmi-svelte/ui/tabs";
	import { ToggleGroup, ToggleGroupItem } from "@edmi-svelte/ui/toggle-group";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { benchmark, indexes, kinds, nav, periods, podium, tabs } from "./data";

	let tab = $state("indexes");
	let period = $state("7d");
	let kind = $state("all");

	const isDown = (s: string) => /^[-−–]/.test(s.trim());
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
				<ToggleGroup type="single" raised variant="segmented" value={period} onValueChange={(v) => v && (period = v)}>
					{#each periods as p (p.value)}
						<ToggleGroupItem value={p.value}>{p.label}</ToggleGroupItem>
					{/each}
				</ToggleGroup>
				<ToggleGroup type="single" raised variant="segmented" value={kind} onValueChange={(v) => v && (kind = v)}>
					{#each kinds as k (k.value)}
						<ToggleGroupItem value={k.value}>{k.label}</ToggleGroupItem>
					{/each}
				</ToggleGroup>
			</div>
		</div>
		<p class="-mt-3 text-sm text-muted-foreground">{benchmark}</p>

		<div class="grid gap-4 lg:grid-cols-3">
			{#each podium as e (e.rank)}
				<Card raised class="gap-0 p-6">
					<div class="flex items-center justify-between text-[13px]">
						<span class="font-medium">No. {e.rank}</span>
						<span class="font-mono text-xs text-muted-foreground">{e.creator}</span>
					</div>
					<div class="mt-3 flex items-center gap-3">
						<span class="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-muted text-success-text">
							<IconPlaceholder
								lucide="ChartLineIcon"
								tabler="IconChartLine"
								hugeicons="ChartLineData01Icon"
								phosphor="ChartLineUpIcon"
								remixicon="RiLineChartLine"
								class="size-5"
							/>
						</span>
						<div>
							<div class="text-lg font-medium">{e.name}</div>
							<div class="font-mono text-xs text-muted-foreground">{e.symbol}</div>
						</div>
					</div>
					<div class="mt-4 flex items-end justify-between gap-3">
						<span class="text-[40px] leading-none font-light tracking-[-1px] {isDown(e.change) ? 'text-destructive-text' : 'text-success-text'}">{e.change}</span>
						<Sparkline data={e.spark} width={150} height={34} class="max-w-[45%]" />
					</div>
					<AllocationBar class="mt-4" segments={e.allocation} />
					<div class="mt-4 flex items-center gap-4 border-t border-border-2 pt-4 text-[13px] text-muted-foreground">
						<span>AUM <b class="font-mono font-medium text-foreground">{e.aum}</b></span>
						<span>Holders <b class="font-mono font-medium text-foreground">{e.holders}</b></span>
					</div>
				</Card>
			{/each}
		</div>

		<Card raised class="px-6 py-2">
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
	</div>
</div>
