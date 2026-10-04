<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <h3 :class="cn('text-[13.5px] font-semibold', props.class)">
    <slot>Environment variables</slot>
  </h3>
</template>
