<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import { SelectContent } from "@/registry/edmi/ui/select"

type Props = InstanceType<typeof SelectContent>["$props"]
interface PromptInputSelectContentProps extends /* @vue-ignore */ Props {}
defineProps<PromptInputSelectContentProps>()
</script>

<template>
  <SelectContent>
    <slot />
  </SelectContent>
</template>
