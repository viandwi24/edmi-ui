import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from "@edmi-react/ui/sidebar";

export default function Demo() {
	return (
		<div className="relative h-[320px] w-full overflow-hidden rounded-xl border border-border bg-muted [transform:translateZ(0)] [&_[data-slot=sidebar-container]]:absolute [&_[data-slot=sidebar-container]]:h-full">
			<SidebarProvider className="h-full min-h-0">
				<Sidebar variant="floating" collapsible="none">
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>Settings</SidebarGroupLabel>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton isActive>Profile</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton>Wallets</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>
				<SidebarInset className="p-4 text-sm text-muted-foreground">
					Floating variant, not collapsible.
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
