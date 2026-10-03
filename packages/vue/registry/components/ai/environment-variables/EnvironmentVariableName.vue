<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useEnvironmentVariableContext } from "./context"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()

const { name } = useEnvironmentVariableContext()
</script>

<template>
  <span :class="cn('w-[190px] shrink-0 truncate font-mono text-[12.5px]', props.class)">
    <slot>{{ name }}</slot>
  </span>
</template>
