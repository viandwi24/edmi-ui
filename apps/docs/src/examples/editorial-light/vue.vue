<script setup lang="ts">
import {
	ArrowUpIcon,
	ArrowUpRightIcon,
	CheckIcon,
	ChevronDownIcon,
	FolderIcon,
	PlusIcon,
	SearchIcon,
	SparklesIcon,
} from "@lucide/vue";
import { Avatar, AvatarFallback } from "@edmi-vue/ui/avatar";
import { Badge } from "@edmi-vue/ui/badge";
import { Button } from "@edmi-vue/ui/button";
import { Card } from "@edmi-vue/ui/card";
import { FeatureRow } from "@edmi-vue/ui/feature-row";
import {
	InsetPanel,
	InsetPanelBody,
	InsetPanelFooter,
	InsetPanelHeader,
} from "@edmi-vue/ui/inset-panel";
import { StatTile } from "@edmi-vue/ui/stat-tile";
import { Tabs, TabsList, TabsTrigger } from "@edmi-vue/ui/tabs";
import {
	chart,
	footer,
	footerSceneArt,
	grassArt,
	grow,
	guide,
	header,
	hero,
	intro,
	joiners,
	joinersFooter,
	launch,
	metrics,
	meterSteps,
	meterZones,
	operate,
	type Pixels,
	pixelRects,
	sky,
	skyArt,
	stages,
	tools,
	toolsArt,
	workspace,
} from "./data";

const wordmark = "font-['Instrument_Serif',Georgia,serif]";
const glass = "border-white/45 bg-white/25 text-white shadow-none hover:bg-white/35";
const wrap = "mx-auto w-full max-w-[1700px] px-5 md:px-10";
const rects = {
	sky: pixelRects(skyArt),
	tools: pixelRects(toolsArt),
	footer: pixelRects(footerSceneArt),
	grass: pixelRects(grassArt),
};
const chapters = guide.chapters.map((c) => ({ ...c, rects: pixelRects(c.art) }));
const vb = (a: Pixels) => `0 0 ${a.w} ${a.h}`;
const meter = (v: number) => ({ value: v, steps: meterSteps, zones: meterZones });
const sections = [
	{ key: "launch", data: launch, cls: "text-[34px] tracking-[-1px] md:text-[40px]" },
	{ key: "grow", data: grow, cls: "text-[34px] tracking-[-1px] md:text-[50px]" },
	{ key: "operate", data: operate, cls: "text-[34px] tracking-[-1px] md:text-[50px]" },
];
const headingCls = "font-normal tracking-[-1.2px] text-foreground-2 dark:text-muted-foreground-2";
</script>

<template>
	<div class="min-h-svh overflow-x-clip bg-background text-foreground">
		<!-- Sky hero -->
		<section
			class="relative isolate min-h-[760px] overflow-hidden text-white md:min-h-[1100px]"
			:style="{ background: sky.gradient }"
		>
			<svg
				:viewBox="vb(skyArt)"
				preserveAspectRatio="xMidYMid slice"
				shape-rendering="crispEdges"
				aria-hidden="true"
				class="absolute inset-0 -z-10 size-full"
			>
				<rect v-for="(r, i) in rects.sky" :key="i" :x="r.x" :y="r.y" :width="r.w" :height="r.h" :fill="r.fill" />
			</svg>
			<div :class="`${wrap} relative z-10 pt-6 pb-24`">
				<div class="flex items-center justify-between gap-4">
					<span :class="`${wordmark} text-[34px] text-white`">Stockbreak</span>
					<div class="flex items-center gap-3">
						<div :class="`hidden h-11 items-center rounded-[10px] border px-2 text-base lg:flex ${glass}`">
							<span class="px-3.5 text-white/70">{{ header.lead }}</span>
							<a v-for="s in header.steps" :key="s.label" :href="s.href" class="px-3.5">{{ s.label }}</a>
						</div>
						<Button
							v-for="l in header.links"
							:key="l.label"
							variant="ghost"
							as-child
							:class="`hidden h-11 px-5 text-base md:inline-flex ${glass}`"
						>
							<a :href="l.href">{{ l.label }}</a>
						</Button>
						<Button elevation="raised" class="h-11 px-[18px] text-base">{{ header.cta }}</Button>
					</div>
				</div>

				<div class="mt-24 max-w-[760px] md:mt-[132px]">
					<h1 class="text-[40px] leading-[1.08] font-normal tracking-[-1.5px] md:text-[68px] md:tracking-[-2px]">
						{{ sky.title }}
					</h1>
					<p class="mt-8 max-w-[640px] text-[17px] leading-normal text-white/90 md:mt-10 md:text-[19px]">
						{{ sky.body }}
					</p>
					<div class="mt-9 flex flex-wrap gap-3.5">
						<Button elevation="raised" size="lg" class="h-14 px-6 text-lg">{{ sky.primary }}</Button>
						<Button variant="ghost" size="lg" :class="`h-14 px-6 text-lg ${glass}`">{{ sky.secondary }}</Button>
					</div>
				</div>

				<div class="absolute top-[330px] right-[8%] hidden flex-col gap-3 lg:flex">
					<div
						v-for="t in sky.tasks"
						:key="t.name"
						class="flex h-[46px] w-[300px] items-center gap-2 rounded-lg border border-emerald-700 bg-emerald-950 px-3.5 text-[13px] whitespace-nowrap text-emerald-100 [transform:perspective(500px)_rotateY(-12deg)]"
					>
						<span class="size-1.5 shrink-0 rounded-full bg-emerald-400" />
						<span class="opacity-80">{{ t.label }}</span>
						<b class="font-semibold text-white">{{ t.name }}</b>
					</div>
				</div>
			</div>
		</section>

		<main :class="`${wrap} flex flex-col gap-28 pt-16 pb-24 md:gap-40 md:pt-24`">
			<!-- Hero workspace -->
			<section class="flex flex-col gap-16">
				<h2 class="text-center text-[34px] leading-[1.12] font-normal tracking-[-1.2px] text-foreground-2 md:text-[60px] md:tracking-[-1.5px] dark:text-muted-foreground-2">
					{{ hero.lead }}<br />
					<span class="text-muted-foreground">{{ hero.muted }}</span>
				</h2>

				<Card
					elevation="floating"
					class="mx-auto w-full max-w-[1420px] gap-0 overflow-hidden rounded-[22px] p-0 lg:h-[780px] lg:flex-row"
				>
					<div class="relative hidden flex-1 overflow-hidden bg-[radial-gradient(var(--border-2)_1px,transparent_1px)] [background-size:14px_14px] md:block">
						<div class="absolute inset-x-0 top-0 z-10 flex h-[68px] items-center justify-between px-5">
							<div class="flex items-center gap-3.5">
								<Badge variant="secondary" class="h-9 gap-2.5 px-3 text-[13px]">
									<span class="inline-flex size-[22px] items-center justify-center rounded-full bg-border font-mono text-[9px]">{{ workspace.initials }}</span>
									{{ workspace.project }}
									<ChevronDownIcon class="size-3" />
								</Badge>
								<span class="font-mono text-[13px] text-muted-foreground">{{ workspace.zoom }}</span>
							</div>
							<div class="flex gap-3.5 text-foreground-2">
								<FolderIcon class="size-4" />
								<SearchIcon class="size-4" />
							</div>
						</div>
						<div
							class="absolute top-0 left-1/2 -translate-x-1/2"
							:style="{ width: `${workspace.stage.w}px`, height: `${workspace.stage.h}px` }"
						>
							<svg :width="workspace.stage.w" :height="workspace.stage.h" viewBox="0 0 960 780" class="absolute inset-0" aria-hidden="true">
								<circle cx="490" cy="390" r="240" fill="none" stroke="var(--border)" stroke-width="1.5" />
								<path
									d="M490 90 V690 M190 390 H790 M317.2 217.2 L662.8 562.8 M662.8 217.2 L317.2 562.8 M317.2 217.2 H227.2 M662.8 217.2 H752.8 M317.2 562.8 H227.2 M662.8 562.8 H752.8"
									fill="none"
									stroke="var(--border)"
									stroke-width="1.5"
									stroke-dasharray="4 5"
								/>
							</svg>
							<div
								v-for="g in workspace.ghosts"
								:key="`${g[0]}-${g[1]}`"
								class="absolute h-[50px] w-[66px] rounded-lg border border-border-2 bg-muted"
								:style="{ left: `${g[0]}px`, top: `${g[1]}px` }"
							/>
							<Card
								v-for="n in workspace.nodes"
								:key="n.label"
								elevation="raised"
								class="absolute h-12 w-[92px] items-center justify-center gap-0 rounded-[10px] p-0 text-sm"
								:style="{ left: `${n.x}px`, top: `${n.y}px` }"
							>
								{{ n.label }}
							</Card>
							<Card
								elevation="raised"
								:class="`${wordmark} absolute h-12 w-[104px] items-center justify-center gap-0 rounded-[10px] p-0 text-[17px]`"
								:style="{ left: `${workspace.center.x}px`, top: `${workspace.center.y}px` }"
							>
								{{ workspace.center.label }}
							</Card>
							<span class="absolute top-[316px] left-[476px] size-7 rounded-full bg-brand shadow-[0_0_0_5px_var(--brand-soft)]" />
							<div
								v-for="c in workspace.chips"
								:key="`${c.x}-${c.y}`"
								class="absolute flex items-center gap-2 rounded-[7px] border border-border bg-card px-2 py-1 text-[11px]"
								:style="{ left: `${c.x}px`, top: `${c.y}px` }"
							>
								<span class="flex items-center gap-1"><span class="size-1.5 rounded-full bg-destructive" />{{ c.a }}</span>
								<span class="flex items-center gap-1"><span class="size-1.5 rounded-full bg-info" />{{ c.b }}</span>
								<span class="flex items-center gap-1"><span class="size-1.5 rounded-full bg-brand" />{{ c.c }}</span>
							</div>
						</div>
						<div class="absolute bottom-4 left-5 flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
							<FolderIcon class="size-3" />
							{{ workspace.path }}
						</div>
					</div>

					<Card elevation="raised" class="m-2 shrink-0 gap-0 overflow-hidden rounded-2xl p-0 lg:w-[436px]">
						<Tabs default-value="Home" class="border-b border-border-2 p-3.5">
							<TabsList class="flex-wrap">
								<TabsTrigger v-for="t in workspace.tabs" :key="t" :value="t">{{ t }}</TabsTrigger>
							</TabsList>
						</Tabs>
						<div class="flex flex-1 flex-col gap-3 overflow-hidden px-4 py-3.5 text-[13.5px] leading-[1.55] text-foreground-2">
							<template v-for="(m, i) in workspace.thread" :key="i">
								<div
									v-if="m.kind === 'user'"
									class="max-w-[300px] self-end rounded-xl border border-border-2 bg-muted px-4 py-3.5 text-foreground"
								>
									{{ m.text }}
								</div>
								<Card
									v-else-if="m.kind === 'task'"
									elevation="raised"
									size="sm"
									class="flex-row items-center gap-2.5 rounded-[10px] px-3.5 py-3 text-[13px]"
								>
									<span class="font-semibold whitespace-nowrap text-foreground">{{ m.name }}</span>
									<span class="min-w-0 flex-1 truncate text-muted-foreground">{{ m.detail }}</span>
									<Badge :variant="m.status === 'Running' ? 'info' : 'secondary'">{{ m.status }}</Badge>
								</Card>
								<div v-else class="flex gap-2.5">
									<SparklesIcon class="mt-1 size-3.5 shrink-0 text-muted-foreground" />
									<p>
										{{ m.text }}<b class="font-semibold text-foreground">{{ m.bold }}</b>{{ m.tail }}
									</p>
								</div>
							</template>
						</div>
						<Card elevation="raised" class="m-3.5 mt-1.5 flex-row items-center gap-2.5 rounded-xl py-2.5 pr-2.5 pl-4">
							<span class="min-w-0 flex-1 truncate text-sm">{{ workspace.prompt }}</span>
							<Button elevation="raised" size="icon" class="size-[30px] rounded-lg" aria-label="Send">
								<ArrowUpIcon class="size-3.5" />
							</Button>
						</Card>
					</Card>
				</Card>

				<div class="mx-auto grid w-full max-w-[1420px] gap-8 md:grid-cols-3 md:gap-12">
					<p v-for="c in hero.columns" :key="c.title" class="text-[17px] leading-[1.45] text-foreground-2 md:text-[19px]">
						<b class="font-semibold text-foreground">{{ c.title }} — </b>{{ c.body }}
					</p>
				</div>
				<div class="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center md:flex-row md:text-left">
					<p class="text-xl leading-snug text-foreground-2">{{ hero.closing }}</p>
					<Button elevation="raised" size="lg" class="h-14 shrink-0 px-6 text-lg">{{ hero.closingCta }}</Button>
				</div>
			</section>

			<!-- What Stockbreak does -->
			<section class="flex flex-col gap-7">
				<div class="font-mono text-[13px] tracking-[2px] text-muted-foreground uppercase">{{ intro.eyebrow }}</div>
				<h2 class="text-[40px] leading-[1.12] font-normal tracking-[-1.4px] md:text-[56px]">
					<span class="text-foreground-2 dark:text-muted-foreground-2">{{ intro.lead }}</span><br />
					<span class="text-muted-foreground">{{ intro.muted }}</span>
				</h2>
				<p class="max-w-[640px] text-[17px] leading-normal text-foreground-2 md:text-[19px]">{{ intro.body }}</p>
			</section>

			<!-- 1.0 Launch -->
			<section class="grid items-start gap-12 lg:grid-cols-[470px_1fr] lg:gap-16">
				<div class="flex flex-col gap-7">
					<div class="font-mono text-[13px] tracking-[2px] text-muted-foreground uppercase">{{ launch.eyebrow }}</div>
					<h2 :class="`leading-[1.15] ${headingCls} ${sections[0]!.cls}`">
						{{ launch.lead }} <span class="text-muted-foreground">{{ launch.muted }}</span>
					</h2>
					<p class="max-w-[520px] text-[17px] leading-relaxed text-foreground-2 md:text-[19px]">{{ launch.body }}</p>
					<div class="flex flex-col gap-2">
						<FeatureRow v-for="r in launch.rows" :key="r.index" elevation="raised" :index="r.index" :title="r.title" />
					</div>
				</div>
				<Card
					elevation="floating"
					class="gap-0 overflow-hidden rounded-[14px] bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:14px_14px] p-0 md:flex-row"
				>
					<div
						v-for="(s, i) in stages"
						:key="s.title"
						:class="`flex min-h-[420px] flex-1 flex-col md:h-[520px] ${i > 0 ? 'border-t-2 border-border md:border-t-0 md:border-l-2' : ''}`"
					>
						<div class="flex justify-between px-4 py-3.5 font-mono text-[11px] text-muted-foreground">
							<span>{{ s.title }}</span>
							<span>{{ s.count }}</span>
						</div>
						<div class="flex flex-1 flex-col gap-3 px-3 pb-6" :style="{ paddingTop: `${Math.max(s.top - 48, 8)}px` }">
							<Card
								v-for="(t, ti) in s.tasks"
								:key="t.name"
								elevation="raised"
								size="sm"
								:class="`h-[54px] flex-row items-center gap-3 rounded-[10px] px-3 py-0 ${'active' in t ? '' : 'opacity-55'} ${s.pinLast && ti === s.tasks.length - 1 ? 'mt-auto' : ''}`"
							>
								<span class="inline-flex size-7 items-center justify-center rounded-[7px] border border-border-2 bg-muted text-foreground-2">
									<SparklesIcon class="size-3.5" />
								</span>
								<div class="min-w-0 flex-1">
									<div class="truncate text-[13px] font-medium">{{ t.name }}</div>
									<div class="truncate text-[11px] text-muted-foreground">{{ t.sub }}</div>
								</div>
								<ArrowUpRightIcon class="size-3 text-muted-foreground" />
							</Card>
						</div>
					</div>
				</Card>
			</section>

			<!-- 2.0 Grow -->
			<section class="grid items-start gap-12 lg:grid-cols-[1fr_520px] lg:gap-16">
				<div class="relative order-2 flex flex-col gap-4 lg:order-1 lg:block lg:h-[480px]">
					<Card
						elevation="floating"
						class="gap-0 rounded-2xl px-[26px] py-[22px] lg:absolute lg:top-[70px] lg:left-0 lg:h-[380px] lg:w-[600px]"
					>
						<div class="mb-3.5 flex items-center gap-3 text-sm">
							<span class="inline-flex size-7 items-center justify-center rounded-lg border border-border-2 bg-muted text-xs font-semibold">{{ grow.email.initials }}</span>
							{{ grow.email.title }}
						</div>
						<div v-for="f in grow.email.fields" :key="f.label" class="flex gap-10 border-t border-border-2 py-3 text-[13px]">
							<span class="w-[60px] text-muted-foreground">{{ f.label }}</span>
							<span class="font-semibold">{{ f.value }}</span>
						</div>
						<p class="mt-4 text-[13px] leading-[1.6] text-foreground-2">{{ grow.email.body }}</p>
					</Card>
					<Card
						elevation="floating"
						class="gap-0 overflow-hidden rounded-2xl p-0 lg:absolute lg:top-0 lg:left-[410px] lg:w-[300px]"
					>
						<div class="flex items-center justify-between border-b border-border-2 px-4 py-3 text-xs">
							{{ grow.report.title }}
							<PlusIcon class="size-3 text-muted-foreground" />
						</div>
						<div class="p-[18px]">
							<div class="text-xs text-muted-foreground">{{ grow.report.label }}</div>
							<div class="flex items-baseline gap-2">
								<span class="text-5xl tracking-[-2px]">{{ grow.report.value }}</span>
								<Badge variant="success">{{ grow.report.delta }}</Badge>
							</div>
							<div class="mt-2 h-[26px] overflow-hidden rounded border border-border-2 bg-muted">
								<div class="h-full bg-brand" :style="{ width: `${grow.report.fill}%` }" />
							</div>
							<div class="mt-2 flex gap-3.5 text-[10px] text-muted-foreground">
								<span class="flex items-center gap-1"><span class="size-1.5 rounded-full bg-brand" />{{ grow.report.legend[0] }}</span>
								<span class="flex items-center gap-1"><span class="size-1.5 rounded-full bg-muted-foreground-2" />{{ grow.report.legend[1] }}</span>
							</div>
							<div v-for="r in grow.report.rows" :key="r.label" class="mt-3 flex items-center justify-between text-xs">
								<span class="text-foreground-2">{{ r.label }}</span>
								<span class="flex items-center gap-1.5">
									<Badge v-if="r.badge" :variant="r.tone === 'destructive' ? 'destructive' : 'success'">{{ r.badge }}</Badge>
									{{ r.value }}
								</span>
							</div>
							<Button variant="secondary" elevation="raised" size="sm" class="mt-4 w-full">{{ grow.report.cta }}</Button>
						</div>
					</Card>
				</div>
				<div class="order-1 lg:order-2">
					<div class="flex flex-col gap-7">
						<div class="font-mono text-[13px] tracking-[2px] text-muted-foreground uppercase">{{ grow.eyebrow }}</div>
						<h2 :class="`leading-[1.15] ${headingCls} ${sections[1]!.cls}`">
							{{ grow.lead }} <span class="text-muted-foreground">{{ grow.muted }}</span>
						</h2>
						<p class="max-w-[520px] text-[17px] leading-relaxed text-foreground-2 md:text-[19px]">{{ grow.body }}</p>
						<div class="flex flex-col gap-2">
							<FeatureRow v-for="r in grow.rows" :key="r.index" elevation="raised" :index="r.index" :title="r.title" />
						</div>
					</div>
				</div>
			</section>

			<!-- 3.0 Operate -->
			<section class="grid items-start gap-12 lg:grid-cols-[500px_1fr] lg:gap-16">
				<div class="flex flex-col gap-7">
					<div class="font-mono text-[13px] tracking-[2px] text-muted-foreground uppercase">{{ operate.eyebrow }}</div>
					<h2 :class="`leading-[1.15] ${headingCls} ${sections[2]!.cls}`">
						{{ operate.lead }} <span class="text-muted-foreground">{{ operate.muted }}</span>
					</h2>
					<p class="max-w-[520px] text-[17px] leading-relaxed text-foreground-2 md:text-[19px]">{{ operate.body }}</p>
					<div class="flex flex-col gap-2">
						<FeatureRow v-for="r in operate.rows" :key="r.index" elevation="raised" :index="r.index" :title="r.title" />
					</div>
				</div>
				<div class="relative flex flex-col gap-4 lg:mt-24 lg:block lg:h-[640px]">
					<Card elevation="floating" class="gap-0 rounded-2xl px-[26px] py-7 lg:w-[760px]">
						<div class="grid gap-8 sm:grid-cols-3">
							<StatTile
								v-for="m in metrics"
								:key="m.label"
								class="w-auto border-0 bg-transparent p-0 shadow-none"
								:label="m.label"
								:value="m.value"
								:delta="m.delta"
								:meter="meter(m.fill)"
							/>
						</div>
						<div class="mt-9 text-[15px]">{{ chart.title }}</div>
						<div class="mt-3.5 flex gap-2.5">
							<div class="flex h-32 flex-col justify-between font-mono text-[10px] text-muted-foreground">
								<span v-for="y in chart.yAxis" :key="y">{{ y }}</span>
							</div>
							<div class="min-w-0 flex-1 lg:max-w-[640px]">
								<svg viewBox="0 0 690 150" class="h-auto w-full overflow-visible" role="img" aria-label="Time series">
									<path :d="chart.grid" fill="none" stroke="var(--border-2)" />
									<path :d="chart.ticks" fill="none" stroke="var(--foreground-2)" stroke-width="1.5" />
									<path v-for="s in chart.series" :key="s.label" :d="s.d" fill="none" :stroke="s.color" stroke-width="2.5" />
								</svg>
								<div class="mt-1 flex justify-between font-mono text-[10px] text-muted-foreground">
									<span v-for="x in chart.xAxis" :key="x">{{ x }}</span>
								</div>
							</div>
						</div>
						<div class="mt-[18px] flex gap-4 text-[13px]">
							<span v-for="s in chart.series" :key="s.label" class="flex items-center gap-1.5">
								<span class="size-2 rounded-full" :style="{ background: s.color }" />
								{{ s.label }}
							</span>
						</div>
					</Card>
					<InsetPanel elevation="floating" class="lg:absolute lg:top-[160px] lg:right-0 lg:w-[380px]">
						<InsetPanelHeader>
							<span class="size-3 rounded-full bg-brand" />
							Live joiners
						</InsetPanelHeader>
						<InsetPanelBody fade class="p-0">
							<div v-for="j in joiners" :key="j.name" class="flex items-center gap-3.5 border-b border-border-2 p-4">
								<Avatar class="size-10">
									<AvatarFallback class="font-mono text-[13px]">{{ j.initials }}</AvatarFallback>
								</Avatar>
								<div class="min-w-0 flex-1">
									<div class="text-[15px] font-semibold">{{ j.name }}</div>
									<div class="text-[13px] text-foreground-2">{{ j.place }}</div>
								</div>
								<Badge variant="info" class="gap-1">
									<CheckIcon class="size-3" />
									Joined
								</Badge>
							</div>
						</InsetPanelBody>
						<InsetPanelFooter class="justify-center text-sm text-foreground-2">
							<b class="font-medium text-foreground">{{ joinersFooter.count }}</b>
							&nbsp;{{ joinersFooter.text }}
						</InsetPanelFooter>
					</InsetPanel>
				</div>
			</section>
		</main>

		<!-- Tools -->
		<section
			class="relative isolate overflow-hidden pt-24 pb-20 text-center text-white md:pt-[190px]"
			:style="{ background: tools.gradient }"
		>
			<svg
				:viewBox="vb(toolsArt)"
				preserveAspectRatio="xMidYMid slice"
				shape-rendering="crispEdges"
				aria-hidden="true"
				class="absolute inset-0 -z-10 size-full"
			>
				<rect v-for="(r, i) in rects.tools" :key="i" :x="r.x" :y="r.y" :width="r.w" :height="r.h" :fill="r.fill" />
			</svg>
			<div :class="wrap">
				<h2 class="text-[34px] leading-[1.15] font-normal tracking-[-1.3px] md:text-[54px]">
					{{ tools.title }}<br />
					<span class="opacity-85">{{ tools.muted }}</span>
				</h2>
				<p class="mx-auto mt-7 max-w-[600px] text-lg leading-[1.55] opacity-90">{{ tools.body }}</p>
				<div class="mt-10 flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-center md:gap-[30px]">
					<div
						v-for="(p, i) in tools.points"
						:key="p"
						:class="`w-[250px] border-l border-white/35 px-5 text-left text-[17px] leading-normal ${i === tools.activePoint ? 'text-white' : 'text-white/60'}`"
					>
						{{ p }}
					</div>
				</div>
				<div class="mx-auto mt-14 max-w-[800px] rounded-[22px] border border-white/60 bg-sky-200/90 p-2.5 md:mt-[150px]">
					<Card elevation="floating" class="relative h-[470px] gap-0 overflow-hidden rounded-[14px] p-0 text-left">
						<Card
							elevation="floating"
							class="absolute top-7 left-1/2 w-[270px] -translate-x-1/2 gap-0 rounded-xl px-[18px] py-4 md:left-[140px] md:translate-x-0"
						>
							<div v-for="(g, gi) in tools.groups" :key="g.status">
								<div v-if="gi > 0" class="my-3 h-px bg-border-2" />
								<Badge :variant="g.tone as 'warning' | 'info' | 'success'" class="font-mono text-[10px]">{{ g.status }}</Badge>
								<div v-for="it in g.items" :key="it.name" class="mt-2.5 flex justify-between text-xs">
									<span>{{ it.name }}</span>
									<span class="text-[9px] text-muted-foreground uppercase">{{ it.agent }}</span>
								</div>
							</div>
						</Card>
						<div class="absolute inset-x-0 bottom-[18px] flex flex-wrap justify-center gap-2.5 px-3">
							<Card
								v-for="d in tools.dock"
								:key="d"
								elevation="raised"
								class="h-10 w-24 items-center justify-center gap-0 rounded-[10px] p-0 text-[13px]"
							>
								{{ d }}
							</Card>
						</div>
					</Card>
				</div>
			</div>
		</section>

		<!-- Guide -->
		<section :class="`${wrap} flex flex-col items-center gap-8 py-24 text-center md:py-[170px]`">
			<h2 class="text-[34px] leading-[1.15] font-normal tracking-[-1.4px] text-foreground-2 md:text-[56px] dark:text-muted-foreground-2">
				{{ guide.title }}
			</h2>
			<p class="max-w-[560px] text-[19px] leading-normal text-foreground-2">{{ guide.body }}</p>
			<Button elevation="raised" size="lg" class="h-[52px] px-[22px] text-[17px]">{{ guide.cta }}</Button>
			<div class="mt-10 grid w-full max-w-[880px] gap-x-10 gap-y-12 text-left sm:grid-cols-2">
				<div v-for="c in chapters" :key="c.n" class="flex flex-col items-center gap-[18px]">
					<Card elevation="floating" class="w-full max-w-[376px] gap-0 rounded-2xl px-[22px] py-6">
						<div class="text-[22px] leading-tight">Chapter {{ c.n }}<br />{{ c.title }}</div>
						<div class="mt-[26px] mb-[18px] h-px bg-border-2" />
						<div class="font-mono text-[10px] text-muted-foreground">Chapter {{ c.numeral }}</div>
						<svg
							:viewBox="vb(c.art)"
							preserveAspectRatio="xMidYMid slice"
							shape-rendering="crispEdges"
							aria-hidden="true"
							class="mt-4 h-[250px] w-full overflow-hidden rounded-md"
						>
							<rect v-for="(r, i) in c.rects" :key="i" :x="r.x" :y="r.y" :width="r.w" :height="r.h" :fill="r.fill" />
						</svg>
						<div class="mt-3 flex justify-between font-mono text-[10px] text-muted-foreground">
							<span>by Stockbreak</span>
							<span>2026</span>
						</div>
					</Card>
					<span class="font-mono text-xs text-muted-foreground">Read this chapter ({{ c.numeral }})</span>
				</div>
			</div>
			<Button variant="secondary" elevation="raised">{{ guide.download }}</Button>
		</section>

		<!-- Footer -->
		<footer class="relative overflow-hidden pt-8 pb-[200px]">
			<div :class="`${wrap} grid items-start gap-14 lg:grid-cols-2 lg:gap-24 xl:px-[200px]`">
				<div class="flex flex-col">
					<h2 class="text-[34px] leading-[1.15] font-normal tracking-[-1px] text-foreground-2 md:text-[46px] dark:text-muted-foreground-2">
						{{ footer.title }}<br />
						<span class="text-muted-foreground">{{ footer.muted }}</span>
					</h2>
					<div class="mt-14 flex flex-wrap gap-4 text-[17px]">
						<span class="text-muted-foreground">{{ header.lead }}</span>
						<a v-for="h in footer.howTo" :key="h" href="#guide">{{ h }}</a>
					</div>
					<div class="mt-8 flex gap-[100px] text-[17px]">
						<div v-for="col in footer.columns" :key="col[0]" class="flex flex-col gap-[18px]">
							<a v-for="l in col" :key="l" href="#top">{{ l }}</a>
						</div>
					</div>
					<div class="mt-6 flex gap-2.5">
						<Button
							v-for="s in footer.socials"
							:key="s"
							variant="secondary"
							elevation="raised"
							size="icon"
							class="size-10 font-semibold"
							:aria-label="s"
						>
							{{ s }}
						</Button>
					</div>
					<div class="mt-9 flex items-center gap-2 text-[13px] text-muted-foreground">
						Built on <Badge variant="secondary">{{ footer.builtOn }}</Badge> {{ footer.network }}
					</div>
					<div class="mt-3 text-[13px] text-muted-foreground-2">{{ footer.copyright }}</div>
				</div>
				<Card elevation="floating" class="mx-auto w-full max-w-[360px] gap-0 rounded-[22px] p-2.5">
					<div class="relative h-[460px] overflow-hidden rounded-[10px]">
						<svg
							:viewBox="vb(footerSceneArt)"
							preserveAspectRatio="xMidYMid slice"
							shape-rendering="crispEdges"
							aria-hidden="true"
							class="absolute inset-0 size-full"
						>
							<rect v-for="(r, i) in rects.footer" :key="i" :x="r.x" :y="r.y" :width="r.w" :height="r.h" :fill="r.fill" />
						</svg>
						<div class="absolute inset-x-2.5 bottom-2.5 rounded-lg bg-emerald-950/80 px-3.5 pt-3.5 pb-4 text-white">
							<div class="text-xl leading-tight">
								{{ footer.card.lead }}<span class="opacity-70">{{ footer.card.muted }}</span>
							</div>
							<Button variant="secondary" elevation="raised" class="mt-3">{{ footer.card.cta }}</Button>
						</div>
					</div>
				</Card>
			</div>
			<div class="absolute inset-x-0 bottom-0 h-[140px]">
				<svg
					:viewBox="vb(grassArt)"
					preserveAspectRatio="xMidYMax slice"
					shape-rendering="crispEdges"
					aria-hidden="true"
					class="absolute inset-0 size-full"
				>
					<rect v-for="(r, i) in rects.grass" :key="i" :x="r.x" :y="r.y" :width="r.w" :height="r.h" :fill="r.fill" />
				</svg>
				<div class="absolute inset-x-0 bottom-5 text-center text-xs text-emerald-950/70">{{ footer.hackathon }}</div>
			</div>
		</footer>
	</div>
</template>
