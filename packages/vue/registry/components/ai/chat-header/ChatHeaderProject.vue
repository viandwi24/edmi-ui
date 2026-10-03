<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ServerIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  /** `connected` shows the green dot. */
  status?: "connected" | "idle"
}>(), {
  status: "connected",
})
</script>

<template>
  <!-- Project icon with a status dot (dot = connected). The icon slot replaces the default. -->
  <span
    data-slot="ai-chat-header-project"
    :data-status="status"
    :class="cn('relative inline-flex text-muted-foreground', props.class)"
  >
    <slot>
      <ServerIcon class="size-4" />
    </slot>
    <span v-if="status === 'connected'" class="absolute -top-px -right-0.5 size-1.5 rounded-full bg-success" />
  </span>
</template>
