import {
	ArrowClockwiseIcon,
	ArrowUpRightIcon,
	CaretDownIcon,
	CaretUpDownIcon,
	CreditCardIcon,
	FileTextIcon,
	HouseIcon,
	KeyIcon,
	MoonIcon,
	StackIcon,
	SunIcon,
	UsersThreeIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { LogoMark } from "@/components/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
	SidebarProvider,
	SidebarTrigger,
	useSidebar,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { workspaces } from "@/data/layerbeat";
import { getTheme, setTheme } from "@/lib/theme";

type NavItem = {
	label: string;
	icon: typeof HouseIcon;
	active?: boolean;
	badge?: string;
};

const platform: NavItem[] = [
	{ label: "Overview", icon: HouseIcon },
	{ label: "BeatVPS", icon: StackIcon, active: true, badge: "1" },
	{ label: "Billing", icon: CreditCardIcon },
];
const workspace: NavItem[] = [
	{ label: "Access & keys", icon: KeyIcon },
	{ label: "Team", icon: UsersThreeIcon },
];

// The sidebar subtree carries its own `dark` class: it stays navy in light mode (DESIGN §3, scoped theming).
function AppSidebar() {
	return (
		<Sidebar collapsible="offcanvas">
			<div className="dark flex h-full w-full flex-col bg-[#0b2a6f] text-sidebar-foreground">
				<SidebarHeader className="flex-row items-center justify-between px-4 pt-5 pb-3">
					<a
						href="#/"
						data-edmi-wordmark
						className="flex items-center gap-2 text-xl font-semibold tracking-[-0.4px] text-white"
					>
						<LogoMark />
						Layerbeat
					</a>
					<SidebarTrigger className="text-muted-foreground hover:bg-[color-mix(in_srgb,white_10%,var(--sidebar))] hover:text-foreground" />
				</SidebarHeader>
				<SidebarContent className="px-2">
					{[
						{ label: "Platform", items: platform },
						{ label: "Workspace", items: workspace },
					].map((group) => (
						<SidebarGroup key={group.label}>
							<SidebarGroupLabel className="text-[11.5px] tracking-[0.6px] uppercase">
								{group.label}
							</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{group.items.map((item) => (
										<SidebarMenuItem key={item.label}>
											<SidebarMenuButton
												isActive={item.active}
												className="h-9 text-muted-foreground hover:bg-[color-mix(in_srgb,white_5%,var(--sidebar))] data-[active]:bg-[color-mix(in_srgb,white_9%,var(--sidebar))] data-[active]:text-foreground data-[active]:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--brand)_55%,var(--sidebar))]"
												render={<a href="#/" />}
											>
												<item.icon />
												<span>{item.label}</span>
											</SidebarMenuButton>
											{item.badge ? (
												<SidebarMenuBadge className="rounded-md border border-border bg-secondary text-secondary-foreground">
													{item.badge}
												</SidebarMenuBadge>
											) : null}
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					))}
				</SidebarContent>
				<SidebarFooter className="px-2 pb-4">
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								className="h-9 text-muted-foreground hover:bg-[color-mix(in_srgb,white_5%,var(--sidebar))]"
								render={<a href="#/api" />}
							>
								<FileTextIcon />
								<span className="flex-1">API documentation</span>
								<ArrowUpRightIcon className="size-3.5!" />
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
			</div>
		</Sidebar>
	);
}

function ModeSwitch() {
	const [dark, setDark] = useState(() => getTheme() === "dark");
	return (
		<div className="flex items-center gap-2 text-muted-foreground">
			<SunIcon className="size-4" aria-hidden />
			<Switch
				aria-label="Dark mode"
				checked={dark}
				onCheckedChange={(next) => {
					setDark(next);
					setTheme(next ? "dark" : "light");
				}}
			/>
			<MoonIcon className="size-4" aria-hidden />
		</div>
	);
}

function WorkspaceSwitcher() {
	const [current, setCurrent] = useState(workspaces[0]);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={<Button variant="ghost" className="gap-2.5 px-2 font-medium" />}
			>
				<LogoMark className="size-[18px]" />
				{current}
				<CaretUpDownIcon className="text-muted-foreground" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="min-w-48">
				<DropdownMenuLabel>Workspaces</DropdownMenuLabel>
				{workspaces.map((w) => (
					<DropdownMenuItem key={w} onClick={() => setCurrent(w)}>
						{w}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

// The sidebar owns the toggle while it is open on desktop; the header takes over when it is closed or on mobile.
function HeaderTrigger() {
	const { isMobile, state } = useSidebar();
	return isMobile || state === "collapsed" ? <SidebarTrigger /> : null;
}

export function AppShell({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider
			className="h-svh min-h-0 overflow-hidden"
			style={{ "--sidebar-width": "15rem" } as React.CSSProperties}
		>
			<AppSidebar />
			<SidebarInset className="min-h-0 min-w-0 overflow-hidden bg-background">
				<header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-card px-4 md:px-7">
					<div className="flex min-w-0 items-center gap-1">
						<HeaderTrigger />
						<WorkspaceSwitcher />
						<span className="px-1 text-muted-foreground max-sm:hidden">/</span>
						<span className="text-muted-foreground max-sm:hidden">BeatVPS</span>
					</div>
					<div className="flex items-center gap-3 sm:gap-[18px]">
						<span className="flex items-center gap-[7px] text-[13px] text-muted-foreground max-md:hidden">
							<span className="size-1.5 rounded-full bg-success" />
							Connected
						</span>
						<ModeSwitch />
						<Button variant="ghost" size="sm" className="max-sm:hidden">
							<ArrowClockwiseIcon />
							Refresh
						</Button>
						<div className="flex items-center gap-1.5">
							<Avatar className="size-8">
								<AvatarFallback className="text-xs">AR</AvatarFallback>
							</Avatar>
							<CaretDownIcon className="size-3.5 text-muted-foreground max-sm:hidden" />
						</div>
					</div>
				</header>
				<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
