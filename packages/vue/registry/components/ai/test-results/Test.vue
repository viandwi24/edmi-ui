<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { TestStatusType } from "./context"
import { computed, provide, reactive } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { TestContextKey } from "./context"
import TestDuration from "./TestDuration.vue"
import TestName from "./TestName.vue"
import TestStatus from "./TestStatus.vue"

const props = defineProps<{
  name: string
  status: TestStatusType
  duration?: number
  class?: HTMLAttributes["class"]
}>()

const context = reactive({
  name: computed(() => props.name),
  status: computed(() => props.status),
  duration: computed(() => props.duration),
})

provide(TestContextKey, context)
</script>

<template>
  <div
    data-slot="ai-test"
    :data-status="props.status"
    :class="cn('flex flex-wrap items-center gap-x-2 py-[5px] text-[12.5px]', props.class)"
  >
    <slot>
      <TestStatus />
      <TestName />
      <TestDuration v-if="props.duration !== undefined" />
    </slot>
  </div>
</template>
