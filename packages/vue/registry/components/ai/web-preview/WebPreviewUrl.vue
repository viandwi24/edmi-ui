<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { LockIcon } from "@lucide/vue"
import { ref, watch } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Input } from "@/registry/edmi/ui/input"
import { useWebPreviewContext } from "./context"

const props = withDefaults(defineProps<{
  placeholder?: string
  class?: HTMLAttributes["class"]
}>(), {
  placeholder: "Enter URL...",
})

const context = useWebPreviewContext()

const inputValue = ref(context.url.value)

watch(
  () => context.url.value,
  (value) => {
    inputValue.value = value
  },
  { immediate: true },
)

function handleKeydown() {
  context.setUrl(String(inputValue.value))
}
</script>

<template>
  <div class="relative mx-1.5 flex-1">
    <LockIcon class="pointer-events-none absolute top-1/2 left-2.5 size-3 -translate-y-1/2 text-muted-foreground" />
    <Input
      v-model="inputValue"
      data-slot="ai-web-preview-url"
      :class="cn('h-[30px] pl-7 font-mono text-xs', props.class)"
      :placeholder="props.placeholder"
      @keydown.enter="handleKeydown"
    />
  </div>
</template>
