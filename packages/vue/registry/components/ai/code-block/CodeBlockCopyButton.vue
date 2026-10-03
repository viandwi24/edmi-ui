<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { CheckIcon, CopyIcon } from "@lucide/vue"
import { onBeforeUnmount, ref } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"
import { useCodeBlockContext } from "./context"

const props = withDefaults(defineProps<{
  timeout?: number
  class?: HTMLAttributes["class"]
}>(), {
  timeout: 2000,
})

const emit = defineEmits<{
  (event: "copy"): void
  (event: "error", error: Error): void
}>()

const { code } = useCodeBlockContext()

const isCopied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function copyToClipboard() {
  if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
    emit("error", new Error("Clipboard API not available"))
    return
  }

  try {
    await navigator.clipboard.writeText(code.value)
    isCopied.value = true
    emit("copy")

    if (resetTimer) {
      clearTimeout(resetTimer)
    }
    resetTimer = setTimeout(() => {
      isCopied.value = false
    }, props.timeout)
  }
  catch (error) {
    emit("error", error instanceof Error ? error : new Error("Copy failed"))
  }
}

onBeforeUnmount(() => {
  if (resetTimer) {
    clearTimeout(resetTimer)
  }
})
</script>

<template>
  <Button
    data-slot="ai-code-block-copy"
    aria-label="Copy code"
    :class="cn('shrink-0', props.class)"
    size="icon-xs"
    type="button"
    variant="ghost"
    @click="copyToClipboard"
  >
    <slot>
      <CheckIcon v-if="isCopied" />
      <CopyIcon v-else />
    </slot>
  </Button>
</template>
