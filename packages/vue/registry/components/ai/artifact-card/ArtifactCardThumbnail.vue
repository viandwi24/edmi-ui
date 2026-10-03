<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  /** `paper`: cropped top of page 1 (always light). `slide`: dark slide. */
  variant?: "paper" | "slide"
}>(), {
  variant: "paper",
})

// Paper is always light (DESIGN 5b rule 5): literal page colors, not themed tokens.
const PAPER_LINES = [92, 85, 78, 71, 64, 87, 80, 73]
</script>

<template>
  <span
    data-slot="ai-artifact-card-thumbnail"
    :data-variant="variant"
    :class="cn('-my-3 block h-[70px] w-[84px] shrink-0 overflow-hidden rounded-t-[calc(var(--radius)*0.6)]', props.class)"
  >
    <span
      :class="cn(
        'box-border block h-[100px] w-[84px] overflow-hidden rounded-[calc(var(--radius)*0.6)] border border-border px-[7px] py-2',
        variant === 'paper' ? 'bg-white' : 'bg-[#14213d]',
      )"
    >
      <slot>
        <template v-if="variant === 'paper'">
          <span class="block h-0.5 w-[40%] rounded-[2px] bg-[#d9d8d2]" />
          <span class="mt-[3px] block h-1 w-[88%] rounded-[2px] bg-[#1f1f1d]" />
          <span class="mt-[3px] block h-1 w-[63%] rounded-[2px] bg-[#1f1f1d]" />
          <span
            v-for="w in PAPER_LINES"
            :key="w"
            class="mt-[3px] block h-0.5 rounded-[2px] bg-[#d9d8d2]"
            :style="{ width: `${w}%` }"
          />
        </template>
        <template v-else>
          <span class="block h-0.5 w-[40%] rounded-[2px] bg-[#e39a3c]" />
          <span class="mt-3 block h-1 w-[80%] rounded-[2px] bg-white" />
          <span class="mt-[3px] block h-1 w-[56%] rounded-[2px] bg-white" />
        </template>
      </slot>
    </span>
  </span>
</template>
