<script setup lang="ts">
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
