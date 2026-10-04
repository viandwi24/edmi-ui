<script setup lang="ts">
import { CommandList } from "@/registry/edmi/ui/command"

type Props = InstanceType<typeof CommandList>["$props"]
interface ModelSelectorProps extends /* @vue-ignore */ Props {}
defineProps<ModelSelectorProps>()
</script>

<template>
  <CommandList>
    <slot />
  </CommandList>
</template>
