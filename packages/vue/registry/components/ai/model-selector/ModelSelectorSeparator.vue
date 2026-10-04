<script setup lang="ts">
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
