<script setup lang="ts">
import { Building2Icon, HomeIcon, LayoutDashboardIcon, BookOpenIcon, PlusIcon, SearchIcon, TargetIcon } from "@lucide/vue";
import { Separator } from "@/registry/edmi/ui/separator";
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
} from "@/registry/edmi/ui/sidebar";

const platform = [
  { title: "Dashboard", icon: LayoutDashboardIcon, active: true },
  { title: "Explore", icon: SearchIcon },
  { title: "Feed", icon: BookOpenIcon, badge: "3" },
  { title: "Leaderboard", icon: TargetIcon },
];
</script>

<template>
  <!-- translateZ makes the sidebar's fixed positioning relative to this frame. -->
  <div
    class="relative h-[460px] w-full overflow-hidden rounded-xl border border-border [transform:translateZ(0)] [&_[data-slot=sidebar-container]]:absolute [&_[data-slot=sidebar-container]]:h-full"
  >
    <SidebarProvider class="h-full min-h-0">
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="stockbreak">
                <HomeIcon />
                <span class="font-semibold">stockbreak</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem v-for="item in platform" :key="item.title">
                  <SidebarMenuButton :is-active="item.active" :tooltip="item.title">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge v-if="item.badge">{{ item.badge }}</SidebarMenuBadge>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>You</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Create index">
                    <PlusIcon />
                    <span>Create index</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Portfolio">
                    <Building2Icon />
                    <span>Portfolio</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#positions">Positions</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#created">Created</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <span class="px-2 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">Dewi Lestari</span>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header class="flex h-12 items-center gap-2 border-b border-border px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" class="h-4" />
          <span class="text-sm text-muted-foreground">Dashboard</span>
        </header>
        <div class="flex-1 p-4 text-sm text-muted-foreground">Toggle with the button or Cmd/Ctrl+B.</div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
