<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { computed, useSlots } from "vue"
import { Markdown } from "vue-stream-markdown"
import { cn } from "@/registry/edmi/lib/utils"
import "vue-stream-markdown/index.css"

const props = defineProps<{
  /** Markdown source; the default slot text works too. */
  content?: string
  class?: HTMLAttributes["class"]
}>()

const slots = useSlots()
const slotContent = computed<string | undefined>(() => {
  const nodes = slots.default?.()
  if (!Array.isArray(nodes))
    return undefined
  let text = ""
  for (const node of nodes) {
    if (typeof node.children === "string")
      text += node.children
  }
  return text || undefined
})

const md = computed(() => (slotContent.value ?? props.content ?? "") as string)

// Response typography (DESIGN §5b rule 3): 15/1.65, 600 lead-ins, h1-h3 22/18/16, inline code = mono 12.5 on
// --muted in --destructive-text, links --info-text underlined, quote = 3px --border rule, 22px list indent,
// max ~68ch. Selectors target vue-stream-markdown's `data-stream-markdown` hooks; `!` beats its own unlayered
// scoped rules (utilities live in a CSS layer and would lose).
const responseTypography = [
  "max-w-[68ch] text-[15px] leading-[1.65] text-foreground",
  "[&>*:first-child]:mt-0! [&>*:last-child]:mb-0! [&>*+*]:mt-2.5!",
  "[&_[data-stream-markdown=p]]:my-0!",
  "[&_[data-stream-markdown=heading-1]]:mt-4! [&_[data-stream-markdown=heading-1]]:mb-2! [&_[data-stream-markdown=heading-1]]:text-[22px]! [&_[data-stream-markdown=heading-1]]:leading-snug! [&_[data-stream-markdown=heading-1]]:font-semibold! [&_[data-stream-markdown=heading-1]]:tracking-[-0.3px]!",
  "[&_[data-stream-markdown=heading-2]]:mt-4! [&_[data-stream-markdown=heading-2]]:mb-2! [&_[data-stream-markdown=heading-2]]:text-lg! [&_[data-stream-markdown=heading-2]]:leading-snug! [&_[data-stream-markdown=heading-2]]:font-semibold! [&_[data-stream-markdown=heading-2]]:tracking-[-0.2px]!",
  "[&_[data-stream-markdown=heading-3]]:mt-3! [&_[data-stream-markdown=heading-3]]:mb-2! [&_[data-stream-markdown=heading-3]]:text-base! [&_[data-stream-markdown=heading-3]]:leading-snug! [&_[data-stream-markdown=heading-3]]:font-semibold!",
  "[&_[data-stream-markdown=strong]]:font-semibold!",
  "[&_[data-stream-markdown=code]]:rounded-md! [&_[data-stream-markdown=code]]:border! [&_[data-stream-markdown=code]]:border-border! [&_[data-stream-markdown=code]]:bg-muted! [&_[data-stream-markdown=code]]:px-1.5! [&_[data-stream-markdown=code]]:py-px! [&_[data-stream-markdown=code]]:font-mono! [&_[data-stream-markdown=code]]:text-[12.5px]! [&_[data-stream-markdown=code]]:font-normal! [&_[data-stream-markdown=code]]:text-destructive-text!",
  "[&_[data-stream-markdown=link]]:font-normal! [&_[data-stream-markdown=link]]:text-info-text! [&_[data-stream-markdown=link]]:underline! [&_[data-stream-markdown=link]]:underline-offset-[3px]!",
  "[&_[data-stream-markdown=blockquote]]:my-2.5! [&_[data-stream-markdown=blockquote]]:border-l-[3px]! [&_[data-stream-markdown=blockquote]]:border-l-border! [&_[data-stream-markdown=blockquote]]:py-0.5! [&_[data-stream-markdown=blockquote]]:pl-3.5! [&_[data-stream-markdown=blockquote]]:text-foreground-2! [&_[data-stream-markdown=blockquote]]:not-italic!",
  "[&_[data-stream-markdown=ul]]:my-2.5! [&_[data-stream-markdown=ol]]:my-2.5!",
  "[&_[data-stream-markdown=li]]:py-0.5! [&_[data-stream-markdown=li]]:pl-0! [&_[data-stream-markdown=li]]:grid-cols-[22px_minmax(0,1fr)]! [&_[data-stream-markdown=li]]:gap-x-0!",
  "[&_[data-stream-markdown=list-marker]]:pr-1.5!",
].join(" ")
</script>

<template>
  <Markdown
    data-slot="ai-message-response"
    :content="md"
    :link-options="{ favicon: false }"
    :class="cn('size-full', responseTypography, props.class)"
  />
</template>
