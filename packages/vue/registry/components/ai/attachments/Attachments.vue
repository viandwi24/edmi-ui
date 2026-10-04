<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { AttachmentVariant } from "./types"
import { computed, provide } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { AttachmentsKey } from "./context"

const props = withDefaults(defineProps<{
  variant?: AttachmentVariant
  class?: HTMLAttributes["class"]
}>(), {
  variant: "grid",
})

const variant = computed(() => props.variant)
provide(AttachmentsKey, { variant })
</script>

<template>
  <div
    data-slot="ai-attachments"
    :data-variant="variant"
    :class="cn(
      'flex items-start',
      variant === 'list' ? 'w-full flex-col gap-2' : 'flex-wrap gap-2',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
