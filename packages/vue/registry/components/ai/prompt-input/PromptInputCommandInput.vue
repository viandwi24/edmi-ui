<script setup lang="ts">
import { CommandInput } from "@/registry/edmi/ui/command"

type Props = InstanceType<typeof CommandInput>["$props"]
interface PromptInputCommandInputProps extends /* @vue-ignore */ Props {}
defineProps<PromptInputCommandInputProps>()
</script>

<template>
  <CommandInput>
    <slot />
  </CommandInput>
</template>
