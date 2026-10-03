<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { ref } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { provideWebPreviewContext } from "./context"

const props = withDefaults(defineProps<{
  defaultUrl?: string
  /** ✦ Start with the console open. */
  defaultConsoleOpen?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  defaultUrl: "",
  defaultConsoleOpen: false,
})

const emit = defineEmits<{
  (e: "update:url", value: string): void
  (e: "urlChange", value: string): void
  (e: "update:consoleOpen", value: boolean): void
  (e: "consoleOpenChange", value: boolean): void
}>()

const url = ref(props.defaultUrl)
const consoleOpen = ref(props.defaultConsoleOpen)

function setUrl(value: string) {
  url.value = value
  emit("update:url", value)
  emit("urlChange", value)
}

function setConsoleOpen(value: boolean) {
  consoleOpen.value = value
  emit("update:consoleOpen", value)
  emit("consoleOpenChange", value)
}

provideWebPreviewContext({
  url,
  setUrl,
  consoleOpen,
  setConsoleOpen,
})
</script>

<template>
  <div
    data-slot="ai-web-preview"
    :class="cn('flex size-full flex-col overflow-hidden rounded-xl border border-border bg-card', props.class)"
  >
    <slot />
  </div>
</template>
