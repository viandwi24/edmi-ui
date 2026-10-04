<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { InputGroupInput } from "@/registry/edmi/ui/input-group"
import { useSnippetContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { code } = useSnippetContext("SnippetInput")
</script>

<template>
  <InputGroupInput
    :class="cn('font-mono text-xs text-foreground', props.class)"
    readonly
    :model-value="code"
  />
</template>
