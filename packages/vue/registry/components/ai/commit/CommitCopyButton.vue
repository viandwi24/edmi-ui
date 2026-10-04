<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { CheckIcon, CopyIcon } from "@lucide/vue"
import { onBeforeUnmount, ref } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"

const props = withDefaults(defineProps<{
  hash: string
  timeout?: number
  class?: HTMLAttributes["class"]
}>(), {
  timeout: 2000,
})

const emit = defineEmits<{
  (event: "copy"): void
  (event: "error", error: Error): void
}>()

const isCopied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function copyToClipboard() {
  if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
    emit("error", new Error("Clipboard API not available"))
    return
  }
  try {
    await navigator.clipboard.writeText(props.hash)
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
    aria-label="Copy hash"
    :class="cn('size-4 shrink-0 rounded-sm text-muted-foreground', props.class)"
    size="icon-xs"
    type="button"
    variant="ghost"
    @click="copyToClipboard"
  >
    <slot>
      <CheckIcon v-if="isCopied" class="size-3" />
      <CopyIcon v-else class="size-3" />
    </slot>
  </Button>
</template>
