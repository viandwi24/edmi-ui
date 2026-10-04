<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Badge } from "@/registry/edmi/ui/badge"
import { HoverCardTrigger } from "@/registry/edmi/ui/hover-card"

const props = defineProps<{
  /** Source URLs; shows the first host and `+N`. */
  sources: string[]
  class?: HTMLAttributes["class"]
}>()

const displayText = computed(() => {
  const first = props.sources[0]
  if (!first)
    return "unknown"
  let host = first
  try {
    host = new URL(first).hostname.replace(/^www\./, "")
  }
  catch {}
  const more = props.sources.length - 1
  return more > 0 ? `${host} +${more}` : host
})
</script>

<template>
  <HoverCardTrigger as-child>
    <Badge
      as="span"
      data-slot="ai-inline-citation-trigger"
      shape="pill"
      variant="secondary"
      :class="cn('ml-1 h-5 cursor-default px-[7px] align-[1px] text-[11.5px] font-normal text-foreground-2', props.class)"
    >
      {{ displayText }}
    </Badge>
  </HoverCardTrigger>
</template>
