<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { PhSidebarSimple } from '@phosphor-icons/vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useSidebar } from "./utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  <Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    variant="ghost"
    size="icon-sm"
    :class="cn(props.class)"
    @click="toggleSidebar"
  >
    <PhSidebarSimple class="rtl:rotate-180" />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
