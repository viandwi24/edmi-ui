<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

// Four tones of the board identicon: columns repeat muted-2 / muted / foreground-2 / empty.
const TONES = ['bg-muted-foreground-2', 'bg-muted-foreground', 'bg-foreground-2', 'bg-transparent']

function hash(seed: string) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  /** Deterministic seed (agent name or address). */
  seed: string
  /** Edge length in px. */
  size?: number
}>(), { size: 44 })

const cells = computed(() => {
  let h = hash(props.seed)
  return Array.from({ length: 25 }, (_, i) => {
    if (i % 5 === 0) h = hash(`${props.seed}:${i}:${h}`)
    return TONES[(h >>> ((i % 5) * 2)) & 3]
  })
})
</script>

<template>
  <!-- 5x5 token-colored identicon, deterministic per `seed`. -->
  <div
    data-slot="agent-identicon"
    aria-hidden="true"
    :class="cn('grid shrink-0 grid-cols-5 overflow-hidden rounded-xl border border-border bg-muted', props.class)"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <span v-for="(tone, i) in cells" :key="i" :class="tone" />
  </div>
</template>
