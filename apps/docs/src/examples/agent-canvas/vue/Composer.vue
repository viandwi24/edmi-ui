<script setup lang="ts">
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@edmi-vue/components/ai/prompt-input";
import { Button } from "@edmi-vue/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@edmi-vue/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@edmi-vue/ui/tooltip";
import { atlasAgent, composerMenu, composerPlaceholder, plantHead } from "../data";
import Icon from "./Icon.vue";
import Pixels from "./Pixels.vue";

const emit = defineEmits<{ (e: "send", text: string): void; (e: "clear"): void }>();

function submit(m: { text: string }) {
  if (m.text.trim()) emit("send", m.text.trim());
}
</script>

<template>
  <TooltipProvider>
  <div class="px-2 pb-2">
    <PromptInput @submit="submit">
      <PromptInputHeader>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button type="button" variant="outline" size="sm">
              <Pixels :w="plantHead.w" :h="plantHead.h" :rects="plantHead.rects" class="h-3 w-3.5" />
              {{ atlasAgent.name }}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Atlas agent</TooltipContent>
        </Tooltip>
      </PromptInputHeader>
      <PromptInputBody>
        <PromptInputTextarea :placeholder="composerPlaceholder" />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button type="button" variant="ghost" size="icon-xs" aria-label="Add"><Icon name="plus" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" elevation="floating">
              <DropdownMenuItem v-for="m in composerMenu" :key="m.id" @select="m.id === 'clear' && emit('clear')">
                <Icon :name="m.icon" />
                {{ m.label }}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </PromptInputTools>
        <PromptInputSubmit size="icon-sm" variant="secondary" elevation="raised">
          <Icon name="arrowUp" />
        </PromptInputSubmit>
      </PromptInputFooter>
    </PromptInput>
  </div>
  </TooltipProvider>
</template>
