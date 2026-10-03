<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { PlayIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"
import { Spinner } from "@/registry/edmi/ui/spinner"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  playing?: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: "play"): void
}>()

function handleClick(event: MouseEvent) {
  event.stopPropagation()
  emit("play")
}
</script>

<template>
  <Button
    data-slot="ai-voice-selector-preview"
    type="button"
    variant="ghost"
    size="icon-xs"
    :aria-label="props.playing ? 'Pause preview' : 'Play preview'"
    :disabled="props.loading"
    :class="cn('mt-px', props.class)"
    @click="handleClick"
  >
    <Spinner v-if="props.loading" class="size-3" />
    <svg v-else-if="props.playing" class="size-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 4h4v16H7zM13 4h4v16h-4z" />
    </svg>
    <PlayIcon v-else class="size-3 fill-current" />
  </Button>
</template>
