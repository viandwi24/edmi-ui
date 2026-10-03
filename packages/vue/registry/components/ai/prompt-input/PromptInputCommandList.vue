<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import { CommandList } from "@/registry/edmi/ui/command"

type Props = InstanceType<typeof CommandList>["$props"]
interface PromptInputCommandListProps extends /* @vue-ignore */ Props {}
defineProps<PromptInputCommandListProps>()
</script>

<template>
  <CommandList>
    <slot />
  </CommandList>
</template>
