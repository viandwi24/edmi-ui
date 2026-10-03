<script setup lang="ts">
// Edmi ✦ port: the error state is the destructive ui alert.
import type { HTMLAttributes } from "vue"
import { AlertCircle } from "@lucide/vue"
import { Alert, AlertDescription, AlertTitle } from "@/registry/edmi/ui/alert"
import { useJSXPreview } from "./context"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()

const { error } = useJSXPreview()
</script>

<template>
  <Alert v-if="error" data-slot="ai-jsx-preview-error" variant="destructive" :class="props.class">
    <slot :error="error">
      <AlertCircle />
      <AlertTitle>Could not render</AlertTitle>
      <AlertDescription>{{ error.message }}</AlertDescription>
    </slot>
  </Alert>
</template>
