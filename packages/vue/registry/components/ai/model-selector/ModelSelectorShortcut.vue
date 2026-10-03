<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import { CommandShortcut } from "@/registry/edmi/ui/command"

type Props = InstanceType<typeof CommandShortcut>["$props"]
interface ModelSelectorProps extends /* @vue-ignore */ Props {}
defineProps<ModelSelectorProps>()
</script>

<template>
  <CommandShortcut>
    <slot />
  </CommandShortcut>
</template>
