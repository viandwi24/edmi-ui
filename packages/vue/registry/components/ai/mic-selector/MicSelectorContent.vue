<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { PopoverContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Command } from "@/registry/edmi/ui/command"
import { PopoverContent } from "@/registry/edmi/ui/popover"
import { useMicSelector } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  popoverOptions?: PopoverContentProps & { class?: HTMLAttributes["class"] }
}>()

const { width } = useMicSelector("MicSelectorContent")
</script>

<template>
  <PopoverContent
    data-slot="ai-mic-selector-content"
    align="start"
    v-bind="props.popoverOptions"
    :class="cn('w-auto gap-0 overflow-hidden p-0', props.popoverOptions?.class)"
    :style="{ width: `${width}px`, minWidth: '320px' }"
  >
    <Command :class="cn('rounded-xl **:data-[slot=command-input-wrapper]:h-10', props.class)">
      <slot />
    </Command>
  </PopoverContent>
</template>
