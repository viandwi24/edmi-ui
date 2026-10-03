<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/edmi/ui/context-menu";
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger
      class="flex h-40 w-72 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground"
    >
      Right-click an index row
    </ContextMenuTrigger>
    <ContextMenuContent class="w-52">
      <ContextMenuGroup>
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem>
          Copy address <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuGroup>
      <ContextMenuSeparator />
      <ContextMenuSub>
        <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem>Copy link</ContextMenuItem>
          <ContextMenuItem>Share card</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSeparator />
      <ContextMenuItem variant="destructive">Hide index</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
