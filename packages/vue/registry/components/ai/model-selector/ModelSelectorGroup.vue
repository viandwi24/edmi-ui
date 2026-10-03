<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import { CommandGroup } from "@/registry/edmi/ui/command"

type Props = InstanceType<typeof CommandGroup>["$props"]
interface ModelSelectorProps extends /* @vue-ignore */ Props {}
defineProps<ModelSelectorProps>()
</script>

<template>
  <CommandGroup>
    <slot />
  </CommandGroup>
</template>
