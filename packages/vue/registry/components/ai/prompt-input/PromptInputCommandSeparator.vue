<script setup lang="ts">
import { CommandSeparator } from "@/registry/edmi/ui/command"

type Props = InstanceType<typeof CommandSeparator>["$props"]
interface PromptInputCommandSeparatorProps extends /* @vue-ignore */ Props {}
defineProps<PromptInputCommandSeparatorProps>()
</script>

<template>
  <CommandSeparator>
    <slot />
  </CommandSeparator>
</template>
