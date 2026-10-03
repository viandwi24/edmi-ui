<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Input } from "@/registry/edmi/ui/input"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Input
    data-slot="sidebar-input"
    data-sidebar="input"
    :class="cn(
      `h-8 w-full`,
      props.class,
    )"
  >
    <slot />
  </Input>
</template>
