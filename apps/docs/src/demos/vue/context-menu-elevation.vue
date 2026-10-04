<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@edmi-vue/ui/context-menu";

const levels = [{ value: "flat", label: "Flat" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <ContextMenu v-for="level in levels" :key="level.value">
      <ContextMenuTrigger class="flex h-28 w-48 select-none items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
        Right-click: {{ level.label }}
      </ContextMenuTrigger>
      <ContextMenuContent :elevation="level.value" class="w-52">
        <ContextMenuGroup>
          <ContextMenuItem>Open</ContextMenuItem>
          <ContextMenuItem>
            Copy address <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Hide index</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </div>
</template>
