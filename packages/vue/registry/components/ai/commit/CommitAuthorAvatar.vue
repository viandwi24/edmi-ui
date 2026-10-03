<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/edmi/ui/avatar"

const props = defineProps<{
  initials: string
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Avatar :class="cn('size-[30px]', props.class)">
    <AvatarFallback class="text-[11px]">
      {{ props.initials }}
    </AvatarFallback>
  </Avatar>
</template>
