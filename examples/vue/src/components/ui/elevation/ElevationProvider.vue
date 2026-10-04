<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { computed, useAttrs } from 'vue'
import { Primitive } from 'reka-ui'
import {
  type ElevationLevel,
  type ElevationMode,
  injectElevationScope,
  provideElevationScope,
} from './context'

const props = defineProps<
  PrimitiveProps & {
    class?: HTMLAttributes['class']
    /** "layered": every role takes its default level; "flat" (default). Inherits the parent scope when omitted. */
    mode?: ElevationMode
    /** Force one level for the whole subtree (wins over `mode`). */
    level?: ElevationLevel
  }
>()

const parent = injectElevationScope()
const scope = computed(() => props.level ?? props.mode ?? parent)
provideElevationScope(() => scope.value)

// Layout-neutral (display: contents) unless a class is passed.
const attrs = useAttrs()
const style = computed(() => (props.class || attrs.style ? undefined : { display: 'contents' }))
</script>

<template>
  <Primitive
    data-slot="elevation-provider"
    :data-elevation="scope"
    :as="as"
    :as-child="asChild"
    :class="props.class"
    :style="style"
  >
    <slot />
  </Primitive>
</template>
