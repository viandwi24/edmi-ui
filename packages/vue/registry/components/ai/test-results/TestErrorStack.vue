<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <pre :class="cn('mt-2 overflow-auto font-mono text-xs', props.class)"><slot /></pre>
</template>
