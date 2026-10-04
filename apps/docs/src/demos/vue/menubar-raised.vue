<script setup lang="ts">
import { ref } from "vue";
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

const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }] as const;
const sidebar = ref(true);
const grid = ref(false);
</script>

<template>
  <div class="flex flex-col gap-5">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
        <Menubar :elevation="level.value">
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
                <MenubarCheckboxItem v-model="sidebar">Show sidebar</MenubarCheckboxItem>
                <MenubarCheckboxItem v-model="grid">Show grid</MenubarCheckboxItem>
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
    </div>
  </div>
</template>
