<script setup lang="ts">
import { CommandItem } from "@/registry/edmi/ui/command"

type Props = InstanceType<typeof CommandItem>["$props"]
interface ModelSelectorProps extends /* @vue-ignore */ Props {}
defineOptions({ inheritAttrs: false })
defineProps<ModelSelectorProps>()
</script>

<template>
  <CommandItem v-bind="($attrs as any)">
    <slot />
  </CommandItem>
</template>
