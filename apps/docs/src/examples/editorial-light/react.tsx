import { FeatureRow } from "@edmi-react/blocks/feature-row/feature-row";
import { SiteFooter } from "@edmi-react/blocks/footer/footer";
import { SiteHeader } from "@edmi-react/blocks/site-header/site-header";
import { StatTile } from "@edmi-react/blocks/stat-tile/stat-tile";
import { Avatar, AvatarFallback } from "@edmi-react/ui/avatar";
import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";
import {
	board,
	footer,
	guide,
	header,
	hero,
	intro,
	joiners,
	joinersFooter,
	launch,
	metrics,
	operate,
	type Section,
	workspace,
} from "./data";

function Heading({
	lead,
	muted,
	className = "",
}: {
	lead: string;
	muted?: string;
	className?: string;
}) {
	return (
		<h2
			className={`font-normal tracking-[-1.5px] text-foreground-2 ${className}`}
		>
			{lead}
			{muted ? (
				<>
					<br />
					<span className="text-muted-foreground">{muted}</span>
				</>
			) : null}
		</h2>
	);
}

function Eyebrow({ children }: { children: string }) {
	return (
		<div className="font-mono text-xs tracking-[2px] text-muted-foreground uppercase">
			{children}
		</div>
	);
}

function SectionCopy({ section }: { section: Section }) {
	return (
		<div className="flex flex-col gap-6">
			<Eyebrow>{section.eyebrow}</Eyebrow>
			<Heading
				lead={section.lead}
				muted={section.muted}
				className="text-[34px] leading-[1.1] md:text-[44px]"
			/>
			<p className="text-[15px] leading-relaxed text-muted-foreground">
				{section.body}
			</p>
			<div className="flex flex-col gap-2">
				{section.rows.map((r) => (
					<FeatureRow
						key={r.index}
						elevation="raised"
						index={r.index}
						title={r.title}
					>
						{r.body}
					</FeatureRow>
				))}
			</div>
		</div>
	);
}

export default function EditorialLightExample() {
	return (
		<div className="min-h-svh overflow-x-clip bg-background text-foreground">
			<div className="border-b border-border">
				<div className="mx-auto max-w-[1328px] px-4 md:px-10">
					<SiteHeader
						elevation="raised"
						className="border-0 bg-transparent px-0 shadow-none"
						lead={header.lead}
						steps={header.steps}
						links={header.links}
						action={<Button elevation="raised">{header.cta}</Button>}
					/>
				</div>
			</div>

			<main className="mx-auto flex max-w-[1328px] flex-col gap-28 px-4 pt-14 pb-20 md:gap-36 md:px-10 md:pt-20">
				<section className="flex flex-col gap-14">
					<h1 className="text-center text-[36px] leading-[1.08] font-normal tracking-[-1.8px] text-foreground-2 md:text-[64px]">
						{hero.lead}
						<br />
						<span className="text-muted-foreground">{hero.muted}</span>
					</h1>

					<Card elevation="raised" className="gap-0 p-0 lg:flex-row">
						<div className="relative min-h-72 flex-1 border-b border-border p-5 lg:min-h-[480px] lg:border-r lg:border-b-0">
							<div className="flex items-center gap-3 text-[13px]">
								<Badge variant="secondary" className="h-8 gap-2 px-3">
									<span className="font-mono text-[10px]">SB</span>
									{workspace.project}
								</Badge>
								<span className="font-mono text-xs text-brand-text">
									{workspace.zoom}
								</span>
							</div>
							<div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
								{workspace.nodes.map((n) => (
									<Card
										key={n}
										elevation="raised"
										size="sm"
										className="items-center justify-center px-3 py-2 text-[13px]"
									>
										{n}
									</Card>
								))}
							</div>
							<div className="absolute bottom-4 left-5 font-mono text-[11px] text-muted-foreground">
								{workspace.path}
							</div>
						</div>
						<div className="flex w-full flex-col gap-4 p-4 lg:w-[420px]">
							<Tabs defaultValue="Home">
								<TabsList variant="line" className="flex-wrap">
									{workspace.tabs.map((t) => (
										<TabsTrigger key={t} value={t}>
											{t}
										</TabsTrigger>
									))}
								</TabsList>
							</Tabs>
							<div className="flex flex-col gap-3 text-[13px] leading-relaxed">
								{workspace.thread.map((m) =>
									m.role === "user" ? (
										<div
											key={m.text}
											className="ml-8 rounded-xl border border-border bg-muted px-4 py-3"
										>
											{m.text}
										</div>
									) : (
										<p key={m.text} className="text-muted-foreground">
											{m.text}
										</p>
									),
								)}
								{workspace.tasks.map((t) => (
									<div
										key={t.name}
										className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2"
									>
										<span className="font-medium">{t.name}</span>
										<span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
											{t.detail}
										</span>
										<Badge
											variant={t.tone === "running" ? "brand" : "secondary"}
										>
											{t.status}
										</Badge>
									</div>
								))}
							</div>
							<div className="mt-auto rounded-xl border border-border bg-card px-4 py-3 text-[13px] text-muted-foreground">
								{workspace.prompt}
							</div>
						</div>
					</Card>

					<div className="grid gap-8 md:grid-cols-3">
						{hero.columns.map((c) => (
							<p
								key={c.title}
								className="text-lg leading-snug text-muted-foreground"
							>
								<b className="font-medium text-foreground">{c.title} — </b>
								{c.body}
							</p>
						))}
					</div>
					<div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center md:flex-row md:text-left">
						<p className="text-lg text-muted-foreground">{hero.closing}</p>
						<Button elevation="raised" size="lg" className="shrink-0">
							{hero.closingCta}
						</Button>
					</div>
				</section>

				<section className="flex flex-col gap-8">
					<Eyebrow>{intro.eyebrow}</Eyebrow>
					<Heading
						lead={intro.lead}
						muted={intro.muted}
						className="text-[40px] leading-[1.08] md:text-[56px]"
					/>
					<p className="max-w-xl text-[17px] leading-relaxed text-muted-foreground">
						{intro.body}
					</p>
				</section>

				<section
					id="launch"
					className="grid items-start gap-12 lg:grid-cols-[480px_1fr]"
				>
					<SectionCopy section={launch} />
					<Card elevation="raised" className="gap-0 p-0 md:flex-row">
						{board.map((col) => (
							<div
								key={col.title}
								className="flex flex-1 flex-col gap-3 border-b border-border p-4 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0"
							>
								<div className="flex justify-between font-mono text-[11px] text-muted-foreground">
									<span>{col.title}</span>
									<span>{col.count}</span>
								</div>
								{col.cards.map((c) => (
									<Card
										key={c.name}
										elevation="raised"
										size="sm"
										className="gap-0 px-3 py-2.5"
									>
										<div className="text-[13px]">{c.name}</div>
										<div className="text-[11px] text-muted-foreground">
											{c.sub}
										</div>
									</Card>
								))}
							</div>
						))}
					</Card>
				</section>

				<section
					id="operate"
					className="grid items-start gap-12 lg:grid-cols-[480px_1fr]"
				>
					<SectionCopy section={operate} />
					<div className="relative flex flex-col gap-4 lg:pb-32">
						<Card elevation="raised" className="gap-4 p-5 lg:mr-24">
							<div className="grid gap-4 sm:grid-cols-3">
								{metrics.map((m) => (
									<StatTile
										key={m.label}
										className="w-auto border-0 bg-transparent p-0 shadow-none"
										label={m.label}
										value={m.value}
										delta={m.delta}
										meter={{ value: m.fill }}
									/>
								))}
							</div>
						</Card>
						<Card
							elevation="raised"
							className="gap-0 overflow-hidden p-0 lg:absolute lg:right-0 lg:bottom-0 lg:w-[360px]"
						>
							<div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-2.5 text-[13px]">
								<span className="size-2 rounded-full bg-brand" />
								Live joiners
							</div>
							{joiners.map((j) => (
								<div
									key={j.name}
									className="flex items-center gap-3 border-b border-border-2 px-4 py-2.5"
								>
									<Avatar>
										<AvatarFallback className="font-mono text-xs">
											{j.initials}
										</AvatarFallback>
									</Avatar>
									<div className="min-w-0 flex-1">
										<div className="text-[13px] font-medium">{j.name}</div>
										<div className="text-xs text-muted-foreground">
											{j.place}
										</div>
									</div>
									<Badge variant="brand">Joined</Badge>
								</div>
							))}
							<div className="bg-muted px-4 py-3 text-center text-xs text-muted-foreground">
								<b className="font-medium text-foreground">
									{joinersFooter.count}
								</b>{" "}
								{joinersFooter.text}
							</div>
						</Card>
					</div>
				</section>

				<section className="flex flex-col items-center gap-8">
					<Heading
						lead={guide.title}
						className="text-center text-[34px] leading-[1.1] md:text-[52px]"
					/>
					<p className="max-w-md text-center text-muted-foreground">
						{guide.body}
					</p>
					<Button elevation="raised" size="lg">
						{guide.cta}
					</Button>
					<div className="grid w-full max-w-[780px] gap-8 sm:grid-cols-2">
						{guide.chapters.map((c) => (
							<div key={c.n} className="flex flex-col gap-3">
								<Card elevation="raised" className="gap-4 p-5">
									<div className="text-xl leading-snug">
										Chapter {c.n}
										<br />
										{c.title}
									</div>
									<div className="border-t border-border pt-3 font-mono text-[10px] text-muted-foreground">
										Chapter {c.numeral}
									</div>
									<div className={`h-44 rounded-md ${c.tone}`} />
									<div className="flex justify-between font-mono text-[10px] text-muted-foreground">
										<span>by Stockbreak</span>
										<span>2026</span>
									</div>
								</Card>
								<span className="text-center font-mono text-[11px] text-muted-foreground">
									Read this chapter ({c.numeral})
								</span>
							</div>
						))}
					</div>
					<Button elevation="raised" variant="outline">
						{guide.download}
					</Button>
				</section>

				<section className="flex flex-col gap-10">
					<Heading
						lead={footer.title}
						muted={footer.muted}
						className="text-[34px] leading-[1.1] md:text-[44px]"
					/>
					<div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
						<span className="text-muted-foreground">How to</span>
						{footer.howTo.map((h) => (
							<a key={h} href="#guide" className="hover:text-muted-foreground">
								{h}
							</a>
						))}
					</div>
					<Card elevation="raised" className="max-w-md gap-4 p-5">
						<div className="h-40 rounded-md bg-chart-2" />
						<p className="text-[15px]">{footer.card.text}</p>
						<Button
							elevation="raised"
							size="sm"
							variant="outline"
							className="w-fit"
						>
							{footer.card.cta}
						</Button>
					</Card>
					<SiteFooter
						elevation="raised"
						columns={footer.columns}
						legal={footer.legal}
						note={footer.note}
					/>
				</section>
			</main>
		</div>
	);
}
