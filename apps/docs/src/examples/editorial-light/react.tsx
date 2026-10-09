import { FeatureRow } from "@edmi-react/blocks/feature-row/feature-row";
import { StatTile } from "@edmi-react/blocks/stat-tile/stat-tile";
import { Avatar, AvatarFallback } from "@edmi-react/ui/avatar";
import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import {
	InsetPanel,
	InsetPanelBody,
	InsetPanelFooter,
	InsetPanelHeader,
} from "@edmi-react/ui/inset-panel";
import { Tabs, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
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
	meterSteps,
	meterZones,
	metrics,
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
const glass =
	"border-white/45 bg-white/25 text-white shadow-none hover:bg-white/35";

function Scene({
	art,
	className,
	fit = "xMidYMid slice",
}: {
	art: Pixels;
	className?: string;
	fit?: string;
}) {
	return (
		<svg
			viewBox={`0 0 ${art.w} ${art.h}`}
			preserveAspectRatio={fit}
			shapeRendering="crispEdges"
			aria-hidden="true"
			className={className}
		>
			{pixelRects(art).map((r, i) => (
				<rect
					// biome-ignore lint/suspicious/noArrayIndexKey: static pixel list
					key={i}
					x={r.x}
					y={r.y}
					width={r.w}
					height={r.h}
					fill={r.fill}
				/>
			))}
		</svg>
	);
}

function Eyebrow({ children }: { children: string }) {
	return (
		<div className="font-mono text-[13px] tracking-[2px] text-muted-foreground uppercase">
			{children}
		</div>
	);
}

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
			className={`font-normal tracking-[-1.2px] text-foreground-2 dark:text-muted-foreground-2 ${className}`}
		>
			{lead}
			{muted ? (
				<>
					{" "}
					<span className="text-muted-foreground">{muted}</span>
				</>
			) : null}
		</h2>
	);
}

function Rows({ rows }: { rows: { index: string; title: string }[] }) {
	return (
		<div className="flex flex-col gap-2">
			{rows.map((r) => (
				<FeatureRow
					key={r.index}
					elevation="raised"
					index={r.index}
					title={r.title}
				/>
			))}
		</div>
	);
}

function Copy({
	eyebrow,
	lead,
	muted,
	body,
	rows,
	className = "",
}: {
	eyebrow: string;
	lead: string;
	muted: string;
	body: string;
	rows: { index: string; title: string }[];
	className?: string;
}) {
	return (
		<div className="flex flex-col gap-7">
			<Eyebrow>{eyebrow}</Eyebrow>
			<Heading
				lead={lead}
				muted={muted}
				className={`leading-[1.15] ${className}`}
			/>
			<p className="max-w-[520px] text-[17px] leading-relaxed text-foreground-2 md:text-[19px]">
				{body}
			</p>
			<Rows rows={rows} />
		</div>
	);
}

const wrap = "mx-auto w-full max-w-[1700px] px-5 md:px-10";

export default function EditorialLongExample() {
	return (
		<div className="min-h-svh overflow-x-clip bg-background text-foreground">
			{/* Sky hero */}
			<section
				className="relative isolate min-h-[760px] overflow-hidden text-white md:min-h-[1100px]"
				style={{ background: sky.gradient }}
			>
				<Scene art={skyArt} className="absolute inset-0 -z-10 size-full" />
				<div className={`${wrap} relative z-10 pt-6 pb-24`}>
					<div className="flex items-center justify-between gap-4">
						<span className={`${wordmark} text-[34px] text-white`}>
							Stockbreak
						</span>
						<div className="flex items-center gap-3">
							<div
								className={`hidden h-11 items-center rounded-[10px] border px-2 text-base lg:flex ${glass}`}
							>
								<span className="px-3.5 text-white/70">{header.lead}</span>
								{header.steps.map((s) => (
									<a key={s.label} href={s.href} className="px-3.5">
										{s.label}
									</a>
								))}
							</div>
							{header.links.map((l) => (
								<Button
									key={l.label}
									variant="ghost"
									className={`hidden h-11 px-5 text-base md:inline-flex ${glass}`}
									nativeButton={false}
									render={<a href={l.href} />}
								>
									{l.label}
								</Button>
							))}
							<Button elevation="raised" className="h-11 px-[18px] text-base">
								{header.cta}
							</Button>
						</div>
					</div>

					<div className="mt-24 max-w-[760px] md:mt-[132px]">
						<h1 className="text-[40px] leading-[1.08] font-normal tracking-[-1.5px] md:text-[68px] md:tracking-[-2px]">
							{sky.title}
						</h1>
						<p className="mt-8 max-w-[640px] text-[17px] leading-normal text-white/90 md:mt-10 md:text-[19px]">
							{sky.body}
						</p>
						<div className="mt-9 flex flex-wrap gap-3.5">
							<Button
								elevation="raised"
								size="lg"
								className="h-14 px-6 text-lg"
							>
								{sky.primary}
							</Button>
							<Button
								variant="ghost"
								size="lg"
								className={`h-14 px-6 text-lg ${glass}`}
							>
								{sky.secondary}
							</Button>
						</div>
					</div>

					<div className="absolute top-[330px] right-[8%] hidden flex-col gap-3 lg:flex">
						{sky.tasks.map((t) => (
							<div
								key={t.name}
								className="flex h-[46px] w-[300px] items-center gap-2 rounded-lg border border-emerald-700 bg-emerald-950 px-3.5 text-[13px] whitespace-nowrap text-emerald-100 [transform:perspective(500px)_rotateY(-12deg)]"
							>
								<span className="size-1.5 shrink-0 rounded-full bg-emerald-400" />
								<span className="opacity-80">{t.label}</span>
								<b className="font-semibold text-white">{t.name}</b>
							</div>
						))}
					</div>
				</div>
			</section>

			<main
				className={`${wrap} flex flex-col gap-28 pt-16 pb-24 md:gap-40 md:pt-24`}
			>
				{/* Hero workspace */}
				<section className="flex flex-col gap-16">
					<h2 className="text-center text-[34px] leading-[1.12] font-normal tracking-[-1.2px] text-foreground-2 md:text-[60px] md:tracking-[-1.5px] dark:text-muted-foreground-2">
						{hero.lead}
						<br />
						<span className="text-muted-foreground">{hero.muted}</span>
					</h2>

					<Card
						elevation="floating"
						className="mx-auto w-full max-w-[1420px] gap-0 overflow-hidden rounded-[22px] p-0 lg:h-[780px] lg:flex-row"
					>
						<div className="relative hidden flex-1 overflow-hidden bg-[radial-gradient(var(--border-2)_1px,transparent_1px)] [background-size:14px_14px] md:block">
							<div className="absolute inset-x-0 top-0 z-10 flex h-[68px] items-center justify-between px-5">
								<div className="flex items-center gap-3.5">
									<Badge
										variant="secondary"
										className="h-9 gap-2.5 px-3 text-[13px]"
									>
										<span className="inline-flex size-[22px] items-center justify-center rounded-full bg-border font-mono text-[9px]">
											{workspace.initials}
										</span>
										{workspace.project}
										<IconPlaceholder
											lucide="ChevronDownIcon"
											tabler="IconChevronDown"
											hugeicons="ArrowDown01Icon"
											phosphor="CaretDownIcon"
											remixicon="RiArrowDownSLine"
											className="size-3"
										/>
									</Badge>
									<span className="font-mono text-[13px] text-muted-foreground">
										{workspace.zoom}
									</span>
								</div>
								<div className="flex gap-3.5 text-foreground-2">
									<IconPlaceholder
										lucide="FolderIcon"
										tabler="IconFolder"
										hugeicons="Folder01Icon"
										phosphor="FolderIcon"
										remixicon="RiFolderLine"
										className="size-4"
									/>
									<IconPlaceholder
										lucide="SearchIcon"
										tabler="IconSearch"
										hugeicons="SearchIcon"
										phosphor="MagnifyingGlassIcon"
										remixicon="RiSearchLine"
										className="size-4"
									/>
								</div>
							</div>
							<div
								className="absolute top-0 left-1/2 -translate-x-1/2"
								style={{ width: workspace.stage.w, height: workspace.stage.h }}
							>
								<svg
									width={workspace.stage.w}
									height={workspace.stage.h}
									viewBox="0 0 960 780"
									className="absolute inset-0"
									aria-hidden="true"
								>
									<circle
										cx="490"
										cy="390"
										r="240"
										fill="none"
										stroke="var(--border)"
										strokeWidth="1.5"
									/>
									<path
										d="M490 90 V690 M190 390 H790 M317.2 217.2 L662.8 562.8 M662.8 217.2 L317.2 562.8 M317.2 217.2 H227.2 M662.8 217.2 H752.8 M317.2 562.8 H227.2 M662.8 562.8 H752.8"
										fill="none"
										stroke="var(--border)"
										strokeWidth="1.5"
										strokeDasharray="4 5"
									/>
								</svg>
								{workspace.ghosts.map(([x, y]) => (
									<div
										key={`${x}-${y}`}
										className="absolute h-[50px] w-[66px] rounded-lg border border-border-2 bg-muted"
										style={{ left: x, top: y }}
									/>
								))}
								{workspace.nodes.map((n) => (
									<Card
										key={n.label}
										elevation="raised"
										className="absolute h-12 w-[92px] items-center justify-center gap-0 rounded-[10px] p-0 text-sm"
										style={{ left: n.x, top: n.y }}
									>
										{n.label}
									</Card>
								))}
								<Card
									elevation="raised"
									className={`${wordmark} absolute h-12 w-[104px] items-center justify-center gap-0 rounded-[10px] p-0 text-[17px]`}
									style={{ left: workspace.center.x, top: workspace.center.y }}
								>
									{workspace.center.label}
								</Card>
								<span className="absolute top-[316px] left-[476px] size-7 rounded-full bg-brand shadow-[0_0_0_5px_var(--brand-soft)]" />
								{workspace.chips.map((c) => (
									<div
										key={`${c.x}-${c.y}`}
										className="absolute flex items-center gap-2 rounded-[7px] border border-border bg-card px-2 py-1 text-[11px]"
										style={{ left: c.x, top: c.y }}
									>
										<span className="flex items-center gap-1">
											<span className="size-1.5 rounded-full bg-destructive" />
											{c.a}
										</span>
										<span className="flex items-center gap-1">
											<span className="size-1.5 rounded-full bg-info" />
											{c.b}
										</span>
										<span className="flex items-center gap-1">
											<span className="size-1.5 rounded-full bg-brand" />
											{c.c}
										</span>
									</div>
								))}
							</div>
							<div className="absolute bottom-4 left-5 flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
								<IconPlaceholder
									lucide="FolderIcon"
									tabler="IconFolder"
									hugeicons="Folder01Icon"
									phosphor="FolderIcon"
									remixicon="RiFolderLine"
									className="size-3"
								/>
								{workspace.path}
							</div>
						</div>

						<Card
							elevation="raised"
							className="m-2 shrink-0 gap-0 overflow-hidden rounded-2xl p-0 lg:w-[436px]"
						>
							<Tabs
								defaultValue="Home"
								className="border-b border-border-2 p-3.5"
							>
								<TabsList className="flex-wrap">
									{workspace.tabs.map((t) => (
										<TabsTrigger key={t} value={t}>
											{t}
										</TabsTrigger>
									))}
								</TabsList>
							</Tabs>
							<div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 py-3.5 text-[13.5px] leading-[1.55] text-foreground-2">
								{workspace.thread.map((m) => {
									if (m.kind === "user") {
										return (
											<div
												key={m.text}
												className="max-w-[300px] self-end rounded-xl border border-border-2 bg-muted px-4 py-3.5 text-foreground"
											>
												{m.text}
											</div>
										);
									}
									if (m.kind === "task") {
										return (
											<Card
												key={m.name}
												elevation="raised"
												size="sm"
												className="flex-row items-center gap-2.5 rounded-[10px] px-3.5 py-3 text-[13px]"
											>
												<span className="font-semibold whitespace-nowrap text-foreground">
													{m.name}
												</span>
												<span className="min-w-0 flex-1 truncate text-muted-foreground">
													{m.detail}
												</span>
												<Badge
													variant={
														m.status === "Running" ? "info" : "secondary"
													}
												>
													{m.status}
												</Badge>
											</Card>
										);
									}
									return (
										<div key={m.text} className="flex gap-2.5">
											<IconPlaceholder
												lucide="SparklesIcon"
												tabler="IconSparkles"
												hugeicons="SparklesIcon"
												phosphor="SparkleIcon"
												remixicon="RiSparklingLine"
												className="mt-1 size-3.5 shrink-0 text-muted-foreground"
											/>
											<p>
												{m.text}
												<b className="font-semibold text-foreground">
													{m.bold}
												</b>
												{m.tail}
											</p>
										</div>
									);
								})}
							</div>
							<Card
								elevation="raised"
								className="m-3.5 mt-1.5 flex-row items-center gap-2.5 rounded-xl py-2.5 pr-2.5 pl-4"
							>
								<span className="min-w-0 flex-1 truncate text-sm">
									{workspace.prompt}
								</span>
								<Button
									elevation="raised"
									size="icon"
									className="size-[30px] rounded-lg"
									aria-label="Send"
								>
									<IconPlaceholder
										lucide="ArrowUpIcon"
										tabler="IconArrowUp"
										hugeicons="ArrowUp02Icon"
										phosphor="ArrowUpIcon"
										remixicon="RiArrowUpLine"
										className="size-3.5"
									/>
								</Button>
							</Card>
						</Card>
					</Card>

					<div className="mx-auto grid w-full max-w-[1420px] gap-8 md:grid-cols-3 md:gap-12">
						{hero.columns.map((c) => (
							<p
								key={c.title}
								className="text-[17px] leading-[1.45] text-foreground-2 md:text-[19px]"
							>
								<b className="font-semibold text-foreground">{c.title} — </b>
								{c.body}
							</p>
						))}
					</div>
					<div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center md:flex-row md:text-left">
						<p className="text-xl leading-snug text-foreground-2">
							{hero.closing}
						</p>
						<Button
							elevation="raised"
							size="lg"
							className="h-14 shrink-0 px-6 text-lg"
						>
							{hero.closingCta}
						</Button>
					</div>
				</section>

				{/* What Stockbreak does */}
				<section className="flex flex-col gap-7">
					<Eyebrow>{intro.eyebrow}</Eyebrow>
					<h2 className="text-[40px] leading-[1.12] font-normal tracking-[-1.4px] md:text-[56px]">
						<span className="text-foreground-2 dark:text-muted-foreground-2">
							{intro.lead}
						</span>
						<br />
						<span className="text-muted-foreground">{intro.muted}</span>
					</h2>
					<p className="max-w-[640px] text-[17px] leading-normal text-foreground-2 md:text-[19px]">
						{intro.body}
					</p>
				</section>

				{/* 1.0 Launch */}
				<section className="grid items-start gap-12 lg:grid-cols-[470px_1fr] lg:gap-16">
					<Copy
						{...launch}
						className="text-[34px] tracking-[-1px] md:text-[40px]"
					/>
					<Card
						elevation="floating"
						className="gap-0 overflow-hidden rounded-[14px] bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:14px_14px] p-0 md:flex-row"
					>
						{stages.map((s, i) => (
							<div
								key={s.title}
								className={`flex min-h-[420px] flex-1 flex-col md:h-[520px] ${i > 0 ? "border-t-2 border-border md:border-t-0 md:border-l-2" : ""}`}
							>
								<div className="flex justify-between px-4 py-3.5 font-mono text-[11px] text-muted-foreground">
									<span>{s.title}</span>
									<span>{s.count}</span>
								</div>
								<div
									className="flex flex-1 flex-col gap-3 px-3 pb-6"
									style={{ paddingTop: Math.max(s.top - 48, 8) }}
								>
									{s.tasks.map((t, ti) => (
										<Card
											key={t.name}
											elevation="raised"
											size="sm"
											className={`h-[54px] flex-row items-center gap-3 rounded-[10px] px-3 py-0 ${"active" in t ? "" : "opacity-55"} ${s.pinLast && ti === s.tasks.length - 1 ? "mt-auto" : ""}`}
										>
											<span className="inline-flex size-7 items-center justify-center rounded-[7px] border border-border-2 bg-muted text-foreground-2">
												<IconPlaceholder
													lucide="SparklesIcon"
													tabler="IconSparkles"
													hugeicons="SparklesIcon"
													phosphor="SparkleIcon"
													remixicon="RiSparklingLine"
													className="size-3.5"
												/>
											</span>
											<div className="min-w-0 flex-1">
												<div className="truncate text-[13px] font-medium">
													{t.name}
												</div>
												<div className="truncate text-[11px] text-muted-foreground">
													{t.sub}
												</div>
											</div>
											<IconPlaceholder
												lucide="ArrowUpRightIcon"
												tabler="IconArrowUpRight"
												hugeicons="ArrowUpRight01Icon"
												phosphor="ArrowUpRightIcon"
												remixicon="RiArrowRightUpLine"
												className="size-3 text-muted-foreground"
											/>
										</Card>
									))}
								</div>
							</div>
						))}
					</Card>
				</section>

				{/* 2.0 Grow */}
				<section className="grid items-start gap-12 lg:grid-cols-[1fr_520px] lg:gap-16">
					<div className="relative order-2 flex flex-col gap-4 lg:order-1 lg:block lg:h-[480px]">
						<Card
							elevation="floating"
							className="gap-0 rounded-2xl px-[26px] py-[22px] lg:absolute lg:top-[70px] lg:left-0 lg:h-[380px] lg:w-[600px]"
						>
							<div className="mb-3.5 flex items-center gap-3 text-sm">
								<span className="inline-flex size-7 items-center justify-center rounded-lg border border-border-2 bg-muted text-xs font-semibold">
									{grow.email.initials}
								</span>
								{grow.email.title}
							</div>
							{grow.email.fields.map((f) => (
								<div
									key={f.label}
									className="flex gap-10 border-t border-border-2 py-3 text-[13px]"
								>
									<span className="w-[60px] text-muted-foreground">
										{f.label}
									</span>
									<span className="font-semibold">{f.value}</span>
								</div>
							))}
							<p className="mt-4 text-[13px] leading-[1.6] text-foreground-2">
								{grow.email.body}
							</p>
						</Card>
						<Card
							elevation="floating"
							className="gap-0 overflow-hidden rounded-2xl p-0 lg:absolute lg:top-0 lg:left-[410px] lg:w-[300px]"
						>
							<div className="flex items-center justify-between border-b border-border-2 px-4 py-3 text-xs">
								{grow.report.title}
								<IconPlaceholder
									lucide="PlusIcon"
									tabler="IconPlus"
									hugeicons="Add01Icon"
									phosphor="PlusIcon"
									remixicon="RiAddLine"
									className="size-3 text-muted-foreground"
								/>
							</div>
							<div className="p-[18px]">
								<div className="text-xs text-muted-foreground">
									{grow.report.label}
								</div>
								<div className="flex items-baseline gap-2">
									<span className="text-5xl tracking-[-2px]">
										{grow.report.value}
									</span>
									<Badge variant="success">{grow.report.delta}</Badge>
								</div>
								<div className="mt-2 h-[26px] overflow-hidden rounded border border-border-2 bg-muted">
									<div
										className="h-full bg-brand"
										style={{ width: `${grow.report.fill}%` }}
									/>
								</div>
								<div className="mt-2 flex gap-3.5 text-[10px] text-muted-foreground">
									<span className="flex items-center gap-1">
										<span className="size-1.5 rounded-full bg-brand" />
										{grow.report.legend[0]}
									</span>
									<span className="flex items-center gap-1">
										<span className="size-1.5 rounded-full bg-muted-foreground-2" />
										{grow.report.legend[1]}
									</span>
								</div>
								{grow.report.rows.map((r) => (
									<div
										key={r.label}
										className="mt-3 flex items-center justify-between text-xs"
									>
										<span className="text-foreground-2">{r.label}</span>
										<span className="flex items-center gap-1.5">
											{r.badge ? (
												<Badge
													variant={
														r.tone === "destructive" ? "destructive" : "success"
													}
												>
													{r.badge}
												</Badge>
											) : null}
											{r.value}
										</span>
									</div>
								))}
								<Button
									variant="secondary"
									elevation="raised"
									size="sm"
									className="mt-4 w-full"
								>
									{grow.report.cta}
								</Button>
							</div>
						</Card>
					</div>
					<div className="order-1 lg:order-2">
						<Copy
							{...grow}
							className="text-[34px] tracking-[-1px] md:text-[50px]"
						/>
					</div>
				</section>

				{/* 3.0 Operate */}
				<section className="grid items-start gap-12 lg:grid-cols-[500px_1fr] lg:gap-16">
					<Copy
						{...operate}
						className="text-[34px] tracking-[-1px] md:text-[50px]"
					/>
					<div className="relative flex flex-col gap-4 lg:mt-24 lg:block lg:h-[640px]">
						<Card
							elevation="floating"
							className="gap-0 rounded-2xl px-[26px] py-7 lg:w-[760px]"
						>
							<div className="grid gap-8 sm:grid-cols-3">
								{metrics.map((m) => (
									<StatTile
										key={m.label}
										className="w-auto border-0 bg-transparent p-0 shadow-none"
										label={m.label}
										value={m.value}
										delta={m.delta}
										meter={{
											value: m.fill,
											steps: meterSteps,
											zones: meterZones,
										}}
									/>
								))}
							</div>
							<div className="mt-9 text-[15px]">{chart.title}</div>
							<div className="mt-3.5 flex gap-2.5">
								<div className="flex h-32 flex-col justify-between font-mono text-[10px] text-muted-foreground">
									{chart.yAxis.map((y) => (
										<span key={y}>{y}</span>
									))}
								</div>
								<div className="min-w-0 flex-1 lg:max-w-[640px]">
									<svg
										viewBox="0 0 690 150"
										className="h-auto w-full overflow-visible"
										role="img"
										aria-label="Time series"
									>
										<path d={chart.grid} fill="none" stroke="var(--border-2)" />
										<path
											d={chart.ticks}
											fill="none"
											stroke="var(--foreground-2)"
											strokeWidth="1.5"
										/>
										{chart.series.map((s) => (
											<path
												key={s.label}
												d={s.d}
												fill="none"
												stroke={s.color}
												strokeWidth="2.5"
											/>
										))}
									</svg>
									<div className="mt-1 flex justify-between font-mono text-[10px] text-muted-foreground">
										{chart.xAxis.map((x) => (
											<span key={x}>{x}</span>
										))}
									</div>
								</div>
							</div>
							<div className="mt-[18px] flex gap-4 text-[13px]">
								{chart.series.map((s) => (
									<span key={s.label} className="flex items-center gap-1.5">
										<span
											className="size-2 rounded-full"
											style={{ background: s.color }}
										/>
										{s.label}
									</span>
								))}
							</div>
						</Card>
						<InsetPanel
							elevation="floating"
							className="lg:absolute lg:top-[160px] lg:right-0 lg:w-[380px]"
						>
							<InsetPanelHeader>
								<span className="size-3 rounded-full bg-brand" />
								Live joiners
							</InsetPanelHeader>
							<InsetPanelBody fade className="p-0">
								{joiners.map((j) => (
									<div
										key={j.name}
										className="flex items-center gap-3.5 border-b border-border-2 p-4"
									>
										<Avatar className="size-10">
											<AvatarFallback className="font-mono text-[13px]">
												{j.initials}
											</AvatarFallback>
										</Avatar>
										<div className="min-w-0 flex-1">
											<div className="text-[15px] font-semibold">{j.name}</div>
											<div className="text-[13px] text-foreground-2">
												{j.place}
											</div>
										</div>
										<Badge variant="info" className="gap-1">
											<IconPlaceholder
												lucide="CheckIcon"
												tabler="IconCheck"
												hugeicons="Tick02Icon"
												phosphor="CheckIcon"
												remixicon="RiCheckLine"
												className="size-3"
											/>
											Joined
										</Badge>
									</div>
								))}
							</InsetPanelBody>
							<InsetPanelFooter className="justify-center text-sm text-foreground-2">
								<b className="font-medium text-foreground">
									{joinersFooter.count}
								</b>
								&nbsp;{joinersFooter.text}
							</InsetPanelFooter>
						</InsetPanel>
					</div>
				</section>
			</main>

			{/* Tools */}
			<section
				className="relative isolate overflow-hidden pt-24 pb-20 text-center text-white md:pt-[190px]"
				style={{ background: tools.gradient }}
			>
				<Scene art={toolsArt} className="absolute inset-0 -z-10 size-full" />
				<div className={wrap}>
					<h2 className="text-[34px] leading-[1.15] font-normal tracking-[-1.3px] md:text-[54px]">
						{tools.title}
						<br />
						<span className="opacity-85">{tools.muted}</span>
					</h2>
					<p className="mx-auto mt-7 max-w-[600px] text-lg leading-[1.55] opacity-90">
						{tools.body}
					</p>
					<div className="mt-10 flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-center md:gap-[30px]">
						{tools.points.map((p, i) => (
							<div
								key={p}
								className={`w-[250px] border-l border-white/35 px-5 text-left text-[17px] leading-normal ${i === tools.activePoint ? "text-white" : "text-white/60"}`}
							>
								{p}
							</div>
						))}
					</div>
					<div className="mx-auto mt-14 max-w-[800px] rounded-[22px] border border-white/60 bg-sky-200/90 p-2.5 md:mt-[150px]">
						<Card
							elevation="floating"
							className="relative h-[470px] gap-0 overflow-hidden rounded-[14px] p-0 text-left"
						>
							<Card
								elevation="floating"
								className="absolute top-7 left-1/2 w-[270px] -translate-x-1/2 gap-0 rounded-xl px-[18px] py-4 md:left-[140px] md:translate-x-0"
							>
								{tools.groups.map((g, gi) => (
									<div key={g.status}>
										{gi > 0 ? <div className="my-3 h-px bg-border-2" /> : null}
										<Badge
											variant={g.tone as "warning" | "info" | "success"}
											className="font-mono text-[10px]"
										>
											{g.status}
										</Badge>
										{g.items.map((it) => (
											<div
												key={it.name}
												className="mt-2.5 flex justify-between text-xs"
											>
												<span>{it.name}</span>
												<span className="text-[9px] text-muted-foreground uppercase">
													{it.agent}
												</span>
											</div>
										))}
									</div>
								))}
							</Card>
							<div className="absolute inset-x-0 bottom-[18px] flex flex-wrap justify-center gap-2.5 px-3">
								{tools.dock.map((d) => (
									<Card
										key={d}
										elevation="raised"
										className="h-10 w-24 items-center justify-center gap-0 rounded-[10px] p-0 text-[13px]"
									>
										{d}
									</Card>
								))}
							</div>
						</Card>
					</div>
				</div>
			</section>

			{/* Guide */}
			<section
				className={`${wrap} flex flex-col items-center gap-8 py-24 text-center md:py-[170px]`}
			>
				<h2 className="text-[34px] leading-[1.15] font-normal tracking-[-1.4px] text-foreground-2 md:text-[56px] dark:text-muted-foreground-2">
					{guide.title}
				</h2>
				<p className="max-w-[560px] text-[19px] leading-normal text-foreground-2">
					{guide.body}
				</p>
				<Button
					elevation="raised"
					size="lg"
					className="h-[52px] px-[22px] text-[17px]"
				>
					{guide.cta}
				</Button>
				<div className="mt-10 grid w-full max-w-[880px] gap-x-10 gap-y-12 text-left sm:grid-cols-2">
					{guide.chapters.map((c) => (
						<div key={c.n} className="flex flex-col items-center gap-[18px]">
							<Card
								elevation="floating"
								className="w-full max-w-[376px] gap-0 rounded-2xl px-[22px] py-6"
							>
								<div className="text-[22px] leading-tight">
									Chapter {c.n}
									<br />
									{c.title}
								</div>
								<div className="mt-[26px] mb-[18px] h-px bg-border-2" />
								<div className="font-mono text-[10px] text-muted-foreground">
									Chapter {c.numeral}
								</div>
								<Scene
									art={c.art}
									className="mt-4 h-[250px] w-full overflow-hidden rounded-md"
								/>
								<div className="mt-3 flex justify-between font-mono text-[10px] text-muted-foreground">
									<span>by Stockbreak</span>
									<span>2026</span>
								</div>
							</Card>
							<span className="font-mono text-xs text-muted-foreground">
								Read this chapter ({c.numeral})
							</span>
						</div>
					))}
				</div>
				<Button variant="secondary" elevation="raised">
					{guide.download}
				</Button>
			</section>

			{/* Footer */}
			<footer className="relative overflow-hidden pt-8 pb-[200px]">
				<div
					className={`${wrap} grid items-start gap-14 lg:grid-cols-2 lg:gap-24 xl:px-[200px]`}
				>
					<div className="flex flex-col">
						<h2 className="text-[34px] leading-[1.15] font-normal tracking-[-1px] text-foreground-2 md:text-[46px] dark:text-muted-foreground-2">
							{footer.title}
							<br />
							<span className="text-muted-foreground">{footer.muted}</span>
						</h2>
						<div className="mt-14 flex flex-wrap gap-4 text-[17px]">
							<span className="text-muted-foreground">{header.lead}</span>
							{footer.howTo.map((h) => (
								<a key={h} href="#guide">
									{h}
								</a>
							))}
						</div>
						<div className="mt-8 flex gap-[100px] text-[17px]">
							{footer.columns.map((col) => (
								<div key={col[0]} className="flex flex-col gap-[18px]">
									{col.map((l) => (
										<a key={l} href="#top">
											{l}
										</a>
									))}
								</div>
							))}
						</div>
						<div className="mt-6 flex gap-2.5">
							{footer.socials.map((s) => (
								<Button
									key={s}
									variant="secondary"
									elevation="raised"
									size="icon"
									className="size-10 font-semibold"
									aria-label={s}
								>
									{s}
								</Button>
							))}
						</div>
						<div className="mt-9 flex items-center gap-2 text-[13px] text-muted-foreground">
							Built on <Badge variant="secondary">{footer.builtOn}</Badge>{" "}
							{footer.network}
						</div>
						<div className="mt-3 text-[13px] text-muted-foreground-2">
							{footer.copyright}
						</div>
					</div>
					<Card
						elevation="floating"
						className="mx-auto w-full max-w-[360px] gap-0 rounded-[22px] p-2.5"
					>
						<div className="relative h-[460px] overflow-hidden rounded-[10px]">
							<Scene
								art={footerSceneArt}
								fit="xMidYMid slice"
								className="absolute inset-0 size-full"
							/>
							<div className="absolute inset-x-2.5 bottom-2.5 rounded-lg bg-emerald-950/80 px-3.5 pt-3.5 pb-4 text-white">
								<div className="text-xl leading-tight">
									{footer.card.lead}
									<span className="opacity-70">{footer.card.muted}</span>
								</div>
								<Button variant="secondary" elevation="raised" className="mt-3">
									{footer.card.cta}
								</Button>
							</div>
						</div>
					</Card>
				</div>
				<div className="absolute inset-x-0 bottom-0 h-[140px]">
					<Scene
						art={grassArt}
						fit="xMidYMax slice"
						className="absolute inset-0 size-full"
					/>
					<div className="absolute inset-x-0 bottom-5 text-center text-xs text-emerald-950/70">
						{footer.hackathon}
					</div>
				</div>
			</footer>
		</div>
	);
}
