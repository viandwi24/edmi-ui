<script setup lang="ts">
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@edmi-vue/ui/menubar";
</script>

<template>
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarGroup>
          <MenubarItem>
            New index <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>Open…</MenubarItem>
        </MenubarGroup>
        <MenubarSeparator />
        <MenubarItem variant="destructive">Discard draft</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>View</MenubarTrigger>
      <MenubarContent>
        <MenubarGroup>
          <MenubarCheckboxItem :default-value="true">Show sidebar</MenubarCheckboxItem>
          <MenubarCheckboxItem>Show grid</MenubarCheckboxItem>
        </MenubarGroup>
        <MenubarSeparator />
        <MenubarItem>
          Zoom in <MenubarShortcut>⌘+</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>
          Zoom out <MenubarShortcut>⌘-</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Help</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>Docs</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
