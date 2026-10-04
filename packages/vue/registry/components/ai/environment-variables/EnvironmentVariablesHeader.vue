<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div :class="cn('flex items-center justify-between px-3.5 py-2.5', props.class)">
    <slot />
  </div>
</template>
