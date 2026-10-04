<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div :class="cn('grid grid-cols-[190px_auto_minmax(0,1fr)_auto] gap-x-2.5', props.class)">
    <slot />
  </div>
</template>
