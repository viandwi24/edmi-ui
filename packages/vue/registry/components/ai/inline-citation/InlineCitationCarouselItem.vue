<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CarouselItem } from "@/registry/edmi/ui/carousel"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <!-- CarouselContent has a -ml-4 gutter, so the left padding is gutter (16) + content inset (14). -->
  <CarouselItem :class="cn('w-full space-y-1 py-3 pr-3.5 pl-[30px]', props.class)">
    <slot />
  </CarouselItem>
</template>
