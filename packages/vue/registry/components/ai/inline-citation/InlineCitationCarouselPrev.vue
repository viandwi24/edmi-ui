<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { ChevronLeftIcon } from "@lucide/vue"
import { Button } from "@/registry/edmi/ui/button"
import { useCarousel } from "@/registry/edmi/ui/carousel"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { scrollPrev } = useCarousel()
</script>

<template>
  <Button
    type="button"
    variant="ghost"
    size="icon-xs"
    aria-label="Previous"
    :class="props.class"
    @click="scrollPrev"
  >
    <slot><ChevronLeftIcon /></slot>
  </Button>
</template>
