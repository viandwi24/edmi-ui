<script setup lang="ts">
import type { ToolUIPart } from "ai"
import type { HTMLAttributes } from "vue"
import type { ToolUIPartApproval } from "./context"
import { ShieldIcon } from "@lucide/vue"
import { computed, provide, toRef } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Alert } from "@/registry/edmi/ui/alert"
import type { Elevation } from "@/registry/edmi/ui/elevation"
import { ConfirmationKey } from "./context"

const props = withDefaults(defineProps<{
  approval?: ToolUIPartApproval
  state: ToolUIPart["state"]
  /** ✦ depth of the action buttons (they inherit it, each can override). The alert itself stays flat. */
  elevation?: Elevation
  class?: HTMLAttributes["class"]
}>(), {
  elevation: undefined,
})

provide(ConfirmationKey, {
  approval: toRef(props, "approval"),
  state: toRef(props, "state"),
  elevation: toRef(props, "elevation"),
})

const hidden = computed(() => !props.approval || props.state === "input-streaming" || props.state === "input-available")
</script>

<template>
  <template v-if="!hidden">
    <!-- Request = warning alert with Approve / Reject (leading icon in the `icon` slot). -->
    <Alert
      v-if="state === 'approval-requested'"
      data-slot="ai-confirmation"
      :data-state="state"
      variant="warning"
      :class="props.class"
    >
      <slot name="icon">
        <ShieldIcon />
      </slot>
      <slot />
    </Alert>
    <!-- Once answered it collapses to a plain status line. -->
    <div
      v-else
      data-slot="ai-confirmation"
      :data-state="state"
      :class="cn('flex items-center gap-2 text-[13.5px]', props.class)"
    >
      <slot />
    </div>
  </template>
</template>
