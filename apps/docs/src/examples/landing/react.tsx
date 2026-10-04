import { AllocationBar } from "@edmi-react/blocks/allocation-bar/allocation-bar";
import { SiteFooter } from "@edmi-react/blocks/footer/footer";
import { JoinPanel } from "@edmi-react/blocks/join-panel/join-panel";
import { PricingPlan } from "@edmi-react/blocks/pricing-plan/pricing-plan";
import {
	SiteHeader,
	SiteHeaderBrand,
} from "@edmi-react/blocks/site-header/site-header";
import {
	StatStrip,
	StatStripItem,
} from "@edmi-react/blocks/stat-tile/stat-tile";
import { StepCard } from "@edmi-react/blocks/step-card/step-card";
import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
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

function SectionTitle({ lead, muted }: { lead: string; muted: string }) {
	return (
		<h2 className="text-[34px] leading-[1.1] font-normal tracking-[-1.2px] md:text-[44px]">
			{lead} <span className="text-muted-foreground">{muted}</span>
		</h2>
	);
}

const arrow = (
	<IconPlaceholder
		lucide="ArrowUpRightIcon"
		tabler="IconArrowUpRight"
		hugeicons="ArrowUpRightIcon"
		phosphor="ArrowUpRightIcon"
		remixicon="RiArrowRightUpLine"
		className="size-3.5"
	/>
);

export default function LandingExample() {
	return (
		<div className="min-h-svh overflow-x-clip bg-background text-foreground">
			<div className="border-b border-border">
				<div className="mx-auto max-w-[1328px] px-4 md:px-10">
					<SiteHeader
						raised
						className="border-0 bg-transparent px-0 shadow-none"
						links={nav}
						action={
							<div className="flex items-center gap-3">
								<Badge variant="outline" className="max-sm:hidden">
									Devnet
								</Badge>
								<Button elevation="raised">Launch app</Button>
							</div>
						}
					/>
				</div>
			</div>

			<main className="mx-auto flex max-w-[1328px] flex-col gap-24 px-4 pt-14 pb-16 md:gap-32 md:px-10 md:pt-20">
				<section className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
					<div className="flex flex-col gap-6">
						<p className="text-sm text-muted-foreground">{hero.eyebrow}</p>
						<h1 className="text-[48px] leading-[1.02] font-medium tracking-[-2.4px] md:text-[68px]">
							{hero.title}
						</h1>
						<p className="max-w-[520px] text-lg text-muted-foreground">
							{hero.lead}
						</p>
						<div className="flex flex-wrap gap-3">
							<Button elevation="raised" size="lg">
								Launch app
								{arrow}
							</Button>
							<Button elevation="raised" variant="outline" size="lg">
								See how it works
							</Button>
						</div>
						<div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
							<span>{hero.facts}</span>
							<span className="flex items-center gap-2 text-muted-foreground-2">
								<span className="size-1.5 rounded-full bg-brand" />
								{hero.disclaimer}
							</span>
						</div>
					</div>

					<div className="relative lg:pb-24">
						<Card elevation="raised" className="gap-5 p-6 lg:mr-10">
							<div className="flex flex-wrap items-center gap-3">
								<span className="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-muted text-brand-text">
									<IconPlaceholder
										lucide="ChartLineIcon"
										tabler="IconChartLine"
										hugeicons="ChartLineData01Icon"
										phosphor="ChartLineUpIcon"
										remixicon="RiLineChartLine"
										className="size-5"
									/>
								</span>
								<div className="min-w-0 flex-1">
									<div className="flex items-baseline gap-2">
										<span className="text-lg font-medium">{index.name}</span>
										<span className="font-mono text-[11px] text-muted-foreground">
											{index.ticker}
										</span>
									</div>
									<div className="text-xs text-muted-foreground">
										{index.creator}
									</div>
								</div>
								<div className="flex gap-1.5">
									{index.tags.map((t) => (
										<Badge key={t} variant="outline">
											{t}
										</Badge>
									))}
								</div>
							</div>
							<div className="flex flex-wrap items-end gap-6">
								<span className="text-[44px] leading-none font-normal tracking-[-1.5px]">
									{index.price}
								</span>
								<div className="flex gap-4 text-xs text-muted-foreground">
									<div className="flex flex-col gap-1">
										24h
										<Badge variant="success" shape="number">
											{index.d24}
										</Badge>
									</div>
									<div className="flex flex-col gap-1">
										7d
										<Badge variant="success" shape="number">
											{index.d7}
										</Badge>
									</div>
								</div>
							</div>
							<div className="flex items-center justify-between text-xs text-muted-foreground">
								<span>{index.benchmark}</span>
								<span className="flex gap-3 font-mono">
									<span className="text-brand-text">— {index.ticker}</span>
									<span>- - SPYx</span>
								</span>
							</div>
							<svg
								viewBox="0 0 400 120"
								className="h-32 w-full text-brand"
								role="img"
								aria-label="Index versus benchmark"
								preserveAspectRatio="none"
							>
								<path
									d={`${index.line} L400 120 L0 120 Z`}
									fill="currentColor"
									opacity="0.1"
								/>
								<path
									d={index.benchmarkLine}
									fill="none"
									stroke="var(--muted-foreground)"
									strokeWidth="1.2"
									strokeDasharray="3 3"
									vectorEffect="non-scaling-stroke"
								/>
								<path
									d={index.line}
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									vectorEffect="non-scaling-stroke"
								/>
							</svg>
							<AllocationBar segments={index.segments} />
						</Card>
						<JoinPanel
							raised
							defaultAmount="1,000"
							rows={joinRows}
							className="mt-4 w-full lg:absolute lg:right-0 lg:bottom-0 lg:mt-0 lg:w-80"
						/>
					</div>
				</section>

				<section className="flex flex-col gap-3">
					<StatStrip elevation="raised">
						{stats.map((s) => (
							<StatStripItem key={s.label} value={s.value} label={s.label} />
						))}
					</StatStrip>
					<p className="text-xs text-muted-foreground-2">{statsNote}</p>
				</section>

				<section id="how" className="flex flex-col gap-12">
					<SectionTitle {...problemTitle} />
					<div className="grid gap-10 md:grid-cols-3">
						{problems.map((p) => (
							<div key={p.index} className="flex flex-col gap-3">
								<span className="font-mono text-xs text-muted-foreground">
									{p.index}
								</span>
								<h3 className="text-xl font-normal tracking-[-0.3px]">
									{p.title}
								</h3>
								<p className="text-[15px] leading-relaxed text-muted-foreground">
									{p.body}
								</p>
							</div>
						))}
					</div>
				</section>

				<section className="flex flex-col gap-10">
					<SectionTitle {...stepsTitle} />
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{steps.map((s) => (
							<StepCard
								key={s.index}
								elevation="raised"
								index={s.index}
								title={s.title}
								description={s.description}
							/>
						))}
					</div>
				</section>

				<section id="pricing" className="flex flex-col gap-10">
					<SectionTitle lead="Simple by design." muted="Fees live on-chain." />
					<div className="grid gap-4 md:grid-cols-3">
						{pricing.map((p) => (
							<PricingPlan
								key={p.name}
								elevation="raised"
								name={p.name}
								tagline={p.tagline}
								price={p.price}
								priceNote={p.note}
								featuresLead={p.lead}
								features={p.features}
								action={
									<Button elevation="raised" variant="outline">
										Launch app
									</Button>
								}
							/>
						))}
					</div>
				</section>

				<Card
					elevation="raised"
					className="flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-12"
				>
					<div className="flex flex-col gap-3">
						<h2 className="text-[34px] leading-tight font-normal tracking-[-1.2px] md:text-[44px]">
							{cta.title}
						</h2>
						<p className="text-muted-foreground">{cta.body}</p>
					</div>
					<div className="flex flex-wrap gap-3">
						<Button elevation="raised" size="lg">
							Launch app
						</Button>
						<Button elevation="raised" variant="outline" size="lg">
							Read the code
						</Button>
					</div>
				</Card>

				<SiteFooter
					elevation="raised"
					brand={<SiteHeaderBrand raised />}
					description={footer.description}
					columns={footer.columns}
					legal={footer.legal}
					note={footer.note}
				/>
			</main>
		</div>
	);
}
