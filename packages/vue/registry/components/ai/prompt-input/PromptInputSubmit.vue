<script setup lang="ts">
import type { ChatStatus } from "ai"
import type { HTMLAttributes } from "vue"
import type { InputGroupButtonVariants } from "@/registry/edmi/ui/input-group"
import type { ButtonVariants } from "@/registry/edmi/ui/button"
import { ArrowUpIcon, XIcon } from "@lucide/vue"
import { computed, getCurrentInstance } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import type { Elevation } from "@/registry/edmi/ui/elevation"
import { InputGroupButton } from "@/registry/edmi/ui/input-group"
import { Spinner } from "@/registry/edmi/ui/spinner"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  status?: ChatStatus
  variant?: ButtonVariants["variant"]
  size?: InputGroupButtonVariants["size"]
  /** ✦ depth: follows the Button rules (raised in layered mode). */
  elevation?: Elevation
}>(), {
  size: "icon-sm",
  elevation: undefined,
})

const emit = defineEmits<{
  (e: "stop"): void
}>()

// With a `stop` listener the button turns into a stop button while generating.
const hasStop = !!getCurrentInstance()?.vnode.props?.onStop

const isGenerating = computed(() => props.status === "submitted" || props.status === "streaming")
const isStop = computed(() => isGenerating.value && hasStop)

function handleClick(e: MouseEvent) {
  if (isStop.value) {
    e.preventDefault()
    emit("stop")
  }
}
</script>

<template>
  <InputGroupButton
    data-slot="ai-prompt-input-submit"
    :data-status="props.status"
    :aria-label="isGenerating ? 'Stop' : 'Submit'"
    :type="isStop ? 'button' : 'submit'"
    :size="props.size"
    :variant="props.variant ?? (props.status === 'error' ? 'destructive' : 'default')"
    :elevation="props.elevation"
    :class="cn('rounded-[9px]', props.class)"
    @click="handleClick"
  >
    <slot>
      <Spinner v-if="props.status === 'submitted'" />
      <span v-else-if="props.status === 'streaming'" class="size-2.5 rounded-[2px] bg-current" />
      <XIcon v-else-if="props.status === 'error'" class="size-4" />
      <ArrowUpIcon v-else class="size-4" />
    </slot>
  </InputGroupButton>
</template>
