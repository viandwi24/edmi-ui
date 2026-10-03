<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { AcceptableValue } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Command } from "@/registry/edmi/ui/command"
import { DialogContent, DialogDescription, DialogTitle } from "@/registry/edmi/ui/dialog"

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  title?: string
  class?: HTMLAttributes["class"]
}>(), {
  title: "Model Selector",
})
const value = defineModel<AcceptableValue | AcceptableValue[]>()
</script>

<template>
  <DialogContent
    v-bind="$attrs"
    data-slot="ai-model-selector-content"
    :show-close-button="false"
    :class="cn('top-1/3 translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-md', props.class)"
  >
    <DialogTitle class="sr-only">
      {{ props.title }}
    </DialogTitle>
    <DialogDescription class="sr-only">
      Search and pick a model
    </DialogDescription>
    <Command v-model="value" class="rounded-none **:data-[slot=command-input-wrapper]:h-auto">
      <slot />
    </Command>
  </DialogContent>
</template>
