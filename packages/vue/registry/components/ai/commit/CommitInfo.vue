<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div :class="cn('flex min-w-0 flex-1 flex-col gap-0.5', props.class)">
    <slot />
  </div>
</template>
