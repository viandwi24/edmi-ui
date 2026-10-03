<script setup lang="ts">
import type { SplitterResizeHandleEmits, SplitterResizeHandleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { GripVertical } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { SplitterResizeHandle, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<SplitterResizeHandleProps & { class?: HTMLAttributes['class'], withHandle?: boolean }>()
const emits = defineEmits<SplitterResizeHandleEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'withHandle')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <!-- 1px --border line; `withHandle` adds the 12x22 grip chip (kit.css .grip). Reka's data-orientation is the group direction. -->
  <SplitterResizeHandle
    data-slot="resizable-handle"
    v-bind="forwarded"
    :class="cn('relative flex w-px items-center justify-center bg-border outline-none after:absolute after:inset-y-0 after:left-1/2 after:w-2 after:-translate-x-1/2 focus-visible:bg-ring data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-2 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:-translate-y-1/2 data-[orientation=vertical]:after:translate-x-0 [&[data-orientation=vertical]>div]:rotate-90', props.class)"
  >
    <div
      v-if="props.withHandle"
      class="z-10 flex h-[22px] w-3 shrink-0 items-center justify-center rounded-[4px] border border-border bg-card text-muted-foreground"
    >
      <slot>
        <GripVertical class="size-2.5" />
      </slot>
    </div>
  </SplitterResizeHandle>
</template>
