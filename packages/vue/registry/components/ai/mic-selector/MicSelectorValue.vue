<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useMicSelector } from "./context"
import MicSelectorLabel from "./MicSelectorLabel.vue"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()

const { devices, value } = useMicSelector("MicSelectorValue")
const currentDevice = computed(() => devices.value.find((d) => d.deviceId === value.value))
</script>

<template>
  <span
    v-if="!currentDevice"
    :class="cn('flex-1 truncate text-left text-muted-foreground', props.class)"
  >
    Select microphone...
  </span>
  <MicSelectorLabel
    v-else
    :class="cn('flex-1 truncate text-left', props.class)"
    :device="currentDevice"
    :show-id="false"
  />
</template>
