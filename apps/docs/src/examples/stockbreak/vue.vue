<script setup lang="ts">
import { AppHeader } from "@edmi-vue/ui/app-header";
import { Button } from "@edmi-vue/ui/button";
import { ElevationProvider } from "@edmi-vue/ui/elevation";
import { Input } from "@edmi-vue/ui/input";
import { Kbd } from "@edmi-vue/ui/kbd";
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
} from "@edmi-vue/ui/sidebar";
import { WatchlistItem } from "@edmi-vue/ui/watchlist-item";
import {
	ChartLineIcon,
	GlobeIcon,
	LayoutDashboardIcon,
	ListIcon,
	PlusIcon,
	SettingsIcon,
	SparklesIcon,
	StarIcon,
	WalletIcon,
} from "@lucide/vue";
import { computed, nextTick, ref, watch } from "vue";
import { appNav, type PageId, pageIds, pageNav, pageTitles, sidebarNav, watchlist } from "./data";
import AgentsPage from "./vue/AgentsPage.vue";
import CreatePage from "./vue/CreatePage.vue";
import ExplorePage from "./vue/ExplorePage.vue";
import FaucetPage from "./vue/FaucetPage.vue";
import FeedPage from "./vue/FeedPage.vue";
import IndexDetailPage from "./vue/IndexDetailPage.vue";
import LandingPage from "./vue/LandingPage.vue";
import LeaderboardPage from "./vue/LeaderboardPage.vue";
import MarketsPage from "./vue/MarketsPage.vue";
import PortfolioPage from "./vue/PortfolioPage.vue";
import ProfilePage from "./vue/ProfilePage.vue";

// Stockbreak: one multi-page app, two shells. Navigation is internal state: hash links (`#/<page>`) and
// `data-go="<page>"` buttons are intercepted at the root, so pages stay plain markup.
const props = withDefaults(defineProps<{ layout?: "navbar" | "sidebar" }>(), { layout: "navbar" });

const views: Record<PageId, unknown> = {
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

const navIcons: Record<string, unknown> = {
	dashboard: LayoutDashboardIcon,
	explore: GlobeIcon,
	feed: ListIcon,
	leaderboard: StarIcon,
	agents: SparklesIcon,
	create: PlusIcon,
	portfolio: WalletIcon,
	settings: SettingsIcon,
};

const page = ref<PageId>("markets");
const scroller = ref<HTMLElement | null>(null);
// Landing is the marketing page of the navbar layout (logo); the sidebar layout has no landing.
const current = computed<PageId>(() => (props.layout === "sidebar" && page.value === "landing" ? "markets" : page.value));
const view = computed(() => views[current.value]);

watch(current, async () => {
	await nextTick();
	window.scrollTo(0, 0);
	scroller.value?.scrollTo(0, 0);
});

function intercept(e: MouseEvent) {
	const el = (e.target as HTMLElement).closest<HTMLElement>("[data-go], a[href^='#/']");
	if (!el) return;
	const to = el.dataset.go ?? el.getAttribute("href")?.slice(2) ?? "";
	if (!(pageIds as string[]).includes(to)) return;
	e.preventDefault();
	page.value = to as PageId;
}
</script>

<template>
<ElevationProvider mode="layered">
	<SidebarProvider
		v-if="layout === 'sidebar'"
		class="h-svh min-h-0 overflow-hidden bg-background text-foreground"
		style="--sidebar-width: 16rem"
		@click="intercept"
	>
		<Sidebar variant="inset" collapsible="offcanvas">
			<SidebarHeader class="gap-3 px-3 pt-4">
				<div class="flex items-center justify-between">
					<a href="#/markets" class="flex items-center gap-2 font-brand text-xl font-semibold tracking-[-0.4px]">
						<span class="inline-flex size-7 items-center justify-center rounded-lg border border-transparent bg-primary text-primary-foreground [background-image:var(--r1-p-face)] shadow-btn-raised-primary [background-origin:border-box]">
							<ChartLineIcon class="size-[15px]" />
						</span>
						Stockbreak
					</a>
					<SidebarTrigger />
				</div>
				<div class="relative">
					<Input readonly placeholder="Search" aria-label="Search" class="pr-12" />
					<Kbd class="absolute top-1/2 right-2 -translate-y-1/2">⌘K</Kbd>
				</div>
			</SidebarHeader>
			<SidebarContent class="px-2">
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem v-for="item in sidebarNav" :key="item.label">
								<SidebarMenuButton as-child :is-active="item.href === pageNav[current]" class="h-9">
									<a :href="item.href">
										<component :is="navIcons[item.icon]" />
										<span>{{ item.label }}</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel class="text-[11.5px] tracking-[0.6px] uppercase">My watchlist</SidebarGroupLabel>
					<SidebarGroupContent class="flex flex-col gap-0.5">
						<WatchlistItem v-for="(w, i) in watchlist" :key="w.symbol" href="#/index" :active="current === 'index' && i === 0" v-bind="w" />
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter class="px-3 pb-4">
				<a href="#/faucet" class="block rounded-xl border border-border bg-card p-3">
					<div class="text-[13.5px] font-medium">Get devnet USDC ↗</div>
					<div class="text-xs text-muted-foreground">Fund your wallet at /faucet</div>
				</a>
			</SidebarFooter>
		</Sidebar>
		<SidebarInset class="min-h-0 min-w-0 overflow-hidden bg-background">
			<header class="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border px-4 md:px-7">
				<div class="flex min-w-0 items-center gap-2 text-[15px]">
					<SidebarTrigger class="md:hidden" />
					<span class="text-muted-foreground max-sm:hidden">Dashboard</span>
					<span class="text-muted-foreground max-sm:hidden">/</span>
					<span>{{ pageTitles[current] }}</span>
				</div>
				<div class="flex items-center gap-2">
					<Button elevation="raised" variant="outline" class="max-sm:hidden" data-go="faucet">Devnet</Button>
					<Button data-go="create">
						Create index
						<PlusIcon />
					</Button>
				</div>
			</header>
			<div ref="scroller" class="min-h-0 flex-1 overflow-y-auto overscroll-contain">
				<component :is="view" />
			</div>
		</SidebarInset>
	</SidebarProvider>
	<div v-else class="min-h-svh bg-background text-foreground" @click="intercept">
		<component :is="view" v-if="current === 'landing'" />
		<template v-else>
			<div class="border-b border-border">
				<div class="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
					<AppHeader name="Stockbreak" network="Devnet"
						class="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
						href="#/landing"
						:items="appNav"
						:active="pageNav[current]"
						@connect="page = 'profile'"
						@network-click="page = 'faucet'"
					/>
				</div>
			</div>
			<component :is="view" />
		</template>
	</div>
</ElevationProvider>
</template>
