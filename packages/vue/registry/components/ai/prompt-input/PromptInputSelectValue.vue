<script setup lang="ts">
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
