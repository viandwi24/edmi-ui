<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { MessageBranchContextType } from "./context"
import { provide, readonly, ref } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { MessageBranchKey } from "./context"

const props = withDefaults(defineProps<{
  defaultBranch?: number
  class?: HTMLAttributes["class"]
}>(), {
  defaultBranch: 0,
})

const emits = defineEmits<{
  (e: "branchChange", branchIndex: number): void
}>()

const currentBranch = ref<number>(props.defaultBranch)
const totalBranches = ref<number>(0)

function handleBranchChange(index: number) {
  currentBranch.value = index
  emits("branchChange", index)
}

function goToPrevious() {
  if (totalBranches.value === 0)
    return
  handleBranchChange(currentBranch.value > 0 ? currentBranch.value - 1 : totalBranches.value - 1)
}

function goToNext() {
  if (totalBranches.value === 0)
    return
  handleBranchChange(currentBranch.value < totalBranches.value - 1 ? currentBranch.value + 1 : 0)
}

const contextValue: MessageBranchContextType = {
  currentBranch: readonly(currentBranch),
  totalBranches: readonly(totalBranches),
  goToPrevious,
  goToNext,
  setBranches: (count: number) => {
    totalBranches.value = count
  },
}

provide(MessageBranchKey, contextValue)
</script>

<template>
  <div data-slot="ai-message-branch" :class="cn('grid w-full gap-1.5 [&>div]:pb-0', props.class)">
    <slot />
  </div>
</template>
