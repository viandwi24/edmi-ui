<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="ai-package-info-header" :class="cn('flex items-center gap-2', props.class)">
    <slot />
  </div>
</template>
