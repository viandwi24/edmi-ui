<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { CollapsibleContent } from "@/registry/edmi/ui/collapsible"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <CollapsibleContent data-slot="ai-test-suite-content" :class="props.class">
    <div>
      <slot />
    </div>
  </CollapsibleContent>
</template>
