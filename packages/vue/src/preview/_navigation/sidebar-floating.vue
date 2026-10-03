<script setup lang="ts">
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
} from "@/registry/edmi/ui/sidebar";
</script>

<template>
  <div
    class="relative h-[320px] w-full overflow-hidden rounded-xl border border-border bg-muted [transform:translateZ(0)] [&_[data-slot=sidebar-container]]:absolute [&_[data-slot=sidebar-container]]:h-full"
  >
    <SidebarProvider class="h-full min-h-0">
      <Sidebar variant="floating" collapsible="none">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton is-active>Profile</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>Wallets</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset class="p-4 text-sm text-muted-foreground">Floating variant, not collapsible.</SidebarInset>
    </SidebarProvider>
  </div>
</template>
