<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from "reka-ui"
import { computed } from "vue"
import { cn } from '@/lib/utils'
import { type Elevation, useElevation } from '@/components/ui/elevation'

// Array value: 1 = single, 2 = range, 3+ = multiple thumbs.
const props = withDefaults(defineProps<SliderRootProps & { class?: HTMLAttributes["class"], elevation?: Elevation }>(), { elevation: undefined })
const emits = defineEmits<SliderRootEmits>()

const delegatedProps = reactiveOmit(props, "class", "elevation")

const level = useElevation(() => props.elevation, "handle")
const raised = computed(() => level.value === "raised" || level.value === "floating")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SliderRoot
    v-slot="{ modelValue }"
    data-slot="slider"
    :class="
      cn(
        'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        props.class,
      )
    "
    v-bind="forwarded"
  >
    <SliderTrack
      data-slot="slider-track"
      class="relative grow overflow-hidden rounded-full border border-border bg-muted select-none data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
    >
      <SliderRange
        data-slot="slider-range"
        class="absolute rounded-full bg-brand select-none data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
      />
    </SliderTrack>

    <SliderThumb
      v-for="(_, key) in modelValue"
      :key="key"
      data-slot="slider-thumb"
      :class="cn(
        'relative block size-[18px] shrink-0 rounded-full border border-brand-edge bg-white transition-shadow outline-none select-none after:absolute after:-inset-2 focus-visible:shadow-[0_0_0_4px_var(--ring-soft)] data-[dragging]:shadow-[0_0_0_4px_var(--ring-soft)] active:shadow-[0_0_0_4px_var(--ring-soft)] disabled:pointer-events-none',
        raised && 'border-transparent bg-linear-to-b from-white to-[#eeede9] shadow-thumb focus-visible:shadow-[0_0_0_4px_var(--ring-soft),0_0_1.5px_rgb(0_0_0/0.45)] data-[dragging]:shadow-[0_0_0_4px_var(--ring-soft),0_0_1.5px_rgb(0_0_0/0.45)] active:shadow-[0_0_0_4px_var(--ring-soft),0_0_1.5px_rgb(0_0_0/0.45)]',
      )"
    />
  </SliderRoot>
</template>
