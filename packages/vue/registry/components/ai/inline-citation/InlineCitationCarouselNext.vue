<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { ChevronRightIcon } from "@lucide/vue"
import { Button } from "@/registry/edmi/ui/button"
import { useCarousel } from "@/registry/edmi/ui/carousel"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { scrollNext } = useCarousel()
</script>

<template>
  <Button
    type="button"
    variant="ghost"
    size="icon-xs"
    aria-label="Next"
    :class="props.class"
    @click="scrollNext"
  >
    <slot><ChevronRightIcon /></slot>
  </Button>
</template>
