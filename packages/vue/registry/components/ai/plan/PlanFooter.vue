<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CardFooter } from "@/registry/edmi/ui/card"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <CardFooter data-slot="ai-plan-footer" :class="cn('px-4 py-2.5', props.class)">
    <slot />
  </CardFooter>
</template>
