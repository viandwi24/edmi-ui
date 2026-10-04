<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { GlobeIcon } from "@lucide/vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  href?: string
  title?: string
  class?: HTMLAttributes["class"]
}>()

const host = computed(() => {
  if (!props.href)
    return undefined
  try {
    return new URL(props.href).hostname.replace(/^www\./, "")
  }
  catch {
    return undefined
  }
})
</script>

<template>
  <a
    data-slot="ai-source"
    :class="cn('flex items-center gap-2 text-foreground', props.class)"
    :href="href"
    rel="noreferrer"
    target="_blank"
  >
    <slot>
      <GlobeIcon class="size-3.5 shrink-0 text-muted-foreground" />
      <span class="underline underline-offset-[3px]">{{ title }}</span>
      <span v-if="host" class="font-mono text-[11.5px] text-muted-foreground">{{ host }}</span>
    </slot>
  </a>
</template>
