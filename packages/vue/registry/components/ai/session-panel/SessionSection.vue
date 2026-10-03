<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  title: string
}>()
</script>

<template>
  <section data-slot="ai-session-section" :class="cn('flex flex-col', props.class)">
    <h3 class="mb-2.5 text-sm font-normal">
      {{ title }}
    </h3>
    <slot />
  </section>
</template>
