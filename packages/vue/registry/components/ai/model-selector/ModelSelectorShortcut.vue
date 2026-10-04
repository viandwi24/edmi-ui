<script setup lang="ts">
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
