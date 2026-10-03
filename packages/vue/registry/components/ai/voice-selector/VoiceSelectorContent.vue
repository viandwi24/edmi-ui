<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Command } from "@/registry/edmi/ui/command"
import { DialogContent, DialogDescription, DialogTitle } from "@/registry/edmi/ui/dialog"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  title?: string
}>(), { title: "Voice Selector" })
</script>

<template>
  <DialogContent
    data-slot="ai-voice-selector-content"
    :show-close-button="false"
    :class="cn('top-1/3 translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-md', props.class)"
  >
    <DialogTitle class="sr-only">
      {{ title }}
    </DialogTitle>
    <DialogDescription class="sr-only">
      Select a voice from the list
    </DialogDescription>
    <Command class="rounded-none **:data-[slot=command-input-wrapper]:h-10">
      <slot />
    </Command>
  </DialogContent>
</template>
