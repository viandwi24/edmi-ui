<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  /** ✦ one-step 3D look: hard strong lip, body gets a top highlight */
  raised?: boolean
}>(), { raised: false })
</script>

<template>
  <div
    data-slot="inset-panel"
    :class="cn('group/inset-panel flex flex-col overflow-hidden rounded-2xl border border-border bg-muted', props.raised && 'border-b-lip-strong shadow-dialog [&_[data-slot=inset-panel-body]]:shadow-[inset_0_1px_0_var(--card-hi)]', props.class)"
  >
    <slot />
  </div>
</template>
