<script setup lang="ts">
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@edmi-vue/ui/menubar";
</script>

<template>
  <div class="flex flex-col gap-4">
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent><MenubarItem>New index</MenubarItem></MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent><MenubarItem>Zoom in</MenubarItem></MenubarContent>
      </MenubarMenu>
    </Menubar>
    <Menubar raised>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent><MenubarItem>New index</MenubarItem></MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent><MenubarItem>Zoom in</MenubarItem></MenubarContent>
      </MenubarMenu>
    </Menubar>
  </div>
</template>
