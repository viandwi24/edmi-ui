<script setup lang="ts">
import { CommandItem } from "@/registry/edmi/ui/command"

type Props = InstanceType<typeof CommandItem>["$props"]
interface PromptInputCommandItemProps extends /* @vue-ignore */ Props {}
defineOptions({ inheritAttrs: false })
defineProps<PromptInputCommandItemProps>()
</script>

<template>
  <CommandItem v-bind="($attrs as any)">
    <slot />
  </CommandItem>
</template>
