<script setup lang="ts">
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
