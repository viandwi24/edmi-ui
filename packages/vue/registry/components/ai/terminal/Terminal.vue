<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, getCurrentInstance, provide } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { TerminalKey } from "./context"
import TerminalActions from "./TerminalActions.vue"
import TerminalClearButton from "./TerminalClearButton.vue"
import TerminalContent from "./TerminalContent.vue"
import TerminalCopyButton from "./TerminalCopyButton.vue"
import TerminalHeader from "./TerminalHeader.vue"
import TerminalStatus from "./TerminalStatus.vue"
import TerminalTitle from "./TerminalTitle.vue"

const props = withDefaults(defineProps<{
  output: string
  isStreaming?: boolean
  autoScroll?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  isStreaming: false,
  autoScroll: true,
})

const emit = defineEmits<{
  (e: "clear"): void
}>()

const instance = getCurrentInstance()

// The clear button only shows when the parent listens to `clear`.
const hasClear = computed(() => !!instance?.vnode.props?.onClear)

provide(TerminalKey, {
  output: computed(() => props.output),
  isStreaming: computed(() => props.isStreaming),
  autoScroll: computed(() => props.autoScroll),
  hasClear,
  onClear: () => emit("clear"),
})
</script>

<template>
  <!-- Always dark, never themed: fixed oklch literals (ai.css .ai-term). -->
  <div
    data-slot="ai-terminal"
    :class="cn(
      'flex flex-col overflow-hidden rounded-[calc(var(--radius)*1.2)] border border-[oklch(0.27_0.007_286)] bg-[oklch(0.17_0.005_286)] text-[oklch(0.92_0.003_286)]',
      props.class,
    )"
  >
    <slot>
      <TerminalHeader>
        <div class="flex items-center">
          <TerminalTitle />
          <TerminalStatus />
        </div>
        <TerminalActions>
          <TerminalCopyButton />
          <TerminalClearButton v-if="hasClear" />
        </TerminalActions>
      </TerminalHeader>
      <TerminalContent />
    </slot>
  </div>
</template>
