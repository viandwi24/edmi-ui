import {
	IndexRow,
	IndexRowHeader,
} from "@edmi-react/blocks/index-row/index-row";
import { TickerStrip } from "@edmi-react/blocks/ticker-strip/ticker-strip";
import { WatchlistItem } from "@edmi-react/blocks/watchlist-item/watchlist-item";
import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import { Input } from "@edmi-react/ui/input";
import { Kbd } from "@edmi-react/ui/kbd";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@edmi-react/ui/sidebar";
import { Table, TableBody, TableHeader } from "@edmi-react/ui/table";
import type * as React from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	activity,
	creators,
	humanVsAi,
	indexes,
	sidebarNav,
	tickers,
	watchlist,
} from "./data";

function CardTop({ title, action }: { title: string; action?: string }) {
	return (
		<div className="flex items-baseline justify-between">
			<h2 className="text-xl font-normal tracking-[-0.3px]">{title}</h2>
			{action ? (
				<a
					href="#all"
					className="text-[13px] text-muted-foreground hover:text-foreground"
				>
					{action}
				</a>
			) : null}
		</div>
	);
}

function Mini({
	label,
	value,
	note,
}: {
	label: string;
	value: string;
	note: string;
}) {
	return (
		<div className="rounded-xl border border-border-2 bg-muted p-[18px] shadow-sunk">
			<div className="text-[13px] text-muted-foreground">{label}</div>
			<div className="my-2 text-[34px] leading-none font-light tracking-[-0.5px] text-success-text">
				{value}
			</div>
			<div className="text-[13px] text-muted-foreground">{note}</div>
		</div>
	);
}

const navIcons = {
	dashboard: (
		<IconPlaceholder
			lucide="LayoutDashboardIcon"
			tabler="IconLayoutDashboard"
			hugeicons="DashboardSquare01Icon"
			phosphor="SquaresFourIcon"
			remixicon="RiDashboardLine"
			className="size-4"
		/>
	),
	explore: (
		<IconPlaceholder
			lucide="GlobeIcon"
			tabler="IconWorld"
			hugeicons="Globe02Icon"
			phosphor="GlobeIcon"
			remixicon="RiGlobalLine"
			className="size-4"
		/>
	),
	feed: (
		<IconPlaceholder
			lucide="ListIcon"
			tabler="IconList"
			hugeicons="ListViewIcon"
			phosphor="ListIcon"
			remixicon="RiListUnordered"
			className="size-4"
		/>
	),
	leaderboard: (
		<IconPlaceholder
			lucide="StarIcon"
			tabler="IconStar"
			hugeicons="StarIcon"
			phosphor="StarIcon"
			remixicon="RiStarLine"
			className="size-4"
		/>
	),
	agents: (
		<IconPlaceholder
			lucide="SparklesIcon"
			tabler="IconSparkles"
			hugeicons="SparklesIcon"
			phosphor="SparkleIcon"
			remixicon="RiSparklingLine"
			className="size-4"
		/>
	),
	create: (
		<IconPlaceholder
			lucide="PlusIcon"
			tabler="IconPlus"
			hugeicons="PlusSignIcon"
			phosphor="PlusIcon"
			remixicon="RiAddLine"
			className="size-4"
		/>
	),
	portfolio: (
		<IconPlaceholder
			lucide="WalletIcon"
			tabler="IconWallet"
			hugeicons="Wallet01Icon"
			phosphor="WalletIcon"
			remixicon="RiWalletLine"
			className="size-4"
		/>
	),
	settings: (
		<IconPlaceholder
			lucide="SettingsIcon"
			tabler="IconSettings"
			hugeicons="Settings01Icon"
			phosphor="GearIcon"
			remixicon="RiSettingsLine"
			className="size-4"
		/>
	),
} as const;

function AppSidebar() {
	return (
		<Sidebar variant="inset" collapsible="offcanvas">
			<SidebarHeader className="gap-3 px-3 pt-4">
				<div className="flex items-center justify-between">
					<a
						href="#/"
						className="flex items-center gap-2 font-brand text-xl font-semibold tracking-[-0.4px]"
					>
						<span className="inline-flex size-7 items-center justify-center rounded-lg border border-primary-edge border-b-primary-lip bg-linear-to-b from-primary-hi to-primary text-primary-foreground shadow-btn-primary [background-origin:border-box]">
							<IconPlaceholder
								lucide="ChartLineIcon"
								tabler="IconChartLine"
								hugeicons="ChartLineData01Icon"
								phosphor="ChartLineUpIcon"
								remixicon="RiLineChartLine"
								className="size-[15px]"
							/>
						</span>
						Stockbreak
					</a>
					<SidebarTrigger />
				</div>
				<div className="relative">
					<Input
						readOnly
						placeholder="Search"
						aria-label="Search"
						className="pr-12"
					/>
					<Kbd className="absolute top-1/2 right-2 -translate-y-1/2">⌘K</Kbd>
				</div>
			</SidebarHeader>
			<SidebarContent className="px-2">
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{sidebarNav.map((item) => (
								<SidebarMenuItem key={item.label}>
									<SidebarMenuButton
										render={<a href="#/" />}
										isActive={"active" in item && item.active}
										className="h-9"
									>
										{navIcons[item.icon]}
										<span>{item.label}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel className="text-[11.5px] tracking-[0.6px] uppercase">
						My watchlist
					</SidebarGroupLabel>
					<SidebarGroupContent className="flex flex-col gap-0.5">
						{watchlist.map((w, i) => (
							<WatchlistItem
								key={w.symbol}
								raised
								href="#/"
								active={i === 0}
								{...w}
							/>
						))}
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="px-3 pb-4">
				<div className="rounded-xl border border-border bg-card p-3">
					<div className="text-[13.5px] font-medium">Get devnet USDC ↗</div>
					<div className="text-xs text-muted-foreground">
						Fund your wallet at /faucet
					</div>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}

export default function MarketsSidebarExample() {
	return (
		<SidebarProvider
			style={{ "--sidebar-width": "16rem" } as React.CSSProperties}
		>
			<AppSidebar />
			<SidebarInset className="min-w-0 bg-background">
				<header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border px-4 md:px-7">
					<div className="flex min-w-0 items-center gap-2 text-[15px]">
						<SidebarTrigger className="md:hidden" />
						<span className="text-muted-foreground max-sm:hidden">
							Dashboard
						</span>
						<span className="text-muted-foreground max-sm:hidden">/</span>
						<span>Markets</span>
					</div>
					<div className="flex items-center gap-2">
						<Button
							elevation="raised"
							variant="outline"
							className="max-sm:hidden"
						>
							Devnet
						</Button>
						<Button elevation="raised">
							Create index
							<IconPlaceholder
								lucide="PlusIcon"
								tabler="IconPlus"
								hugeicons="PlusSignIcon"
								phosphor="PlusIcon"
								remixicon="RiAddLine"
							/>
						</Button>
					</div>
				</header>
				<div className="flex w-full flex-col gap-6 px-4 py-8 md:px-10">
					<div className="flex flex-wrap items-end justify-between gap-4">
						<div>
							<div className="flex items-center gap-3">
								<h1 className="text-[44px] leading-tight font-normal tracking-[-1.5px]">
									Markets
								</h1>
								<Badge variant="secondary">Simulated</Badge>
							</div>
							<p className="mt-1 text-lg text-muted-foreground">
								Tokenized stock indexes. Create one, share it, or join someone
								else’s.
							</p>
						</div>
					</div>

					<TickerStrip raised items={tickers} />

					<Card raised className="gap-4 px-6">
						<CardTop title="Top indexes" action="View all" />
						<Table>
							<TableHeader>
								<IndexRowHeader />
							</TableHeader>
							<TableBody>
								{indexes.map((index) => (
									<IndexRow key={index.symbol} index={index} delta="pill" />
								))}
							</TableBody>
						</Table>
					</Card>

					<div className="grid items-start gap-6 lg:grid-cols-3">
						<Card raised className="@container gap-4 px-6">
							<CardTop title="Human vs AI" />
							<div className="grid gap-3 @[400px]:grid-cols-2">
								<Mini {...humanVsAi.human} />
								<Mini {...humanVsAi.ai} />
							</div>
						</Card>

						<Card raised className="gap-3 px-6">
							<CardTop title="Top creators" action="See all" />
							<ul>
								{creators.map((c) => (
									<li
										key={c.address}
										className="flex items-center gap-3 border-b border-border-2 py-3 last:border-b-0"
									>
										<span className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-muted font-mono text-xs">
											{c.rank}
										</span>
										<div className="min-w-0 flex-1">
											<div className="font-mono text-[13px] font-semibold">
												{c.address}
											</div>
											<div className="text-xs text-muted-foreground">
												{c.meta}
											</div>
										</div>
										<div className="text-right">
											<div className="font-mono text-[13px] font-semibold">
												{c.aum}
											</div>
											<div className="text-xs text-muted-foreground">
												{c.joiners}
											</div>
										</div>
									</li>
								))}
							</ul>
						</Card>

						<Card raised className="gap-3 px-6">
							<CardTop title="Latest activity" />
							<ul>
								{activity.map((a) => (
									<li
										key={`${a.symbol}-${a.text}`}
										className="flex items-center gap-2.5 border-b border-border-2 py-3 text-[13px] last:border-b-0"
									>
										<span
											className={`size-1.5 rounded-full ${a.tone === "brand" ? "bg-success" : "bg-warning"}`}
										/>
										<span className="font-mono font-semibold">{a.symbol}</span>
										<span className="min-w-0 flex-1 truncate text-foreground-2">
											{a.text}
										</span>
										<span className="text-muted-foreground">{a.ago}</span>
									</li>
								))}
							</ul>
						</Card>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
