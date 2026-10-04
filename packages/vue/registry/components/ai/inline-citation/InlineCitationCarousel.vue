<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Carousel } from "@/registry/edmi/ui/carousel"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Carousel :class="cn('w-full', props.class)">
    <slot />
  </Carousel>
</template>
