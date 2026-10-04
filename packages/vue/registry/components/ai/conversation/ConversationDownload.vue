<script setup lang="ts">
import type { UIMessage } from "ai"
import type { HTMLAttributes } from "vue"
import { DownloadIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"
import { defaultFormatMessage, messagesToMarkdown } from "./utils"

const props = withDefaults(defineProps<{
  messages: UIMessage[]
  filename?: string
  formatMessage?: (message: UIMessage, index: number) => string
  class?: HTMLAttributes["class"]
}>(), {
  filename: "conversation.md",
  formatMessage: defaultFormatMessage,
})

function handleDownload() {
  const markdown = messagesToMarkdown(props.messages, props.formatMessage)
  const blob = new Blob([markdown], { type: "text/markdown" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = props.filename
  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <Button
    data-slot="ai-conversation-download"
    aria-label="Download conversation"
    :class="cn('absolute top-4 right-4 rounded-full', props.class)"
    size="icon"
    type="button"
    variant="outline"
    @click="handleDownload"
  >
    <slot>
      <DownloadIcon class="size-4" />
    </slot>
  </Button>
</template>
