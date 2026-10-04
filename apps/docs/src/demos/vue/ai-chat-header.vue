<script setup lang="ts">
import { FileTextIcon, GlobeIcon } from "@lucide/vue";
import {
  ChatHeader,
  ChatHeaderActions,
  ChatHeaderMenu,
  ChatHeaderProject,
  ChatHeaderShare,
  ChatHeaderTitle,
} from "@edmi-vue/components/ai/chat-header";
import { Button } from "@edmi-vue/ui/button";
import { DropdownMenuItem } from "@edmi-vue/ui/dropdown-menu";
</script>

<template>
  <ChatHeader class="max-w-3xl">
    <ChatHeaderTitle>
      <span class="truncate">Keeper starter plan</span>
      <ChatHeaderProject status="connected" />
      <ChatHeaderMenu>
        <DropdownMenuItem>Rename</DropdownMenuItem>
        <DropdownMenuItem>Move to project</DropdownMenuItem>
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </ChatHeaderMenu>
    </ChatHeaderTitle>
    <ChatHeaderActions>
      <Button aria-label="Web access" size="icon-sm" type="button" variant="ghost">
        <GlobeIcon class="size-4" />
      </Button>
      <Button aria-label="1 attached file" size="sm" type="button" variant="ghost">
        <FileTextIcon class="size-3.5" />
        1
      </Button>
      <ChatHeaderShare />
    </ChatHeaderActions>
  </ChatHeader>
</template>
