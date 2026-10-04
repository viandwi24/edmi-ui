<script setup lang="ts">
import { CommandEmpty } from "@/registry/edmi/ui/command"

type Props = InstanceType<typeof CommandEmpty>["$props"]
interface ModelSelectorProps extends /* @vue-ignore */ Props {}
defineProps<ModelSelectorProps>()
</script>

<template>
  <CommandEmpty>
    <slot />
  </CommandEmpty>
</template>
