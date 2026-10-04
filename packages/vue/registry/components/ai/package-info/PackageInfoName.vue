<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ContainerIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { usePackageInfoContext } from "./context"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()

const { name } = usePackageInfoContext()
</script>

<template>
  <div :class="cn('flex items-center gap-2', props.class)">
    <ContainerIcon class="size-3.5 text-muted-foreground" />
    <span class="font-mono text-[13.5px] font-semibold">
      <slot>{{ name }}</slot>
    </span>
  </div>
</template>
