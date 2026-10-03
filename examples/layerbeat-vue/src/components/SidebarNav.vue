<script setup lang="ts">
import {
	PhArrowUpRight,
	PhCreditCard,
	PhFileText,
	PhHardDrives,
	PhHouse,
	PhKey,
	PhSidebarSimple,
	PhUsersThree,
} from "@phosphor-icons/vue";
import Logo from "@/components/Logo.vue";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

defineProps<{ collapsible?: boolean }>();
defineEmits<{ collapse: [] }>();

const platform = [
	{ label: "Overview", icon: PhHouse },
	{ label: "BeatVPS", icon: PhHardDrives, active: true, badge: "1" },
	{ label: "Billing", icon: PhCreditCard },
];
const workspace = [
	{ label: "Access & keys", icon: PhKey },
	{ label: "Team", icon: PhUsersThree },
];
const activeClass =
	"data-[active=true]:bg-white/9 data-[active=true]:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--brand)_55%,transparent)]";
</script>

<template>
	<SidebarHeader class="flex-row items-center justify-between px-3 pt-[18px] pb-4">
		<a href="#/" class="flex items-center gap-2 font-brand text-xl font-semibold tracking-[-0.4px] text-white">
			<Logo class="size-6" />
			Layerbeat
		</a>
		<Button v-if="collapsible" variant="ghost" size="icon-sm" class="text-sidebar-foreground/70" aria-label="Collapse sidebar" @click="$emit('collapse')">
			<PhSidebarSimple />
		</Button>
	</SidebarHeader>
	<SidebarContent>
		<SidebarGroup>
			<SidebarGroupLabel class="text-[11px] tracking-[0.6px] uppercase">Platform</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					<SidebarMenuItem v-for="item in platform" :key="item.label">
						<SidebarMenuButton as-child :is-active="item.active" :class="['h-9', activeClass]">
							<a :href="`#${item.label}`">
								<component :is="item.icon" :class="item.active ? '' : 'text-muted-foreground'" />
								<span class="flex-1">{{ item.label }}</span>
								<Badge v-if="item.badge" variant="secondary" shape="number" class="h-5">{{ item.badge }}</Badge>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
		<SidebarGroup>
			<SidebarGroupLabel class="text-[11px] tracking-[0.6px] uppercase">Workspace</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					<SidebarMenuItem v-for="item in workspace" :key="item.label">
						<SidebarMenuButton as-child class="h-9">
							<a :href="`#${item.label}`">
								<component :is="item.icon" class="text-muted-foreground" />
								<span>{{ item.label }}</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	</SidebarContent>
	<SidebarFooter>
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton as-child class="h-9">
					<a href="#docs">
						<PhFileText class="text-muted-foreground" />
						<span class="flex-1">API documentation</span>
						<PhArrowUpRight class="text-muted-foreground" />
					</a>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	</SidebarFooter>
</template>
