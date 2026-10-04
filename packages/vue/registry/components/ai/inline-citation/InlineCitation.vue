<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span data-slot="ai-inline-citation" :class="cn('group/citation inline items-center gap-1', props.class)">
    <slot />
  </span>
</template>
