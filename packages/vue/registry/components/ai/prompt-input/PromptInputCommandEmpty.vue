<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import { CommandEmpty } from "@/registry/edmi/ui/command"

type Props = InstanceType<typeof CommandEmpty>["$props"]
interface PromptInputCommandEmptyProps extends /* @vue-ignore */ Props {}
defineProps<PromptInputCommandEmptyProps>()
</script>

<template>
  <CommandEmpty>
    <slot />
  </CommandEmpty>
</template>
