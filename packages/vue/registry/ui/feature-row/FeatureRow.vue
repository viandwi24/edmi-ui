<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Plus } from '@lucide/vue'
import { Card } from '@/registry/edmi/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/registry/edmi/ui/collapsible'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{
  /** ✦ one-step 3D look, forwarded to the card */
  raised?: boolean
  class?: HTMLAttributes['class']
  /** Mono number, e.g. "1.1". */
  index: string | number
  title: string
}>()
// Default slot = expandable content; slot `icon` = trailing icon (defaults to a plus).
</script>

<template>
  <Card :elevation="raised ? 'raised' : undefined"
    v-if="!$slots.default"
    data-slot="feature-row"
    :class="cn('h-14 flex-row items-center gap-4 px-5 py-0', props.class)"
  >
    <span class="font-mono text-xs text-muted-foreground">{{ index }}</span>
    <span class="flex-1 text-left text-base font-medium">{{ title }}</span>
    <span class="text-muted-foreground">
      <slot name="icon"><Plus class="size-4" /></slot>
    </span>
  </Card>
  <Card :elevation="raised ? 'raised' : undefined" v-else data-slot="feature-row" :class="cn('gap-0 py-0', props.class)">
    <Collapsible class="group/feature-row">
      <CollapsibleTrigger
        class="flex h-14 w-full cursor-pointer items-center gap-4 px-5 outline-none focus-visible:bg-accent"
      >
        <span class="font-mono text-xs text-muted-foreground">{{ index }}</span>
        <span class="flex-1 text-left text-base font-medium">{{ title }}</span>
        <span class="text-muted-foreground transition-transform group-data-[state=open]/feature-row:rotate-45">
          <slot name="icon"><Plus class="size-4" /></slot>
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent class="px-5 pb-4 pl-[52px] text-sm text-muted-foreground">
        <slot />
      </CollapsibleContent>
    </Collapsible>
  </Card>
</template>
