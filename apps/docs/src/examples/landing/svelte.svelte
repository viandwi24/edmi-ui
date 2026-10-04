<script lang="ts">
	import { AllocationBar } from "@edmi-svelte/ui/allocation-bar";
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import { SiteFooter } from "@edmi-svelte/ui/footer";
	import { JoinPanel } from "@edmi-svelte/ui/join-panel";
	import { PricingPlan } from "@edmi-svelte/ui/pricing-plan";
	import { SiteHeader, SiteHeaderBrand } from "@edmi-svelte/ui/site-header";
	import { StatStrip, StatStripItem } from "@edmi-svelte/ui/stat-tile";
	import { StepCard } from "@edmi-svelte/ui/step-card";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import {
		cta,
		footer,
		hero,
		index,
		joinRows,
		nav,
		pricing,
		problems,
		problemTitle,
		stats,
		statsNote,
		steps,
		stepsTitle,
	} from "./data";
</script>

{#snippet action()}
	<div class="flex items-center gap-3">
		<Badge variant="outline" class="max-sm:hidden">Devnet</Badge>
		<Button elevation="raised">Launch app</Button>
	</div>
{/snippet}

{#snippet footerBrand()}
	<SiteHeaderBrand raised />
{/snippet}

{#snippet planAction()}
	<Button elevation="raised" variant="outline">Launch app</Button>
{/snippet}

<div class="min-h-svh overflow-x-clip bg-background text-foreground">
	<div class="border-b border-border">
		<div class="mx-auto max-w-[1328px] px-4 md:px-10">
			<SiteHeader raised class="border-0 bg-transparent px-0 shadow-none" links={nav} {action} />
		</div>
	</div>

	<main class="mx-auto flex max-w-[1328px] flex-col gap-24 px-4 pt-14 pb-16 md:gap-32 md:px-10 md:pt-20">
		<section class="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
			<div class="flex flex-col gap-6">
				<p class="text-sm text-muted-foreground">{hero.eyebrow}</p>
				<h1 class="text-[48px] leading-[1.02] font-medium tracking-[-2.4px] md:text-[68px]">{hero.title}</h1>
				<p class="max-w-[520px] text-lg text-muted-foreground">{hero.lead}</p>
				<div class="flex flex-wrap gap-3">
					<Button elevation="raised" size="lg">
						Launch app
						<IconPlaceholder
							lucide="ArrowUpRightIcon"
							tabler="IconArrowUpRight"
							hugeicons="ArrowUpRightIcon"
							phosphor="ArrowUpRightIcon"
							remixicon="RiArrowRightUpLine"
							class="size-3.5"
						/>
					</Button>
					<Button elevation="raised" variant="outline" size="lg">See how it works</Button>
				</div>
				<div class="flex flex-col gap-1.5 text-xs text-muted-foreground">
					<span>{hero.facts}</span>
					<span class="flex items-center gap-2 text-muted-foreground-2">
						<span class="size-1.5 rounded-full bg-brand"></span>
						{hero.disclaimer}
					</span>
				</div>
			</div>

			<div class="relative lg:pb-24">
				<Card raised class="gap-5 p-6 lg:mr-10">
					<div class="flex flex-wrap items-center gap-3">
						<span class="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-muted text-brand-text">
							<IconPlaceholder
								lucide="ChartLineIcon"
								tabler="IconChartLine"
								hugeicons="ChartLineData01Icon"
								phosphor="ChartLineUpIcon"
								remixicon="RiLineChartLine"
								class="size-5"
							/>
						</span>
						<div class="min-w-0 flex-1">
							<div class="flex items-baseline gap-2">
								<span class="text-lg font-medium">{index.name}</span>
								<span class="font-mono text-[11px] text-muted-foreground">{index.ticker}</span>
							</div>
							<div class="text-xs text-muted-foreground">{index.creator}</div>
						</div>
						<div class="flex gap-1.5">
							{#each index.tags as t (t)}
								<Badge variant="outline">{t}</Badge>
							{/each}
						</div>
					</div>
					<div class="flex flex-wrap items-end gap-6">
						<span class="text-[44px] leading-none font-normal tracking-[-1.5px]">{index.price}</span>
						<div class="flex gap-4 text-xs text-muted-foreground">
							<div class="flex flex-col gap-1">
								24h
								<Badge variant="success" shape="number">{index.d24}</Badge>
							</div>
							<div class="flex flex-col gap-1">
								7d
								<Badge variant="success" shape="number">{index.d7}</Badge>
							</div>
						</div>
					</div>
					<div class="flex items-center justify-between text-xs text-muted-foreground">
						<span>{index.benchmark}</span>
						<span class="flex gap-3 font-mono">
							<span class="text-brand-text">— {index.ticker}</span>
							<span>- - SPYx</span>
						</span>
					</div>
					<svg
						viewBox="0 0 400 120"
						class="h-32 w-full text-brand"
						role="img"
						aria-label="Index versus benchmark"
						preserveAspectRatio="none"
					>
						<path d={`${index.line} L400 120 L0 120 Z`} fill="currentColor" opacity="0.1" />
						<path
							d={index.benchmarkLine}
							fill="none"
							stroke="var(--muted-foreground)"
							stroke-width="1.2"
							stroke-dasharray="3 3"
							vector-effect="non-scaling-stroke"
						/>
						<path
							d={index.line}
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							vector-effect="non-scaling-stroke"
						/>
					</svg>
					<AllocationBar segments={index.segments} />
				</Card>
				<JoinPanel
					raised
					amount="1,000"
					rows={joinRows}
					class="mt-4 w-full lg:absolute lg:right-0 lg:bottom-0 lg:mt-0 lg:w-80"
				/>
			</div>
		</section>

		<section class="flex flex-col gap-3">
			<StatStrip raised>
				{#each stats as s (s.label)}
					<StatStripItem value={s.value} label={s.label} />
				{/each}
			</StatStrip>
			<p class="text-xs text-muted-foreground-2">{statsNote}</p>
		</section>

		<section id="how" class="flex flex-col gap-12">
			<h2 class="text-[34px] leading-[1.1] font-normal tracking-[-1.2px] md:text-[44px]">
				{problemTitle.lead} <span class="text-muted-foreground">{problemTitle.muted}</span>
			</h2>
			<div class="grid gap-10 md:grid-cols-3">
				{#each problems as p (p.index)}
					<div class="flex flex-col gap-3">
						<span class="font-mono text-xs text-muted-foreground">{p.index}</span>
						<h3 class="text-xl font-normal tracking-[-0.3px]">{p.title}</h3>
						<p class="text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
					</div>
				{/each}
			</div>
		</section>

		<section class="flex flex-col gap-10">
			<h2 class="text-[34px] leading-[1.1] font-normal tracking-[-1.2px] md:text-[44px]">
				{stepsTitle.lead} <span class="text-muted-foreground">{stepsTitle.muted}</span>
			</h2>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each steps as s (s.index)}
					<StepCard raised index={s.index} title={s.title} description={s.description} />
				{/each}
			</div>
		</section>

		<section id="pricing" class="flex flex-col gap-10">
			<h2 class="text-[34px] leading-[1.1] font-normal tracking-[-1.2px] md:text-[44px]">
				Simple by design. <span class="text-muted-foreground">Fees live on-chain.</span>
			</h2>
			<div class="grid gap-4 md:grid-cols-3">
				{#each pricing as p (p.name)}
					<PricingPlan
						raised
						name={p.name}
						tagline={p.tagline}
						price={p.price}
						priceNote={p.note}
						featuresLead={p.lead}
						features={p.features}
						action={planAction}
					/>
				{/each}
			</div>
		</section>

		<Card raised class="flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-12">
			<div class="flex flex-col gap-3">
				<h2 class="text-[34px] leading-tight font-normal tracking-[-1.2px] md:text-[44px]">{cta.title}</h2>
				<p class="text-muted-foreground">{cta.body}</p>
			</div>
			<div class="flex flex-wrap gap-3">
				<Button elevation="raised" size="lg">Launch app</Button>
				<Button elevation="raised" variant="outline" size="lg">Read the code</Button>
			</div>
		</Card>

		<SiteFooter
			raised
			brand={footerBrand}
			description={footer.description}
			columns={footer.columns}
			legal={footer.legal}
			note={footer.note}
		/>
	</main>
</div>
