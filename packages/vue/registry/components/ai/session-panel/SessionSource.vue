<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { SessionSourceFavicon } from "./types"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  label: string
  favicons?: SessionSourceFavicon[]
  /** Count after the favicons (`+4`). */
  more?: number
}>()
</script>

<template>
  <!-- One row of "Used in this session": web search, memory, tools. Slots: `icon`, default = detail line. -->
  <div data-slot="ai-session-source" :class="cn('flex items-center gap-2.5 py-[7px] text-sm', props.class)">
    <span class="text-muted-foreground [&_svg]:size-4">
      <slot name="icon" />
    </span>
    <span :class="cn(!$slots.default && 'flex-1')">{{ label }}</span>
    <span v-if="$slots.default" class="min-w-0 flex-1 truncate text-[12.5px] text-muted-foreground">
      <slot />
    </span>
    <span v-if="favicons && favicons.length > 0" class="flex items-center">
      <template v-for="f in favicons" :key="f.label">
        <img
          v-if="f.src"
          :alt="f.label"
          :src="f.src"
          class="-ml-[3px] size-4 rounded-[4px] border border-card object-cover"
        >
        <span
          v-else
          class="-ml-[3px] inline-flex size-4 items-center justify-center rounded-[4px] border border-card bg-muted-foreground text-[8px] font-bold text-white"
          :style="f.color ? { background: f.color } : undefined"
        >
          {{ f.label.slice(0, 2).toUpperCase() }}
        </span>
      </template>
    </span>
    <span v-if="more" class="text-[12.5px] text-muted-foreground">+{{ more }}</span>
  </div>
</template>
