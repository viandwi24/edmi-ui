import {
	BriefcaseIcon,
	CompassIcon,
	GaugeIcon,
	GearIcon,
	ListIcon,
	MagnifyingGlassIcon,
	PlusIcon,
	RobotIcon,
	TrophyIcon,
} from "@phosphor-icons/react";
import type * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
	{ label: "Dashboard", icon: GaugeIcon, active: true },
	{ label: "Explore", icon: CompassIcon },
	{ label: "Feed", icon: ListIcon },
	{ label: "Leaderboard", icon: TrophyIcon },
	{ label: "AI agents", icon: RobotIcon },
	{ label: "Create index", icon: PlusIcon },
	{ label: "Portfolio", icon: BriefcaseIcon },
	{ label: "Settings", icon: GearIcon },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider className="h-svh min-h-0 overflow-hidden">
			<Sidebar variant="inset" collapsible="icon">
				<SidebarHeader>
					<a href="#/" className="flex items-center gap-2.5 px-1 py-1">
						<span className="inline-flex size-[25px] shrink-0 items-center justify-center rounded-[7px] border border-input bg-linear-to-b from-secondary-hi to-secondary shadow-btn-secondary [background-origin:border-box]">
							<GaugeIcon className="size-3.5" />
						</span>
						<span className="font-brand text-xl font-semibold tracking-[-0.4px] group-data-[collapsible=icon]:hidden">
							Stockbreak
						</span>
					</a>
					<div className="relative group-data-[collapsible=icon]:hidden">
						<MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							placeholder="Search"
							aria-label="Search"
							className="h-10 pl-9"
						/>
					</div>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupContent>
							<SidebarMenu>
								{items.map((item) => (
									<SidebarMenuItem key={item.label}>
										<SidebarMenuButton
											render={<a href={`#${item.label}`} />}
											isActive={item.active}
											tooltip={item.label}
										>
											<item.icon />
											<span>{item.label}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
					<SidebarGroup className="group-data-[collapsible=icon]:hidden">
						<SidebarGroupLabel className="tracking-[1px] uppercase">
							My watchlist
						</SidebarGroupLabel>
						<SidebarGroupContent>
							{watchlist.map((w, i) => (
								<WatchlistItem
									key={w.symbol}
									href="#watch"
									active={i === -1}
									{...w}
								/>
							))}
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter className="group-data-[collapsible=icon]:hidden">
					<a
						href="#faucet"
						className="rounded-xl border border-input bg-linear-to-b from-secondary-hi to-secondary p-4 shadow-btn-secondary [background-origin:border-box]"
					>
						<div className="text-sm font-medium">Get devnet USDC ↗</div>
						<div className="mt-0.5 text-[11.5px] text-muted-foreground">
							Fund your wallet at /faucet
						</div>
					</a>
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>
			<SidebarInset className="min-h-0 overflow-hidden">
				<header className="flex h-[62px] shrink-0 items-center justify-between gap-2 border-b border-border-2 px-4 md:px-6">
					<div className="flex items-center gap-2">
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
					<div className="flex items-center gap-2">
						<Button variant="outline">Devnet</Button>
						<ThemeToggle />
					</div>
				</header>
				<div className="min-h-0 flex-1 overflow-auto overscroll-contain">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
