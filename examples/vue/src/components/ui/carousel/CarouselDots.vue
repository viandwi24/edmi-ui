<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { UnwrapRefCarouselApi } from './interface'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { cn } from '@/lib/utils'
import { useCarousel } from './useCarousel'

// ✦ Position dots: the active slide is a wider --foreground pill.
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { carouselApi } = useCarousel()
const count = ref(0)
const selected = ref(0)
const slides = computed(() => Array.from({ length: count.value }, (_, i) => i))

function update(api: UnwrapRefCarouselApi) {
  if (!api)
    return
  count.value = api.scrollSnapList().length
  selected.value = api.selectedScrollSnap()
}

let off: (() => void) | undefined
watch(
  carouselApi,
  (api) => {
    off?.()
    off = undefined
    if (!api)
      return
    const handler = () => update(api)
    handler()
    api.on('reInit', handler)
    api.on('select', handler)
    off = () => {
      api.off('reInit', handler)
      api.off('select', handler)
    }
  },
  { immediate: true },
)
onBeforeUnmount(() => off?.())
</script>

<template>
  <div
    data-slot="carousel-dots"
    :class="cn('mt-3 flex items-center justify-center gap-1.5', props.class)"
  >
    <button
      v-for="i in slides"
      :key="i"
      type="button"
      :aria-label="`Go to slide ${i + 1}`"
      :aria-current="i === selected"
      :class="cn(
        'h-1.5 rounded-full outline-none transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        i === selected ? 'w-6 bg-foreground' : 'w-1.5 bg-input',
      )"
      @click="carouselApi?.scrollTo(i)"
    />
  </div>
</template>
