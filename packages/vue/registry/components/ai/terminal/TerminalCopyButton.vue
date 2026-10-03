<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { CheckIcon, CopyIcon } from "@lucide/vue"
import { onBeforeUnmount, ref } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"
import { TERM_ACTION, useTerminalContext } from "./context"

const props = withDefaults(defineProps<{
  timeout?: number
  class?: HTMLAttributes["class"]
}>(), {
  timeout: 2000,
})

const emit = defineEmits<{
  (e: "copy"): void
  (e: "error", error: Error): void
}>()

const { output } = useTerminalContext("TerminalCopyButton")
const isCopied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function copyToClipboard() {
  if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
    emit("error", new Error("Clipboard API not available"))
    return
  }

  try {
    await navigator.clipboard.writeText(output.value)
    isCopied.value = true
    emit("copy")
    timer = setTimeout(() => {
      isCopied.value = false
    }, props.timeout)
  }
  catch (error) {
    emit("error", error as Error)
  }
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <Button
    type="button"
    variant="ghost"
    size="icon-xs"
    aria-label="Copy output"
    :class="cn(TERM_ACTION, props.class)"
    @click="copyToClipboard"
  >
    <slot>
      <CheckIcon v-if="isCopied" class="size-3.5" />
      <CopyIcon v-else class="size-3.5" />
    </slot>
  </Button>
</template>
