<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { ChevronsUpDown } from "@lucide/vue"
import { useResizeObserver } from "@vueuse/core"
import { ref } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"
import { PopoverTrigger } from "@/registry/edmi/ui/popover"
import { useMicSelector } from "./context"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()

const { setWidth } = useMicSelector("MicSelectorTrigger")
const triggerRef = ref<InstanceType<typeof Button> | null>(null)

// Track the trigger width so the list below matches it.
useResizeObserver(triggerRef, (entries) => {
  const entry = entries[0]
  if (!entry)
    return
  const next = (entry.target as HTMLElement).offsetWidth
  if (next)
    setWidth(next)
})
</script>

<template>
  <PopoverTrigger as-child>
    <Button
      ref="triggerRef"
      data-slot="ai-mic-selector-trigger"
      variant="outline"
      :class="cn('justify-start font-normal', props.class)"
    >
      <slot />
      <ChevronsUpDown class="ml-auto size-3.5 shrink-0 text-muted-foreground" />
    </Button>
  </PopoverTrigger>
</template>
