<script lang="ts">
	import { ElevationProvider } from "@edmi-svelte/ui/elevation";
	import { AreaChart } from "layerchart";
	import { AllocationBar } from "@edmi-svelte/ui/allocation-bar";
	import { AppHeader } from "@edmi-svelte/ui/app-header";
	import { Avatar, AvatarFallback } from "@edmi-svelte/ui/avatar";
	import { Badge } from "@edmi-svelte/ui/badge";
	import * as Breadcrumb from "@edmi-svelte/ui/breadcrumb";
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import * as Chart from "@edmi-svelte/ui/chart";
	import { JoinPanel } from "@edmi-svelte/ui/join-panel";
	import * as Table from "@edmi-svelte/ui/table";
	import * as Tabs from "@edmi-svelte/ui/tabs";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import {
		allocation,
		assets,
		chart,
		creator,
		index,
		joinRows,
		joinTabs,
		maxAmount,
		nav,
		quickAmounts,
		ranges,
		shareActions,
		statGroups,
	} from "./data";

	let range = $state("1M");
	let side = $state("join");
	let amount = $state("100");

	const points = chart.map((p, i) => ({ i, ...p }));
	const config = {
		mag4: { label: "MAG4", color: "var(--chart-1)" },
		spyx: { label: "SPYx", color: "var(--muted-foreground)" },
	} satisfies Chart.ChartConfig;
</script>

<ElevationProvider mode="layered">

<div class="min-h-svh bg-background text-foreground">
	<div class="border-b border-border">
		<div class="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
			<AppHeader
				
				class="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
				items={nav}
				active="#explore"
				onConnect={() => {}}
			/>
		</div>
	</div>
	<div class="border-b border-border">
		<div class="mx-auto flex max-w-[1328px] flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-10">
			<Breadcrumb.Root>
				<Breadcrumb.List class="text-base">
					<Breadcrumb.Item>
						<Breadcrumb.Link href="#explore">Explore</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Page>{index.name}</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
			<div class="flex items-center gap-2">
				<Button variant="outline" elevation="raised">Clone</Button>
				<Button variant="outline" elevation="raised">Follow</Button>
				<Button variant="outline" elevation="raised" size="icon" aria-label="Share">
					<IconPlaceholder
						lucide="ArrowUpIcon"
						tabler="IconArrowUp"
						hugeicons="ArrowUpIcon"
						phosphor="ArrowUpIcon"
						remixicon="RiArrowUpLine"
					/>
				</Button>
			</div>
		</div>
	</div>

	<div class="mx-auto grid w-full max-w-[1328px] items-start gap-8 px-4 py-8 md:px-10 lg:grid-cols-[minmax(0,1fr)_380px]">
		<div class="flex min-w-0 flex-col gap-6">
			<div class="flex flex-wrap items-center gap-3">
				<Avatar class="size-10">
					<AvatarFallback>{index.initial}</AvatarFallback>
				</Avatar>
				<h1 class="text-[28px] leading-tight font-medium tracking-[-0.5px]">
					{index.name}<span class="font-normal text-muted-foreground"> · ({index.symbol})</span>
				</h1>
				{#each index.tags as tag (tag)}
					<Badge variant="secondary">{tag}</Badge>
				{/each}
			</div>

			<div class="flex flex-wrap items-start justify-between gap-6">
				<div class="flex flex-wrap gap-x-12 gap-y-4">
					<div>
						<div class="flex flex-wrap items-center gap-3">
							<span class="text-[56px] leading-none font-light tracking-[-2px]">{index.nav}</span>
							<Badge variant="success" shape="number" class="font-mono">{index.navDelta}</Badge>
						</div>
						<p class="mt-2 text-[13px] text-muted-foreground">{index.navNote}</p>
					</div>
					<div>
						<div class="flex flex-wrap items-center gap-3">
							<span class="text-[56px] leading-none font-light tracking-[-2px] text-success-text">{index.ret7d}</span>
							<Badge variant="success" shape="number" class="font-mono">{index.retVs}</Badge>
						</div>
						<p class="mt-2 text-[13px] text-muted-foreground">{index.retNote}</p>
					</div>
				</div>
				<Button variant="outline" elevation="raised">Compare index</Button>
			</div>

			<Chart.Container {config} class="aspect-auto h-[260px] w-full">
				<AreaChart
					data={points}
					x="i"
					series={[
						{ key: "spyx", label: config.spyx.label, color: "var(--color-spyx)" },
						{ key: "mag4", label: config.mag4.label, color: "var(--color-mag4)" },
					]}
					props={{
						area: { "fill-opacity": 0.18 },
						xAxis: { format: (v: number) => chart[v]?.day ?? "", ticks: 10 },
						yAxis: { format: () => "" },
					}}
				>
					{#snippet tooltip()}
						<Chart.Tooltip indicator="dot" labelFormatter={(v: number) => chart[v]?.day ?? ""} />
					{/snippet}
				</AreaChart>
			</Chart.Container>

			<div class="flex flex-wrap items-center justify-between gap-3">
				<Tabs.Root bind:value={range}>
					<Tabs.List variant="line">
						{#each ranges as r (r)}
							<Tabs.Trigger value={r} class="font-mono text-xs">{r}</Tabs.Trigger>
						{/each}
					</Tabs.List>
				</Tabs.Root>
				<div class="flex items-center gap-4 text-[13px]">
					<span class="flex items-center gap-1.5"><span class="size-2 rounded-full bg-chart-1"></span>{index.symbol}</span>
					<span class="flex items-center gap-1.5"><span class="size-2 rounded-full bg-muted-foreground"></span>SPYx</span>
				</div>
			</div>

			<div class="grid gap-4 md:grid-cols-3">
				{#each statGroups as group (group[0]?.label)}
					<div class="rounded-xl border border-sk-bd bg-sk-bg px-[18px] py-3 shadow-sunken">
						{#each group as row (row.label)}
							<div class="flex items-center justify-between py-1.5 text-[13px]">
								<span class="text-muted-foreground">{row.label}</span>
								<span class="font-mono">{row.value}</span>
							</div>
						{/each}
					</div>
				{/each}
			</div>

			<div>
				<h2 class="mb-3 text-lg font-medium">Assets</h2>
				<Card class="gap-4 px-6 py-2">
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head>Asset</Table.Head>
								<Table.Head numeric>Weight</Table.Head>
								<Table.Head numeric>Target</Table.Head>
								<Table.Head numeric>Drift</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each assets as a (a.symbol)}
								<Table.Row>
									<Table.Cell>
										<div class="flex items-center gap-3">
											<Avatar class="size-7">
												<AvatarFallback class="text-[10px]">{a.initial}</AvatarFallback>
											</Avatar>
											<span class="font-mono text-[13px]">{a.symbol}</span>
										</div>
									</Table.Cell>
									<Table.Cell numeric class="font-semibold">{a.weight}</Table.Cell>
									<Table.Cell numeric class="text-muted-foreground">{a.target}</Table.Cell>
									<Table.Cell numeric trend={a.trend}>{a.drift}</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
					<AllocationBar class="pb-3" segments={allocation} />
				</Card>
			</div>
		</div>

		<div class="flex flex-col gap-4">
			<JoinPanel
				
				class="w-full"
				tabs={joinTabs}
				bind:tab={side}
				bind:amount
				onMax={() => (amount = maxAmount.replace(",", ""))}
				amountSize="lg"
				maxLabel="Max {maxAmount}"
				{quickAmounts}
				rows={joinRows}
				joinLabel="{side === 'join' ? 'Join' : 'Redeem'} with {amount || 0} USDC"
				footnote="Self-custodied · Redeem anytime"
			/>

			<Card class="gap-3 px-5">
				<h2 class="text-sm font-semibold">Share</h2>
				<div class="flex flex-wrap gap-2">
					{#each shareActions as s (s)}
						<Button variant="outline" elevation="raised" size="sm">{s}</Button>
					{/each}
				</div>
			</Card>

			<Card class="gap-3 px-5">
				<h2 class="text-sm font-semibold">Created by</h2>
				<div class="flex items-center gap-3">
					<Avatar class="size-9">
						<AvatarFallback class="font-mono text-xs">{creator.initial}</AvatarFallback>
					</Avatar>
					<div>
						<div class="font-mono text-[13px]">{creator.address}</div>
						<div class="text-xs text-muted-foreground">{creator.meta}</div>
					</div>
				</div>
			</Card>
		</div>
	</div>
</div>
</ElevationProvider>
