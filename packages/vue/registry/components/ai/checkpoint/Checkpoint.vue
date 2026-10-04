<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Separator } from "@/registry/edmi/ui/separator"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  /** ✦ Mono timestamp (or any label) after the line; the `time` slot works too. */
  time?: string
}>()
</script>

<template>
  <div
    data-slot="ai-checkpoint"
    :class="cn('flex items-center gap-2.5 overflow-hidden text-muted-foreground', props.class)"
  >
    <slot />
    <Separator class="flex-1" />
    <span v-if="time || $slots.time" class="shrink-0 font-mono text-[11.5px] text-muted-foreground">
      <slot name="time">{{ time }}</slot>
    </span>
  </div>
</template>
