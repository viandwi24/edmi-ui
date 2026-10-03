<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = withDefaults(defineProps<{
  device: MediaDeviceInfo
  /** Show the hardware id (`1a2b:3c4d`) in muted mono after the name. */
  showId?: boolean
  class?: HTMLAttributes["class"]
}>(), { showId: true })

const deviceIdRegex = /\(([\da-f]{4}:[\da-f]{4})\)$/i

const parsed = computed(() => {
  const matches = props.device.label.match(deviceIdRegex)
  if (!matches)
    return { name: props.device.label, deviceId: null }
  return { name: props.device.label.replace(deviceIdRegex, "").trim(), deviceId: matches[1] }
})
</script>

<template>
  <span :class="cn('flex min-w-0 flex-1 items-center gap-2', props.class)">
    <span class="truncate">{{ parsed.name }}</span>
    <span
      v-if="parsed.deviceId && showId"
      class="ml-auto shrink-0 font-mono text-[11.5px] text-muted-foreground"
    >{{ parsed.deviceId }}</span>
  </span>
</template>
