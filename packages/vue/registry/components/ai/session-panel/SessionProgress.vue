<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ChevronRight, X } from "@lucide/vue"
import { getCurrentInstance } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/edmi/ui/collapsible"
import { Progress } from "@/registry/edmi/ui/progress"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  title?: string
  /** 0 to 100: shows a progress bar above the content. */
  value?: number
  defaultOpen?: boolean
}>(), {
  title: "Progress",
  defaultOpen: false,
})

const emit = defineEmits<{
  (e: "close"): void
}>()

// The close button shows when a `close` listener is attached (same idea as `stop` on the submit button).
const hasClose = !!getCurrentInstance()?.vnode.props?.onClose
</script>

<template>
  <!-- Collapsible "Progress" section with the panel close button. -->
  <Collapsible data-slot="ai-session-progress" :default-open="defaultOpen" :class="cn('w-full', props.class)">
    <div class="flex items-center justify-between">
      <CollapsibleTrigger class="group/trigger flex items-center gap-1 text-sm outline-none focus-visible:underline">
        {{ title }}
        <ChevronRight class="size-3.5 text-muted-foreground transition-transform group-data-[state=open]/trigger:rotate-90" />
      </CollapsibleTrigger>
      <Button v-if="hasClose" aria-label="Close" size="icon-xs" type="button" variant="ghost" @click="emit('close')">
        <X class="size-3.5" />
      </Button>
    </div>
    <CollapsibleContent class="pt-3 text-[13px] text-muted-foreground">
      <Progress v-if="value !== undefined" :model-value="value" class="mb-3" />
      <slot />
    </CollapsibleContent>
  </Collapsible>
</template>
