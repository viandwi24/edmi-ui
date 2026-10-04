<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div :class="cn('mt-3 border-t border-border-2 pt-3', props.class)">
    <slot />
  </div>
</template>
