<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { Component, HTMLAttributes } from "vue"
import type { AttachmentMediaCategory } from "./types"
import {
  FileTextIcon,
  GlobeIcon,
  ImageIcon,
  PaperclipIcon,
  PlayIcon,
  VideoIcon,
} from "@lucide/vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useAttachmentContext } from "./context"

const props = defineProps<{
  fallbackIcon?: Component
  class?: HTMLAttributes["class"]
}>()

const { data, mediaCategory, variant } = useAttachmentContext()

const fileUrl = computed(() => (data.value.type === "file" ? data.value.url : undefined))
const showImage = computed(() => mediaCategory.value === "image" && data.value.type === "file" && !!fileUrl.value)
const showVideo = computed(() => mediaCategory.value === "video" && data.value.type === "file" && !!fileUrl.value)

const iconMap: Record<AttachmentMediaCategory, Component> = {
  image: ImageIcon,
  video: VideoIcon,
  audio: PlayIcon,
  source: GlobeIcon,
  document: FileTextIcon,
  unknown: PaperclipIcon,
}

const icon = computed(() => props.fallbackIcon ?? iconMap[mediaCategory.value])
const imageAlt = computed(() => (data.value.type === "file" ? data.value.filename : undefined) || "Image")
</script>

<template>
  <div
    data-slot="ai-attachment-preview"
    :class="cn(
      'flex shrink-0 items-center justify-center overflow-hidden text-muted-foreground [&_svg:not([class*=size-])]:size-4',
      variant === 'grid'
        && 'h-20 w-full rounded-xl border border-border bg-muted [&_svg:not([class*=size-])]:size-5',
      variant === 'inline' && 'size-4 [&_svg:not([class*=size-])]:size-3.5',
      variant === 'list'
        && 'size-9 rounded-lg border border-border bg-muted text-foreground',
      props.class,
    )"
  >
    <img
      v-if="showImage"
      :alt="imageAlt"
      :class="cn('size-full object-cover', variant !== 'grid' && 'rounded-[5px]')"
      :src="fileUrl"
    >
    <video v-else-if="showVideo" class="size-full object-cover" muted :src="fileUrl" />
    <component :is="icon" v-else />
  </div>
</template>
