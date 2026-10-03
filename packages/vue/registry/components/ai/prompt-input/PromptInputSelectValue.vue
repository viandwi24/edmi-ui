<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import { SelectValue } from "@/registry/edmi/ui/select"

type Props = InstanceType<typeof SelectValue>["$props"]
interface PromptInputSelectValueProps extends /* @vue-ignore */ Props {}
defineProps<PromptInputSelectValueProps>()
</script>

<template>
  <SelectValue>
    <slot />
  </SelectValue>
</template>
