<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div
    role="group"
    :class="cn('flex items-center gap-1', props.class)"
    @click.stop
    @keydown.stop
  >
    <slot />
  </div>
</template>
