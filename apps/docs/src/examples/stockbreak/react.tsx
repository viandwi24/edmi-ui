import { AppHeader } from "@edmi-react/blocks/app-header/app-header";
import { WatchlistItem } from "@edmi-react/blocks/watchlist-item/watchlist-item";
import { Button } from "@edmi-react/ui/button";
import { ElevationProvider } from "@edmi-react/ui/elevation";
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
import { type ReactElement, useEffect, useRef, useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	appNav,
	type PageId,
	pageIds,
	pageNav,
	pageTitles,
	sidebarNav,
	watchlist,
} from "./data";
import { AgentsPage } from "./react/AgentsPage";
import { CreatePage } from "./react/CreatePage";
import { ExplorePage } from "./react/ExplorePage";
import { FaucetPage } from "./react/FaucetPage";
import { FeedPage } from "./react/FeedPage";
import { IndexDetailPage } from "./react/IndexDetailPage";
import { LandingPage } from "./react/LandingPage";
import { LeaderboardPage } from "./react/LeaderboardPage";
import { MarketsPage } from "./react/MarketsPage";
import { PortfolioPage } from "./react/PortfolioPage";
import { ProfilePage } from "./react/ProfilePage";

const pages: Record<PageId, () => ReactElement> = {
	markets: MarketsPage,
	explore: ExplorePage,
	index: IndexDetailPage,
	leaderboard: LeaderboardPage,
	create: CreatePage,
	feed: FeedPage,
	agents: AgentsPage,
	portfolio: PortfolioPage,
	profile: ProfilePage,
	faucet: FaucetPage,
	landing: LandingPage,
};

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

// Stockbreak: one multi-page app, two shells. Navigation is internal state: hash links (`#/<page>`) and
// `data-go="<page>"` buttons are intercepted at the root, so pages stay plain markup.
export default function StockbreakExample({
	layout = "navbar",
}: {
	layout?: "navbar" | "sidebar";
}) {
	const [page, setPage] = useState<PageId>("markets");
	const scroller = useRef<HTMLDivElement>(null);
	// Landing is the marketing page of the navbar layout (logo); the sidebar layout has no landing.
	const current: PageId =
		layout === "sidebar" && page === "landing" ? "markets" : page;
	const View = pages[current];

	// biome-ignore lint/correctness/useExhaustiveDependencies: scroll back to the top whenever the page changes
	useEffect(() => {
		window.scrollTo(0, 0);
		scroller.current?.scrollTo(0, 0);
	}, [current]);

	const intercept = (e: React.MouseEvent) => {
		const el = (e.target as HTMLElement).closest<HTMLElement>(
			"[data-go], a[href^='#/']",
		);
		if (!el) return;
		const to = el.dataset.go ?? el.getAttribute("href")?.slice(2) ?? "";
		if (!(pageIds as string[]).includes(to)) return;
		e.preventDefault();
		setPage(to as PageId);
	};

	if (layout === "sidebar") {
		return (
			<ElevationProvider mode="layered">
				<SidebarProvider
					className="h-svh min-h-0 overflow-hidden bg-background text-foreground"
					style={{ "--sidebar-width": "16rem" } as React.CSSProperties}
					onClick={intercept}
				>
					<Sidebar variant="inset" collapsible="offcanvas">
						<SidebarHeader className="gap-3 px-3 pt-4">
							<div className="flex items-center justify-between">
								<a
									href="#/markets"
									className="flex items-center gap-2 font-brand text-xl font-semibold tracking-[-0.4px]"
								>
									<span className="inline-flex size-7 items-center justify-center rounded-lg border border-transparent bg-primary text-primary-foreground [background-image:var(--r1-p-face)] shadow-btn-raised-primary [background-origin:border-box]">
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
								<Kbd className="absolute top-1/2 right-2 -translate-y-1/2">
									⌘K
								</Kbd>
							</div>
						</SidebarHeader>
						<SidebarContent className="px-2">
							<SidebarGroup>
								<SidebarGroupContent>
									<SidebarMenu>
										{sidebarNav.map((item) => (
											<SidebarMenuItem key={item.label}>
												<SidebarMenuButton
													render={<a href={item.href} />}
													isActive={item.href === pageNav[current]}
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
											href="#/index"
											active={current === "index" && i === 0}
											{...w}
										/>
									))}
								</SidebarGroupContent>
							</SidebarGroup>
						</SidebarContent>
						<SidebarFooter className="px-3 pb-4">
							<a
								href="#/faucet"
								className="block rounded-xl border border-border bg-card p-3"
							>
								<div className="text-[13.5px] font-medium">
									Get devnet USDC ↗
								</div>
								<div className="text-xs text-muted-foreground">
									Fund your wallet at /faucet
								</div>
							</a>
						</SidebarFooter>
					</Sidebar>
					<SidebarInset className="min-h-0 min-w-0 overflow-hidden bg-background">
						<header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border px-4 md:px-7">
							<div className="flex min-w-0 items-center gap-2 text-[15px]">
								<SidebarTrigger className="md:hidden" />
								<span className="text-muted-foreground max-sm:hidden">
									Dashboard
								</span>
								<span className="text-muted-foreground max-sm:hidden">/</span>
								<span>{pageTitles[current]}</span>
							</div>
							<div className="flex items-center gap-2">
								<Button
									elevation="raised"
									variant="outline"
									className="max-sm:hidden"
									data-go="faucet"
								>
									Devnet
								</Button>
								<Button data-go="create">
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
						<div
							ref={scroller}
							className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
						>
							<View />
						</div>
					</SidebarInset>
				</SidebarProvider>
			</ElevationProvider>
		);
	}

	return (
		<ElevationProvider mode="layered">
			{/* biome-ignore lint/a11y/noStaticElementInteractions lint/a11y/useKeyWithClickEvents: delegated navigation for links and data-go buttons, which are keyboard-activatable themselves */}
			<div
				className="min-h-svh bg-background text-foreground"
				onClick={intercept}
			>
				{current === "landing" ? (
					<View />
				) : (
					<>
						<div className="border-b border-border">
							<div className="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
								<AppHeader
									name="Stockbreak"
									network="Devnet"
									className="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
									href="#/landing"
									items={appNav}
									active={pageNav[current]}
									onConnect={() => setPage("profile")}
									onNetworkClick={() => setPage("faucet")}
								/>
							</div>
						</div>
						<View />
					</>
				)}
			</div>
		</ElevationProvider>
	);
}
