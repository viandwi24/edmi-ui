<script setup lang="ts">
import type { Component, HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  /** Icon component; the `icon` slot works too. Defaults to a small dot. */
  icon?: Component
  label?: string
  description?: string
  status?: "complete" | "active" | "pending"
}>(), {
  status: "complete",
})

// Icon colour and label colour per status (board AI 02): complete = muted icon, soft label; active = brand icon,
// foreground label; pending = faint.
const iconStyles = {
  active: "text-brand",
  complete: "text-muted-foreground",
  pending: "text-muted-foreground-2",
}
const labelStyles = {
  active: "text-foreground",
  complete: "text-foreground-2",
  pending: "text-muted-foreground-2",
}
</script>

<template>
  <div
    data-slot="ai-chain-of-thought-step"
    :data-status="status"
    :class="cn(
      'group/step relative grid grid-cols-[22px_1fr] gap-2.5 pb-3.5 text-[13.5px] last:pb-0',
      props.class,
    )"
  >
    <span
      :class="cn(
        'relative z-10 inline-flex size-[22px] items-center justify-center rounded-full bg-card [&_svg]:size-3.5',
        iconStyles[status],
      )"
    >
      <slot name="icon">
        <component :is="icon" v-if="icon" />
        <span v-else class="size-1.5 rounded-full bg-current" />
      </slot>
    </span>
    <span class="absolute top-6 -bottom-2 left-[10.5px] w-px bg-border group-last/step:hidden" />
    <div class="min-w-0 space-y-2">
      <div :class="labelStyles[status]">
        <slot name="label">
          {{ label }}
        </slot>
      </div>
      <div v-if="description || $slots.description" class="-mt-1.5 text-xs text-muted-foreground">
        <slot name="description">
          {{ description }}
        </slot>
      </div>
      <slot />
    </div>
  </div>
</template>
