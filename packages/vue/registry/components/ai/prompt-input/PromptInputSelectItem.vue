<script setup lang="ts">
import { SelectItem } from "@/registry/edmi/ui/select"

type Props = InstanceType<typeof SelectItem>["$props"]
interface PromptInputSelectItemProps extends /* @vue-ignore */ Props {}
defineOptions({ inheritAttrs: false })
defineProps<PromptInputSelectItemProps>()
</script>

<template>
  <SelectItem v-bind="($attrs as any)">
    <slot />
  </SelectItem>
</template>
