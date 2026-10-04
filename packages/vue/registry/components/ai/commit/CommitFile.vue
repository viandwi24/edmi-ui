<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div :class="cn('flex items-center justify-between gap-2 py-1 text-[12.5px]', props.class)">
    <slot />
  </div>
</template>
