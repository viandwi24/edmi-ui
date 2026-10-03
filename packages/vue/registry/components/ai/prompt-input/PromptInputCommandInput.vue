<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
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
