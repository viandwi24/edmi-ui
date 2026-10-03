<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { IframeHTMLAttributes, VNodeChild } from "vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useWebPreviewContext } from "./context"

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  class?: IframeHTMLAttributes["class"]
  src?: string
}>()

defineSlots<{
  loading?: () => VNodeChild
}>()

const { url } = useWebPreviewContext()

const frameSrc = computed(() => (props.src ?? url.value) || undefined)
</script>

<template>
  <div data-slot="ai-web-preview-body" class="relative min-h-0 flex-1 bg-background">
    <iframe
      :class="cn('size-full', props.class)"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
      :src="frameSrc"
      title="Preview"
      v-bind="$attrs"
    />
    <slot name="loading" />
  </div>
</template>
