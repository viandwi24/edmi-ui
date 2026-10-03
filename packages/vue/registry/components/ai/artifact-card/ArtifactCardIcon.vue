<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ArtifactKind } from "./context"
import { cn } from "@/registry/edmi/lib/utils"
import ArtifactKindIcon from "./ArtifactKindIcon.vue"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  kind?: ArtifactKind
}>(), {
  kind: "document",
})
</script>

<template>
  <span
    data-slot="ai-artifact-card-icon"
    :class="cn('inline-flex h-14 w-[52px] shrink-0 items-center justify-center rounded-[calc(var(--radius)*0.9)] border border-border bg-muted text-muted-foreground', props.class)"
  >
    <slot>
      <ArtifactKindIcon :kind="kind" />
    </slot>
  </span>
</template>
