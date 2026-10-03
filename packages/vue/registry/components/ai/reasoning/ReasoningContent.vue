<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { computed, useSlots } from "vue"
import { Markdown } from "vue-stream-markdown"
import { cn } from "@/registry/edmi/lib/utils"
import { CollapsibleContent } from "@/registry/edmi/ui/collapsible"
import "vue-stream-markdown/index.css"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  /** Markdown source; the default slot text works too. */
  content?: string
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
</script>

<template>
  <CollapsibleContent
    data-slot="ai-reasoning-content"
    :class="cn(
      'overflow-hidden outline-none data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
      props.class,
    )"
  >
    <div class="mt-2.5 ml-[7px] border-l-2 border-border pl-[23px] text-[13.5px] leading-[1.6] text-muted-foreground">
      <Markdown
        :content="md"
        :link-options="{ favicon: false }"
        class="text-[13.5px]! leading-[1.6]! text-muted-foreground! [&>*:first-child]:mt-0! [&>*:last-child]:mb-0! [&>*+*]:mt-2! [&_[data-stream-markdown=p]]:my-0!"
      />
    </div>
  </CollapsibleContent>
</template>
