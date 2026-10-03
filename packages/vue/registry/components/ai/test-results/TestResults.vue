<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import type { TestResultsSummaryData } from "./context"
import { computed, provide, reactive } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { TestResultsContextKey } from "./context"
import TestResultsDuration from "./TestResultsDuration.vue"
import TestResultsHeader from "./TestResultsHeader.vue"
import TestResultsProgress from "./TestResultsProgress.vue"
import TestResultsSummary from "./TestResultsSummary.vue"

const props = defineProps<{
  summary?: TestResultsSummaryData
  class?: HTMLAttributes["class"]
}>()

const context = reactive({
  summary: computed(() => props.summary),
})

provide(TestResultsContextKey, context)
</script>

<template>
  <div
    data-slot="ai-test-results"
    :class="cn('overflow-hidden rounded-xl border border-border bg-card', props.class)"
  >
    <slot>
      <template v-if="props.summary">
        <TestResultsHeader>
          <TestResultsSummary />
          <TestResultsDuration />
        </TestResultsHeader>
        <TestResultsProgress />
      </template>
    </slot>
  </div>
</template>
