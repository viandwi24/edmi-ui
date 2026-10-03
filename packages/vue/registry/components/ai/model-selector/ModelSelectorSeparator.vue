<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import { CommandSeparator } from "@/registry/edmi/ui/command"

type Props = InstanceType<typeof CommandSeparator>["$props"]
interface ModelSelectorProps extends /* @vue-ignore */ Props {}
defineProps<ModelSelectorProps>()
</script>

<template>
  <CommandSeparator>
    <slot />
  </CommandSeparator>
</template>
