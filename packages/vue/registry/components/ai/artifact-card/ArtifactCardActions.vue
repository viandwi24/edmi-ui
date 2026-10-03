<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ChevronDown } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"
import { ButtonGroup } from "@/registry/edmi/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/edmi/ui/dropdown-menu"
import { useArtifactCardState } from "./context"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  /** Label of the primary half of the split button. */
  label?: string
}>(), {
  label: "Download",
})

const emit = defineEmits<{
  (e: "download"): void
}>()

const state = useArtifactCardState()
</script>

<template>
  <!-- The default slot holds `DropdownMenuItem`s for the chevron half; no chevron without them. -->
  <ButtonGroup
    v-if="state !== 'generating'"
    data-slot="ai-artifact-card-actions"
    :class="cn('shrink-0', props.class)"
  >
    <Button variant="secondary" size="sm" type="button" @click="emit('download')">
      {{ label }}
    </Button>
    <DropdownMenu v-if="$slots.default">
      <DropdownMenuTrigger as-child>
        <Button variant="secondary" size="icon-sm" type="button" aria-label="More download options">
          <ChevronDown class="size-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <slot />
      </DropdownMenuContent>
    </DropdownMenu>
  </ButtonGroup>
</template>
