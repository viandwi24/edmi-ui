<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useStackTraceContext } from "./context"
import { AT_PREFIX_REGEX } from "./utils"

const props = withDefaults(defineProps<{
  showInternalFrames?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  showInternalFrames: true,
})

const { trace, onFilePathClick } = useStackTraceContext("StackTraceFrames")

const framesToShow = computed(() =>
  props.showInternalFrames
    ? trace.value.frames
    : trace.value.frames.filter(f => !f.isInternal))
</script>

<template>
  <div data-slot="ai-stack-trace-frames" :class="cn('px-3.5 py-3', props.class)">
    <div
      v-for="(frame, index) in framesToShow"
      :key="`${frame.raw}-${index}`"
      :class="cn('flex items-center gap-2 text-xs leading-[1.9]', frame.isInternal && 'opacity-50')"
    >
      <span class="text-muted-foreground">at</span>
      <span v-if="frame.functionName" class="text-foreground">{{ frame.functionName }}</span>
      <button
        v-if="frame.filePath"
        type="button"
        :disabled="!onFilePathClick"
        :class="cn(
          'text-muted-foreground',
          !frame.isInternal && 'underline underline-offset-[3px]',
          onFilePathClick && 'cursor-pointer hover:text-foreground',
        )"
        @click="onFilePathClick?.(frame.filePath, frame.lineNumber ?? undefined, frame.columnNumber ?? undefined)"
      >
        {{ frame.filePath }}<template v-if="frame.lineNumber !== null">:{{ frame.lineNumber }}</template><template v-if="frame.columnNumber !== null">:{{ frame.columnNumber }}</template>
      </button>
      <span v-else-if="!frame.functionName">{{ frame.raw.replace(AT_PREFIX_REGEX, "") }}</span>
    </div>
    <div v-if="framesToShow.length === 0" class="text-xs text-muted-foreground">
      No stack frames
    </div>
  </div>
</template>
