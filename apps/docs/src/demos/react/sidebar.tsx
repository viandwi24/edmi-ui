import { Separator } from "@edmi-react/ui/separator";
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
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	SidebarTrigger,
} from "@edmi-react/ui/sidebar";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

const platform = [
	{
		title: "Dashboard",
		icon: (
			<IconPlaceholder
				lucide="LayoutDashboardIcon"
				tabler="IconDashboard"
				hugeicons="DashboardSquare01Icon"
				phosphor="SquaresFourIcon"
				remixicon="RiDashboardLine"
			/>
		),
		active: true,
	},
	{
		title: "Explore",
		icon: (
			<IconPlaceholder
				lucide="SearchIcon"
				tabler="IconSearch"
				hugeicons="SearchIcon"
				phosphor="MagnifyingGlassIcon"
				remixicon="RiSearchLine"
			/>
		),
	},
	{
		title: "Feed",
		icon: (
			<IconPlaceholder
				lucide="NewspaperIcon"
				tabler="IconNews"
				hugeicons="News01Icon"
				phosphor="NewspaperIcon"
				remixicon="RiNewspaperLine"
			/>
		),
		badge: "3",
	},
	{
		title: "Leaderboard",
		icon: (
			<IconPlaceholder
				lucide="TrophyIcon"
				tabler="IconTrophy"
				hugeicons="Award01Icon"
				phosphor="TrophyIcon"
				remixicon="RiTrophyLine"
			/>
		),
	},
];

export default function Demo() {
	return (
		// translateZ makes the sidebar's fixed positioning relative to this frame.
		<div className="relative h-[460px] w-full overflow-hidden rounded-xl border border-border [transform:translateZ(0)] [&_[data-slot=sidebar-container]]:absolute [&_[data-slot=sidebar-container]]:h-full">
			<SidebarProvider className="h-full min-h-0">
				<Sidebar collapsible="icon">
					<SidebarHeader>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton size="lg" tooltip="stockbreak">
									<IconPlaceholder
										lucide="HomeIcon"
										tabler="IconHome"
										hugeicons="HomeIcon"
										phosphor="HouseIcon"
										remixicon="RiHomeLine"
									/>
									<span className="font-semibold group-data-[collapsible=icon]:hidden">
										stockbreak
									</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>Platform</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{platform.map((item) => (
										<SidebarMenuItem key={item.title}>
											<SidebarMenuButton
												isActive={item.active}
												tooltip={item.title}
											>
												{item.icon}
												<span>{item.title}</span>
											</SidebarMenuButton>
											{item.badge ? (
												<SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
											) : null}
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
						<SidebarGroup>
							<SidebarGroupLabel>You</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton tooltip="Create index">
											<IconPlaceholder
												lucide="PlusIcon"
												tabler="IconPlus"
												hugeicons="PlusSignIcon"
												phosphor="PlusIcon"
												remixicon="RiAddLine"
											/>
											<span>Create index</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton tooltip="Portfolio">
											<IconPlaceholder
												lucide="BriefcaseIcon"
												tabler="IconBriefcase"
												hugeicons="Briefcase01Icon"
												phosphor="BriefcaseIcon"
												remixicon="RiBriefcaseLine"
											/>
											<span>Portfolio</span>
										</SidebarMenuButton>
										<SidebarMenuSub>
											<SidebarMenuSubItem>
												<SidebarMenuSubButton href="#positions">
													Positions
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
											<SidebarMenuSubItem>
												<SidebarMenuSubButton href="#created">
													Created
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										</SidebarMenuSub>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
					<SidebarFooter>
						<span className="px-2 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
							Dewi Lestari
						</span>
					</SidebarFooter>
					<SidebarRail />
				</Sidebar>
				<SidebarInset>
					<header className="flex h-12 items-center gap-2 border-b border-border px-3">
						<SidebarTrigger />
						<Separator orientation="vertical" className="h-4" />
						<span className="text-sm text-muted-foreground">Dashboard</span>
					</header>
					<div className="flex-1 p-4 text-sm text-muted-foreground">
						Toggle with the button or Cmd/Ctrl+B.
					</div>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
