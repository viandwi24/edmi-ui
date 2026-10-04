<script setup lang="ts">
import type { HTMLAttributes, StyleValue } from "vue"
import "media-chrome"
import { cn } from "@/registry/edmi/lib/utils"

// Card shell (`--card`, 1px border) around the media-chrome controller; the controls are the default slot.
// Built on ui/button for the buttons; media-chrome ranges are themed through its CSS variables.
const props = defineProps<{
  class?: HTMLAttributes["class"]
  style?: StyleValue
}>()

const mediaStyle = {
        "--media-background-color": "transparent",
        "--media-button-icon-height": "0.875rem",
        "--media-button-icon-width": "0.875rem",
        "--media-control-background": "transparent",
        "--media-control-hover-background": "transparent",
        "--media-control-padding": "0",
        "--media-font": "var(--font-sans)",
        "--media-font-size": "12px",
        "--media-icon-color": "currentColor",
        "--media-preview-time-background": "var(--popover)",
        "--media-preview-time-border-radius": "6px",
        "--media-preview-time-text-shadow": "none",
        "--media-primary-color": "var(--foreground)",
        "--media-range-bar-color": "var(--brand)",
        "--media-range-track-background": "var(--border)",
        "--media-range-track-border-radius": "999px",
        "--media-range-track-height": "4px",
        "--media-range-thumb-background": "var(--brand)",
        "--media-range-thumb-border-radius": "999px",
        "--media-range-thumb-height": "12px",
        "--media-range-thumb-width": "12px",
        "--media-secondary-color": "var(--muted)",
        "--media-text-color": "var(--foreground)",
        "--media-tooltip-arrow-display": "none",
        "--media-tooltip-background": "var(--popover)",
        "--media-tooltip-border-radius": "6px",
      }
</script>

<template>
  <component
    :is="'media-controller'"
    audio
    data-slot="ai-audio-player"
    :class="cn('block w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-foreground', props.class)"
    :style="[mediaStyle, props.style]"
  >
    <slot />
  </component>
</template>
