<script setup lang="ts">
import { ElevationProvider } from "@edmi-vue/ui/elevation";
import { ArrowUpIcon } from "@lucide/vue";
import { VisArea, VisAxis, VisLine, VisXYContainer } from "@unovis/vue";
import { ref } from "vue";
import { AllocationBar } from "@edmi-vue/ui/allocation-bar";
import { AppHeader } from "@edmi-vue/ui/app-header";
import { Avatar, AvatarFallback } from "@edmi-vue/ui/avatar";
import { Badge } from "@edmi-vue/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@edmi-vue/ui/breadcrumb";
import { Button } from "@edmi-vue/ui/button";
import { Card } from "@edmi-vue/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartCrosshair,
	ChartTooltip,
	ChartTooltipContent,
	componentToString,
} from "@edmi-vue/ui/chart";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@edmi-vue/ui/table";
import { JoinPanel } from "@edmi-vue/ui/join-panel";
import { Tabs, TabsList, TabsTrigger } from "@edmi-vue/ui/tabs";
import {
	allocation,
	assets,
	type ChartPoint,
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

const range = ref("1M");
const side = ref("join");
const amount = ref("100");

const config = {
	mag4: { label: "MAG4", color: "var(--chart-1)" },
	spyx: { label: "SPYx", color: "var(--muted-foreground)" },
} satisfies ChartConfig;

const x = (_: ChartPoint, i: number) => i;
const tickFormat = (i: number) => chart[i]?.day ?? "";
const template = componentToString(config, ChartTooltipContent, {
	indicator: "dot",
	labelFormatter: (i) => tickFormat(Number(i)),
});
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
		<div class="border-b border-border">
			<div class="mx-auto flex max-w-[1328px] flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-10">
				<Breadcrumb>
					<BreadcrumbList class="text-base">
						<BreadcrumbItem>
							<BreadcrumbLink href="#explore">Explore</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{{ index.name }}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div class="flex items-center gap-2">
					<Button variant="outline" elevation="raised">Clone</Button>
					<Button variant="outline" elevation="raised">Follow</Button>
					<Button variant="outline" elevation="raised" size="icon" aria-label="Share"><ArrowUpIcon /></Button>
				</div>
			</div>
		</div>

		<div class="mx-auto grid w-full max-w-[1328px] items-start gap-8 px-4 py-8 md:px-10 lg:grid-cols-[minmax(0,1fr)_380px]">
			<div class="flex min-w-0 flex-col gap-6">
				<div class="flex flex-wrap items-center gap-3">
					<Avatar class="size-10">
						<AvatarFallback>{{ index.initial }}</AvatarFallback>
					</Avatar>
					<h1 class="text-[28px] leading-tight font-medium tracking-[-0.5px]">
						{{ index.name }}<span class="font-normal text-muted-foreground"> · ({{ index.symbol }})</span>
					</h1>
					<Badge v-for="tag in index.tags" :key="tag" variant="secondary">{{ tag }}</Badge>
				</div>

				<div class="flex flex-wrap items-start justify-between gap-6">
					<div class="flex flex-wrap gap-x-12 gap-y-4">
						<div>
							<div class="flex flex-wrap items-center gap-3">
								<span class="text-[56px] leading-none font-light tracking-[-2px]">{{ index.nav }}</span>
								<Badge variant="success" shape="number" class="font-mono">{{ index.navDelta }}</Badge>
							</div>
							<p class="mt-2 text-[13px] text-muted-foreground">{{ index.navNote }}</p>
						</div>
						<div>
							<div class="flex flex-wrap items-center gap-3">
								<span class="text-[56px] leading-none font-light tracking-[-2px] text-success-text">{{ index.ret7d }}</span>
								<Badge variant="success" shape="number" class="font-mono">{{ index.retVs }}</Badge>
							</div>
							<p class="mt-2 text-[13px] text-muted-foreground">{{ index.retNote }}</p>
						</div>
					</div>
					<Button variant="outline" elevation="raised">Compare index</Button>
				</div>

				<ChartContainer :config="config" class="aspect-auto h-[260px] w-full" cursor>
					<VisXYContainer :data="chart" :margin="{ left: 4, right: 4, top: 8 }" :y-domain="[0, undefined]">
						<VisLine :x="x" :y="(d: ChartPoint) => d.spyx" :color="config.spyx.color" :line-dash-array="[5, 4]" />
						<VisArea :x="x" :y="(d: ChartPoint) => d.mag4" :color="config.mag4.color" :opacity="0.18" />
						<VisLine :x="x" :y="(d: ChartPoint) => d.mag4" :color="config.mag4.color" />
						<VisAxis
							type="x"
							:x="x"
							:tick-format="tickFormat"
							:num-ticks="10"
							:tick-line="false"
							:domain-line="false"
							:grid-line="false"
						/>
						<ChartTooltip />
						<ChartCrosshair
							:x="x"
							:y="[(d: ChartPoint) => d.mag4, (d: ChartPoint) => d.spyx]"
							:template="template"
							:color="() => config.mag4.color"
						/>
					</VisXYContainer>
				</ChartContainer>

				<div class="flex flex-wrap items-center justify-between gap-3">
					<Tabs :model-value="range" @update:model-value="(v) => (range = String(v))">
						<TabsList variant="line">
							<TabsTrigger v-for="r in ranges" :key="r" :value="r" class="font-mono text-xs">{{ r }}</TabsTrigger>
						</TabsList>
					</Tabs>
					<div class="flex items-center gap-4 text-[13px]">
						<span class="flex items-center gap-1.5"><span class="size-2 rounded-full bg-chart-1" />{{ index.symbol }}</span>
						<span class="flex items-center gap-1.5"><span class="size-2 rounded-full bg-muted-foreground" />SPYx</span>
					</div>
				</div>

				<div class="grid gap-4 md:grid-cols-3">
					<div v-for="group in statGroups" :key="group[0]?.label" class="rounded-xl border border-sk-bd bg-sk-bg px-[18px] py-3 shadow-sunken">
						<div v-for="row in group" :key="row.label" class="flex items-center justify-between py-1.5 text-[13px]">
							<span class="text-muted-foreground">{{ row.label }}</span>
							<span class="font-mono">{{ row.value }}</span>
						</div>
					</div>
				</div>

				<div>
					<h2 class="mb-3 text-lg font-medium">Assets</h2>
					<Card class="gap-4 px-6 py-2">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Asset</TableHead>
									<TableHead numeric>Weight</TableHead>
									<TableHead numeric>Target</TableHead>
									<TableHead numeric>Drift</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow v-for="a in assets" :key="a.symbol">
									<TableCell>
										<div class="flex items-center gap-3">
											<Avatar class="size-7">
												<AvatarFallback class="text-[10px]">{{ a.initial }}</AvatarFallback>
											</Avatar>
											<span class="font-mono text-[13px]">{{ a.symbol }}</span>
										</div>
									</TableCell>
									<TableCell numeric class="font-semibold">{{ a.weight }}</TableCell>
									<TableCell numeric class="text-muted-foreground">{{ a.target }}</TableCell>
									<TableCell numeric :trend="a.trend">{{ a.drift }}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
						<AllocationBar class="pb-3" :segments="allocation" />
					</Card>
				</div>
			</div>

			<div class="flex flex-col gap-4">
				<JoinPanel
					
					class="w-full"
					:tabs="joinTabs"
					v-model:tab="side"
					v-model:amount="amount"
					amount-size="lg"
					:max-label="`Max ${maxAmount}`"
					:quick-amounts="quickAmounts"
					:rows="joinRows"
					:join-label="`${side === 'join' ? 'Join' : 'Redeem'} with ${amount || 0} USDC`"
					footnote="Self-custodied · Redeem anytime"
				\************
				/>

				<Card class="gap-3 px-5">
					<h2 class="text-sm font-semibold">Share</h2>
					<div class="flex flex-wrap gap-2">
						<Button v-for="s in shareActions" :key="s" variant="outline" elevation="raised" size="sm">{{ s }}</Button>
					</div>
				</Card>

				<Card class="gap-3 px-5">
					<h2 class="text-sm font-semibold">Created by</h2>
					<div class="flex items-center gap-3">
						<Avatar class="size-9">
							<AvatarFallback class="font-mono text-xs">{{ creator.initial }}</AvatarFallback>
						</Avatar>
						<div>
							<div class="font-mono text-[13px]">{{ creator.address }}</div>
							<div class="text-xs text-muted-foreground">{{ creator.meta }}</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	</div>
</ElevationProvider>
</template>
