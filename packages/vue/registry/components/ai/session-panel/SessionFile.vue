<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ArtifactKind } from "@/registry/edmi/components/ai/artifact-card"
import { ArtifactKindIcon } from "@/registry/edmi/components/ai/artifact-card"
import { cn } from "@/registry/edmi/lib/utils"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  /** File name; the `name` slot overrides it. */
  name?: string
  /** Format badge on the right (`PDF`, `MD`); the `format` slot overrides it. */
  format?: string
  kind?: ArtifactKind
}>(), {
  kind: "document",
})
</script>

<template>
  <button
    data-slot="ai-session-file"
    type="button"
    :class="cn('flex w-full items-center gap-2.5 rounded-md py-[7px] text-left text-sm outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring', props.class)"
  >
    <span class="text-muted-foreground">
      <ArtifactKindIcon :kind="kind" class="size-4" />
    </span>
    <span class="min-w-0 flex-1 truncate"><slot name="name">{{ name }}</slot></span>
    <span v-if="format || $slots.format" class="font-mono text-[11.5px] text-muted-foreground"><slot name="format">{{ format }}</slot></span>
  </button>
</template>
