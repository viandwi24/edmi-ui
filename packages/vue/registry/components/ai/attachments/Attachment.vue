<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import type { AttachmentData } from "./types"
import { computed, getCurrentInstance, provide } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Attachment as UiAttachment } from "@/registry/edmi/ui/attachment"
import { AttachmentKey, useAttachmentsContext } from "./context"
import { getMediaCategory } from "./utils"

// Thin layer on ui/attachment (DESIGN §5b): three layouts around the ui item (grid tiles, inline pills, list rows).

const props = defineProps<{
  data: AttachmentData
  class?: HTMLAttributes["class"]
}>()

const emit = defineEmits<{
  (e: "remove"): void
}>()

const { variant } = useAttachmentsContext()
const data = computed(() => props.data)
const mediaCategory = computed(() => getMediaCategory(props.data))

// The remove button only shows when the parent listens for `@remove`.
const hasRemove = !!getCurrentInstance()?.vnode.props?.onRemove

provide(AttachmentKey, {
  data,
  mediaCategory,
  remove: hasRemove ? () => emit("remove") : undefined,
  variant,
})
</script>

<template>
  <div
    v-if="variant === 'grid'"
    data-slot="ai-attachment"
    data-variant="grid"
    :class="cn('group/ai-attachment relative w-[110px]', props.class)"
  >
    <slot />
  </div>
  <UiAttachment
    v-else
    data-slot="ai-attachment"
    :data-variant="variant"
    :size="variant === 'inline' ? 'xs' : 'default'"
    :class="cn(
      'group/ai-attachment items-center',
      variant === 'inline' && 'h-8 w-fit min-w-0 cursor-pointer rounded-lg px-2 py-0 text-[13px]',
      variant === 'list' && 'w-full gap-3 rounded-xl p-2.5',
      props.class,
    )"
  >
    <slot />
  </UiAttachment>
</template>
