<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { DownloadIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Button
    data-slot="ai-artifact-stack-download-all"
    variant="secondary"
    size="sm"
    type="button"
    :class="cn(props.class)"
  >
    <DownloadIcon class="size-3.5" />
    <slot>Download all</slot>
  </Button>
</template>
