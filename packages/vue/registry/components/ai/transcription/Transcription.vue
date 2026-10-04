<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { TranscriptionSegment } from "./context"
import { useVModel } from "@vueuse/core"
import { computed, getCurrentInstance, provide } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { TranscriptionKey } from "./context"

const props = withDefaults(defineProps<{
  segments: TranscriptionSegment[]
  currentTime?: number
  class?: HTMLAttributes["class"]
}>(), { currentTime: undefined })

const emit = defineEmits<{
  (e: "update:currentTime", time: number): void
  (e: "seek", time: number): void
}>()

const model = useVModel(props, "currentTime", emit, { defaultValue: 0, passive: true })
const currentTime = computed({
  get: () => model.value ?? 0,
  set: (time: number) => { model.value = time },
})

// Segments are clickable only when somebody listens for `seek` or `update:currentTime`.
const vnodeProps = getCurrentInstance()?.vnode.props ?? {}
const seekable = "onSeek" in vnodeProps || "onUpdate:currentTime" in vnodeProps

provide(TranscriptionKey, {
  segments: computed(() => props.segments),
  currentTime,
  onSeek: seekable
    ? (time: number) => {
        currentTime.value = time
        emit("seek", time)
      }
    : undefined,
})
</script>

<template>
  <div
    data-slot="ai-transcription"
    :class="cn('flex flex-wrap gap-x-1 gap-y-0.5 text-[15px] leading-[1.9]', props.class)"
  >
    <template v-for="(segment, index) in props.segments" :key="`${segment.startSecond}-${segment.endSecond}`">
      <slot v-if="segment.text.trim()" :segment="segment" :index="index" />
    </template>
  </div>
</template>
