<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
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
