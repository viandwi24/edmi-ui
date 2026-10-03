<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { usePackageInfoContext } from "./context"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()

const { currentVersion, newVersion } = usePackageInfoContext()

// `18.3.1 → 19.0.0`; with only a new version (added) it reads `→ 6.0.30`. Pushed right inside the header.
const text = computed(() =>
  [currentVersion.value, newVersion.value && "→", newVersion.value].filter(Boolean).join(" "),
)
</script>

<template>
  <div
    v-if="currentVersion || newVersion"
    :class="cn('ml-auto font-mono text-[12.5px] text-foreground', props.class)"
  >
    <slot>{{ text }}</slot>
  </div>
</template>
