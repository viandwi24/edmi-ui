<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { CheckIcon, CopyIcon } from "@lucide/vue"
import { onBeforeUnmount, ref } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { InputGroupButton } from "@/registry/edmi/ui/input-group"
import { useSnippetContext } from "./context"

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

const { code } = useSnippetContext("SnippetCopyButton")
const isCopied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function copyToClipboard() {
  if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
    emit("error", new Error("Clipboard API not available"))
    return
  }
  if (isCopied.value)
    return

  try {
    await navigator.clipboard.writeText(code.value)
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
  <InputGroupButton
    aria-label="Copy"
    title="Copy"
    size="icon-xs"
    :class="cn('mr-1', props.class)"
    @click="copyToClipboard"
  >
    <slot>
      <CheckIcon v-if="isCopied" class="size-3.5" />
      <CopyIcon v-else class="size-3.5" />
    </slot>
  </InputGroupButton>
</template>
