<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Trash2Icon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"
import { TERM_ACTION, useTerminalContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { hasClear, onClear } = useTerminalContext("TerminalClearButton")
</script>

<template>
  <Button
    v-if="hasClear"
    type="button"
    variant="ghost"
    size="icon-xs"
    aria-label="Clear output"
    :class="cn(TERM_ACTION, props.class)"
    @click="onClear"
  >
    <slot>
      <Trash2Icon class="size-3.5" />
    </slot>
  </Button>
</template>
