<script setup lang="ts">
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
