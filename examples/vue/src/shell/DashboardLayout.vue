<script setup lang="ts">
import {
	PhBriefcase,
	PhCompass,
	PhGauge,
	PhGear,
	PhList,
	PhMagnifyingGlass,
	PhPlus,
	PhRobot,
	PhTrophy,
} from "@phosphor-icons/vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
	SidebarRail,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { WatchlistItem } from "@/components/watchlist-item";
import { watchlist } from "@/data/markets";

const items = [
	{ label: "Dashboard", icon: PhGauge, active: true },
	{ label: "Explore", icon: PhCompass },
	{ label: "Feed", icon: PhList },
	{ label: "Leaderboard", icon: PhTrophy },
	{ label: "AI agents", icon: PhRobot },
	{ label: "Create index", icon: PhPlus },
	{ label: "Portfolio", icon: PhBriefcase },
	{ label: "Settings", icon: PhGear },
];
</script>

<template>
	<SidebarProvider>
		<Sidebar variant="inset" collapsible="icon">
			<SidebarHeader>
				<a href="#/" class="flex items-center gap-2.5 px-1 py-1">
					<span class="inline-flex size-[25px] shrink-0 items-center justify-center rounded-[7px] border border-input bg-linear-to-b from-secondary-hi to-secondary shadow-btn-secondary [background-origin:border-box]">
						<PhGauge class="size-3.5" />
					</span>
					<span class="font-brand text-xl font-semibold tracking-[-0.4px] group-data-[collapsible=icon]:hidden">Stockbreak</span>
				</a>
				<div class="relative group-data-[collapsible=icon]:hidden">
					<PhMagnifyingGlass class="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input placeholder="Search" aria-label="Search" class="h-10 pl-9" />
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem v-for="item in items" :key="item.label">
								<SidebarMenuButton as-child :is-active="item.active" :tooltip="item.label">
									<a :href="`#${item.label}`">
										<component :is="item.icon" />
										<span>{{ item.label }}</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup class="group-data-[collapsible=icon]:hidden">
					<SidebarGroupLabel class="tracking-[1px] uppercase">My watchlist</SidebarGroupLabel>
					<SidebarGroupContent>
						<WatchlistItem  v-for="w in watchlist" :key="w.symbol" href="#watch" v-bind="w" />
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter class="group-data-[collapsible=icon]:hidden">
				<a
					href="#faucet"
					class="rounded-xl border border-input bg-linear-to-b from-secondary-hi to-secondary p-4 shadow-btn-secondary [background-origin:border-box]"
				>
					<div class="text-sm font-medium">Get devnet USDC ↗</div>
					<div class="mt-0.5 text-[11.5px] text-muted-foreground">Fund your wallet at /faucet</div>
				</a>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
		<SidebarInset>
			<header class="flex h-[62px] shrink-0 items-center justify-between gap-2 border-b border-border-2 px-4 md:px-6">
				<div class="flex items-center gap-2">
					<SidebarTrigger />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href="#/">Dashboard</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>Markets</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<div class="flex items-center gap-2">
					<Button variant="outline">Devnet</Button>
					<ThemeToggle />
				</div>
			</header>
			<div class="flex-1 overflow-auto"><slot /></div>
		</SidebarInset>
	</SidebarProvider>
</template>
