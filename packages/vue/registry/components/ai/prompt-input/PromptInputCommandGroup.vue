<script setup lang="ts">
import { CommandGroup } from "@/registry/edmi/ui/command"

type Props = InstanceType<typeof CommandGroup>["$props"]
interface PromptInputCommandGroupProps extends /* @vue-ignore */ Props {}
defineProps<PromptInputCommandGroupProps>()
</script>

<template>
  <CommandGroup>
    <slot />
  </CommandGroup>
</template>
