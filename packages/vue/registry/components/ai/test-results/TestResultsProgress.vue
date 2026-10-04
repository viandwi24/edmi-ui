<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useTestResultsContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const context = useTestResultsContext()

const running = computed(() => {
  const s = context.summary
  return s ? Math.max(s.total - s.passed - s.failed - s.skipped, 0) : 0
})
</script>

<template>
  <div
    v-if="context.summary"
    data-slot="ai-test-results-progress"
    :class="cn('-mt-0.5 px-4 pb-3.5', props.class)"
  >
    <slot>
      <div
        class="flex h-1.5 gap-0.5"
        role="img"
        :aria-label="`${context.summary.passed} of ${context.summary.total} tests passed`"
      >
        <span v-if="context.summary.passed > 0" class="rounded-[3px] bg-success" :style="{ flex: context.summary.passed }" />
        <span v-if="context.summary.failed > 0" class="rounded-[3px] bg-destructive" :style="{ flex: context.summary.failed }" />
        <span v-if="context.summary.skipped > 0" class="rounded-[3px] bg-warning" :style="{ flex: context.summary.skipped }" />
        <span v-if="running > 0" class="rounded-[3px] bg-muted" :style="{ flex: running }" />
      </div>
    </slot>
  </div>
</template>
