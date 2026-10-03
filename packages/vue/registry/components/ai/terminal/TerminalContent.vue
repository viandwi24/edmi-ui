<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import Ansi from "ansi-to-vue3"
import { nextTick, ref, watch } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useTerminalContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { output, isStreaming, autoScroll } = useTerminalContext("TerminalContent")
const containerRef = ref<HTMLDivElement | null>(null)

watch(
  [output, autoScroll],
  () => {
    if (autoScroll.value) {
      nextTick(() => {
        if (containerRef.value) {
          containerRef.value.scrollTop = containerRef.value.scrollHeight
        }
      })
    }
  },
  { immediate: true },
)

// ANSI colours map onto the fixed terminal palette (ai.css .ai-term), not onto tokens.
const ansiColors = [
  "[&_.ansi-green-fg]:text-[oklch(0.78_0.15_155)]",
  "[&_.ansi-bright-green-fg]:text-[oklch(0.78_0.15_155)]",
  "[&_.ansi-yellow-fg]:text-[oklch(0.83_0.13_85)]",
  "[&_.ansi-bright-yellow-fg]:text-[oklch(0.83_0.13_85)]",
  "[&_.ansi-red-fg]:text-[oklch(0.7_0.17_20)]",
  "[&_.ansi-bright-red-fg]:text-[oklch(0.7_0.17_20)]",
  "[&_.ansi-blue-fg]:text-[oklch(0.72_0.13_255)]",
  "[&_.ansi-bright-blue-fg]:text-[oklch(0.72_0.13_255)]",
  "[&_.ansi-magenta-fg]:text-[oklch(0.74_0.14_320)]",
  "[&_.ansi-bright-magenta-fg]:text-[oklch(0.74_0.14_320)]",
  "[&_.ansi-cyan-fg]:text-[oklch(0.8_0.1_200)]",
  "[&_.ansi-bright-cyan-fg]:text-[oklch(0.8_0.1_200)]",
  "[&_.ansi-black-fg]:text-[oklch(0.58_0.01_286)]",
  "[&_.ansi-bright-black-fg]:text-[oklch(0.58_0.01_286)]",
  "[&_.ansi-bold]:font-semibold",
  "[&_.ansi-dim]:opacity-60",
  "[&_.ansi-italic]:italic",
  "[&_.ansi-underline]:underline",
].join(" ")
</script>

<template>
  <div
    ref="containerRef"
    data-slot="ai-terminal-content"
    :class="cn(
      'max-h-96 overflow-auto px-3.5 py-2.5 font-mono text-[12.5px] leading-[1.7]',
      ansiColors,
      props.class,
    )"
  >
    <slot>
      <pre class="font-[inherit] break-words whitespace-pre-wrap"><Ansi use-classes>{{ output }}</Ansi><span
        v-if="isStreaming"
        class="ml-0.5 inline-block h-3.5 w-[7px] animate-pulse bg-current align-[-2px]"
      /></pre>
    </slot>
  </div>
</template>
