<script setup lang="ts">
import {
	ArrowUpRightIcon,
	CreditCardIcon,
	FileTextIcon,
	HomeIcon,
	LockKeyholeIcon,
	ServerIcon,
	UserIcon,
} from "@lucide/vue";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from "@edmi-vue/ui/sidebar";
import LogoMark from "./LogoMark.vue";

type NavItem = { label: string; icon: string; active?: boolean; badge?: string };
defineProps<{ platform: readonly NavItem[]; workspace: readonly NavItem[] }>();

const icons: Record<string, unknown> = {
	home: HomeIcon,
	server: ServerIcon,
	billing: CreditCardIcon,
	key: LockKeyholeIcon,
	team: UserIcon,
};
</script>

<template>
	<Sidebar collapsible="offcanvas">
		<!-- The sidebar subtree carries its own `dark` class: it stays navy in light mode (scoped theming). -->
		<div class="dark flex h-full w-full flex-col bg-[#0b2a6f] text-sidebar-foreground">
			<SidebarHeader class="flex-row items-center justify-between px-4 pt-5 pb-3">
				<a href="#/" class="flex items-center gap-2 font-brand text-xl font-semibold tracking-[-0.4px] text-white">
					<LogoMark class="size-6" />
					Layerbeat
				</a>
				<SidebarTrigger class="text-muted-foreground hover:bg-[color-mix(in_srgb,white_10%,#0b2a6f)] hover:text-foreground" />
			</SidebarHeader>
			<SidebarContent class="px-2">
				<SidebarGroup v-for="group in [{ label: 'Platform', items: platform }, { label: 'Workspace', items: workspace }]" :key="group.label">
					<SidebarGroupLabel class="text-[11.5px] tracking-[0.6px] uppercase">{{ group.label }}</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem v-for="item in group.items" :key="item.label">
								<SidebarMenuButton
									as-child
									:is-active="item.active"
									class="h-9 text-muted-foreground hover:bg-[color-mix(in_srgb,white_5%,#0b2a6f)] data-[active=true]:bg-[color-mix(in_srgb,white_9%,#0b2a6f)] data-[active=true]:text-foreground data-[active=true]:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--brand)_55%,#0b2a6f)]"
								>
									<a href="#/">
										<component :is="icons[item.icon]" />
										<span>{{ item.label }}</span>
									</a>
								</SidebarMenuButton>
								<SidebarMenuBadge v-if="item.badge" class="rounded-md border border-border bg-secondary text-secondary-foreground">{{ item.badge }}</SidebarMenuBadge>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter class="px-2 pb-4">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton as-child class="h-9 text-muted-foreground hover:bg-[color-mix(in_srgb,white_5%,#0b2a6f)]">
							<a href="#/api">
								<FileTextIcon />
								<span class="flex-1">API documentation</span>
								<ArrowUpRightIcon class="size-3.5!" />
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</div>
	</Sidebar>
</template>
