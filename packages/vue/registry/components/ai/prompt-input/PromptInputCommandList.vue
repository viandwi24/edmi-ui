<script setup lang="ts">
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
