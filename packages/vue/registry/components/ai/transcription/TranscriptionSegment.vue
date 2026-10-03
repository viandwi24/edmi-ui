<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import type { TranscriptionSegment } from "./context"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useTranscriptionContext } from "./context"

// States: past (--muted-foreground), active (--primary fill), future (--muted-foreground-2).
const props = defineProps<{
  segment: TranscriptionSegment
  index: number
  class?: HTMLAttributes["class"]
}>()

const { currentTime, onSeek } = useTranscriptionContext()

const isActive = computed(() => currentTime.value >= props.segment.startSecond && currentTime.value < props.segment.endSecond)
const isPast = computed(() => currentTime.value >= props.segment.endSecond)

function handleClick() {
  onSeek?.(props.segment.startSecond)
}
</script>

<template>
  <button
    type="button"
    data-slot="ai-transcription-segment"
    :data-active="isActive"
    :data-index="index"
    :class="cn(
      'inline rounded px-[3px] py-0.5 text-left transition-colors',
      isActive && 'bg-primary text-primary-foreground',
      isPast && 'text-muted-foreground',
      !(isActive || isPast) && 'text-muted-foreground-2',
      onSeek && !isActive && 'cursor-pointer hover:text-foreground',
      !onSeek && 'cursor-default',
      props.class,
    )"
    @click="handleClick"
  >
    {{ segment.text }}
  </button>
</template>
