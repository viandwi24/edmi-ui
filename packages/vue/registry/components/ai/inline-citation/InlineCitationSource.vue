<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  title?: string
  url?: string
  description?: string
  class?: HTMLAttributes["class"]
}>()

const shownUrl = computed(() => props.url?.replace(/^https?:\/\//, ""))
</script>

<template>
  <div data-slot="ai-inline-citation-source" :class="cn('space-y-0.5', props.class)">
    <h4 v-if="title" class="truncate text-[13.5px] leading-tight font-semibold">
      {{ title }}
    </h4>
    <p v-if="shownUrl" class="truncate font-mono text-[11.5px] text-muted-foreground">
      {{ shownUrl }}
    </p>
    <p v-if="description" class="line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">
      {{ description }}
    </p>
    <slot />
  </div>
</template>
