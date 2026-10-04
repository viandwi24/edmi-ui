<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div :class="cn('flex shrink-0 items-center gap-2 font-mono', props.class)">
    <slot />
  </div>
</template>
