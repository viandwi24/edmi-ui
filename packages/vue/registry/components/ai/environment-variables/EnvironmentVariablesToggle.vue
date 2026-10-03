<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { EyeIcon, LockIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Switch } from "@/registry/edmi/ui/switch"
import { useEnvironmentVariablesContext } from "./context"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()

const { showValues, setShowValues } = useEnvironmentVariablesContext()
</script>

<template>
  <div :class="cn('flex items-center gap-2 text-[12.5px]', props.class)">
    <span class="text-muted-foreground">
      <EyeIcon v-if="showValues" class="size-3.5" />
      <LockIcon v-else class="size-3.5" />
    </span>
    <span>Show values</span>
    <Switch
      aria-label="Toggle value visibility"
      size="sm"
      :model-value="showValues"
      @update:model-value="(v: boolean) => setShowValues(v)"
    />
  </div>
</template>
