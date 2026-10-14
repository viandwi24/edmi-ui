<script lang="ts">
	import { AppHeader } from "@edmi-svelte/ui/app-header";
	import { Button } from "@edmi-svelte/ui/button";
	import { ElevationProvider } from "@edmi-svelte/ui/elevation";
	import { Input } from "@edmi-svelte/ui/input";
	import { Kbd } from "@edmi-svelte/ui/kbd";
	import * as Sidebar from "@edmi-svelte/ui/sidebar";
	import { WatchlistItem } from "@edmi-svelte/ui/watchlist-item";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { appNav, type PageId, pageIds, pageNav, pageTitles, sidebarNav, watchlist } from "./data";
	import AgentsPage from "./svelte/AgentsPage.svelte";
	import CreatePage from "./svelte/CreatePage.svelte";
	import ExplorePage from "./svelte/ExplorePage.svelte";
	import FaucetPage from "./svelte/FaucetPage.svelte";
	import FeedPage from "./svelte/FeedPage.svelte";
	import IndexDetailPage from "./svelte/IndexDetailPage.svelte";
	import LandingPage from "./svelte/LandingPage.svelte";
	import LeaderboardPage from "./svelte/LeaderboardPage.svelte";
	import MarketsPage from "./svelte/MarketsPage.svelte";
	import PortfolioPage from "./svelte/PortfolioPage.svelte";
	import ProfilePage from "./svelte/ProfilePage.svelte";

	// Stockbreak: one multi-page app, two shells. Navigation is internal state: hash links (`#/<page>`) and
	// `data-go="<page>"` buttons are intercepted at the root, so pages stay plain markup.
	let { layout = "navbar" }: { layout?: "navbar" | "sidebar" } = $props();

	const views = {
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

	const navIcons: Record<string, Record<string, string>> = {dashboard: { lucide: "LayoutDashboardIcon", tabler: "IconLayoutDashboard", hugeicons: "DashboardSquare01Icon", phosphor: "SquaresFourIcon", remixicon: "RiDashboardLine" }, explore: { lucide: "GlobeIcon", tabler: "IconWorld", hugeicons: "Globe02Icon", phosphor: "GlobeIcon", remixicon: "RiGlobalLine" }, feed: { lucide: "ListIcon", tabler: "IconList", hugeicons: "ListViewIcon", phosphor: "ListIcon", remixicon: "RiListUnordered" }, leaderboard: { lucide: "StarIcon", tabler: "IconStar", hugeicons: "StarIcon", phosphor: "StarIcon", remixicon: "RiStarLine" }, agents: { lucide: "SparklesIcon", tabler: "IconSparkles", hugeicons: "SparklesIcon", phosphor: "SparkleIcon", remixicon: "RiSparklingLine" }, create: { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine" }, portfolio: { lucide: "WalletIcon", tabler: "IconWallet", hugeicons: "Wallet01Icon", phosphor: "WalletIcon", remixicon: "RiWalletLine" }, settings: { lucide: "SettingsIcon", tabler: "IconSettings", hugeicons: "Settings01Icon", phosphor: "GearIcon", remixicon: "RiSettingsLine" }};

	let page = $state<PageId>("markets");
	let scroller = $state<HTMLElement | null>(null);
	// Landing is the marketing page of the navbar layout (logo); the sidebar layout has no landing.
	const current = $derived<PageId>(layout === "sidebar" && page === "landing" ? "markets" : page);
	const View = $derived(views[current]);

	$effect(() => {
		void current;
		window.scrollTo(0, 0);
		scroller?.scrollTo(0, 0);
	});

	function intercept(e: MouseEvent) {
		const el = (e.target as HTMLElement).closest<HTMLElement>("[data-go], a[href^='#/']");
		if (!el) return;
		const to = el.dataset.go ?? el.getAttribute("href")?.slice(2) ?? "";
		if (!(pageIds as string[]).includes(to)) return;
		e.preventDefault();
		page = to as PageId;
	}
</script>

<ElevationProvider mode="layered">
	{#if layout === "sidebar"}
		<Sidebar.Provider class="h-svh min-h-0 overflow-hidden bg-background text-foreground" style="--sidebar-width: 16rem" onclick={intercept}>
			<Sidebar.Root variant="inset" collapsible="offcanvas">
				<Sidebar.Header class="gap-3 px-3 pt-4">
					<div class="flex items-center justify-between">
						<a href="#/markets" class="flex items-center gap-2 font-brand text-xl font-semibold tracking-[-0.4px]">
							<span class="inline-flex size-7 items-center justify-center rounded-lg border border-transparent bg-primary text-primary-foreground [background-image:var(--r1-p-face)] shadow-btn-raised-primary [background-origin:border-box]">
								<IconPlaceholder
									lucide="ChartLineIcon"
									tabler="IconChartLine"
									hugeicons="ChartLineData01Icon"
									phosphor="ChartLineUpIcon"
									remixicon="RiLineChartLine"
									class="size-[15px]"
								/>
							</span>
							Stockbreak
						</a>
						<Sidebar.Trigger />
					</div>
					<div class="relative">
						<Input readonly placeholder="Search" aria-label="Search" class="pr-12" />
						<Kbd class="absolute top-1/2 right-2 -translate-y-1/2">⌘K</Kbd>
					</div>
				</Sidebar.Header>
				<Sidebar.Content class="px-2">
					<Sidebar.Group>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								{#each sidebarNav as item (item.label)}
									<Sidebar.MenuItem>
										<Sidebar.MenuButton isActive={item.href === pageNav[current]} class="h-9">
											{#snippet child({ props })}
												<a href={item.href} {...props}>
													<IconPlaceholder {...navIcons[item.icon]} />
													<span>{item.label}</span>
												</a>
											{/snippet}
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								{/each}
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
					<Sidebar.Group>
						<Sidebar.GroupLabel class="text-[11.5px] tracking-[0.6px] uppercase">My watchlist</Sidebar.GroupLabel>
						<Sidebar.GroupContent class="flex flex-col gap-0.5">
							{#each watchlist as w, i (w.symbol)}
								<WatchlistItem href="#/index" active={current === "index" && i === 0} {...w} />
							{/each}
						</Sidebar.GroupContent>
					</Sidebar.Group>
				</Sidebar.Content>
				<Sidebar.Footer class="px-3 pb-4">
					<a href="#/faucet" class="block rounded-xl border border-border bg-card p-3">
						<div class="text-[13.5px] font-medium">Get devnet USDC ↗</div>
						<div class="text-xs text-muted-foreground">Fund your wallet at /faucet</div>
					</a>
				</Sidebar.Footer>
			</Sidebar.Root>
			<Sidebar.Inset class="min-h-0 min-w-0 overflow-hidden bg-background">
				<header class="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border px-4 md:px-7">
					<div class="flex min-w-0 items-center gap-2 text-[15px]">
						<Sidebar.Trigger class="md:hidden" />
						<span class="text-muted-foreground max-sm:hidden">Dashboard</span>
						<span class="text-muted-foreground max-sm:hidden">/</span>
						<span>{pageTitles[current]}</span>
					</div>
					<div class="flex items-center gap-2">
						<Button elevation="raised" variant="outline" class="max-sm:hidden" data-go="faucet">Devnet</Button>
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
				<div bind:this={scroller} class="min-h-0 flex-1 overflow-y-auto overscroll-contain">
					<View />
				</div>
			</Sidebar.Inset>
		</Sidebar.Provider>
	{:else}
		<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
		<div class="min-h-svh bg-background text-foreground" onclick={intercept}>
			{#if current === "landing"}
				<View />
			{:else}
				<div class="border-b border-border">
					<div class="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
						<AppHeader name="Stockbreak" network="Devnet"
							class="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
							href="#/landing"
							items={appNav}
							active={pageNav[current]}
							onConnect={() => (page = "profile")}
							onNetworkClick={() => (page = "faucet")}
						/>
					</div>
				</div>
				<View />
			{/if}
		</div>
	{/if}
</ElevationProvider>
