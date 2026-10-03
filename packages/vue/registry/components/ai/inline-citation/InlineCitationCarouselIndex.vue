<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { computed, ref, watch } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useCarousel } from "@/registry/edmi/ui/carousel"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { carouselApi } = useCarousel()
const current = ref(0)
const count = ref(0)

const displayText = computed(() => `${current.value}/${count.value}`)

function updateState() {
  const api = carouselApi.value
  if (!api)
    return
  count.value = api.scrollSnapList().length
  current.value = api.selectedScrollSnap() + 1
}

watch(carouselApi, (api, _, onCleanup) => {
  if (!api)
    return
  updateState()
  api.on("select", updateState)
  api.on("reInit", updateState)
  onCleanup(() => {
    api.off("select", updateState)
    api.off("reInit", updateState)
  })
}, { immediate: true })
</script>

<template>
  <div :class="cn('ml-auto font-mono text-xs text-muted-foreground tabular-nums', props.class)">
    <slot>{{ displayText }}</slot>
  </div>
</template>
