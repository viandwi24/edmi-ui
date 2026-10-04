<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useAttachmentContext } from "./context"
import { formatSize, getAttachmentLabel } from "./utils"

const props = withDefaults(defineProps<{
  showMediaType?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  showMediaType: false,
})

const { data, variant } = useAttachmentContext()
const label = computed(() => getAttachmentLabel(data.value))
const meta = computed(() =>
  [data.value.mediaType, formatSize(data.value.size)].filter(Boolean).join(" · "))
</script>

<template>
  <div
    data-slot="ai-attachment-info"
    :class="cn('min-w-0', variant === 'grid' ? 'mt-1.5 w-full' : 'flex-1', props.class)"
  >
    <span
      :class="cn(
        'block truncate',
        variant === 'inline' && 'font-medium',
        variant === 'list' && 'text-[13.5px] font-medium',
        variant === 'grid' && 'text-xs text-foreground',
      )"
    >
      {{ label }}
    </span>
    <span v-if="props.showMediaType && meta" class="block truncate text-xs text-muted-foreground">
      {{ meta }}
    </span>
  </div>
</template>
