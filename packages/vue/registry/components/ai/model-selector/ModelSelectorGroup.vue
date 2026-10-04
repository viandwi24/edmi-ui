<script setup lang="ts">
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
